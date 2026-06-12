import { useMemo, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { useTexture } from '@react-three/drei'
import * as THREE from 'three'

/* ── Slim can 250 ml — R = 1 ⇒ H/D ≈ 2.51 (53,4 mm ⌀ × 134 mm) ──────────── */

const SEG = 160 // segments radiaux (silhouette lisse)

/* Profils de révolution (r, y) — continus, parcourus dans le sens qui donne
   des normales extérieures (bas : centre→pied ; paroi : bas→haut ;
   haut : col→sertissage→gorge→panneau). Un Lathe par zone matériau. */

/* Fond : dôme rentrant + pied (alu nu) */
const BOTTOM_PTS: Array<[number, number]> = [
  [0.020, -2.300],
  [0.200, -2.318],
  [0.400, -2.360],
  [0.580, -2.415],
  [0.700, -2.462],
  [0.780, -2.496],
  [0.825, -2.508],
  [0.855, -2.510], // contact sol
  [0.882, -2.500],
  [0.900, -2.480],
  [0.910, -2.455],
  [0.915, -2.440], // jonction zone imprimée
]

/* Zone imprimée : chanfrein bas → paroi droite → col rétreint */
const PRINT_PTS: Array<[number, number]> = [
  [0.915, -2.440],
  [0.945, -2.395],
  [0.972, -2.340],
  [0.990, -2.285],
  [1.000, -2.230],
  [1.000,  1.780], // paroi droite
  [0.996,  1.880],
  [0.985,  1.960],
  [0.965,  2.040],
  [0.938,  2.120],
  [0.908,  2.200],
  [0.882,  2.270],
  [0.868,  2.320],
  [0.862,  2.360], // sous le sertissage
]

/* Haut : sertissage roulé → gorge → panneau du couvercle (alu nu) */
const TOP_PTS: Array<[number, number]> = [
  [0.862, 2.360],
  [0.872, 2.400],
  [0.880, 2.440],
  [0.878, 2.470],
  [0.866, 2.495],
  [0.846, 2.508], // sommet du sertissage
  [0.824, 2.500],
  [0.806, 2.478],
  [0.793, 2.448],
  [0.782, 2.410],
  [0.776, 2.382], // fond de gorge
  [0.762, 2.392],
  [0.752, 2.420],
  [0.744, 2.444],
  [0.700, 2.452],
  [0.500, 2.456],
  [0.250, 2.458],
  [0.020, 2.458], // panneau
]

/* Hauteur (longueur d'arc) couverte par le label : le bandeau sombre arrive
   sur le col, le bas du chanfrein est prolongé par la couleur du bord bas. */
const LABEL_SPAN = 4.15

const toVec2 = (pts: Array<[number, number]>) =>
  pts.map(([r, y]) => new THREE.Vector2(r, y))

function arcLengths(pts: THREE.Vector2[]) {
  const cum = [0]
  for (let i = 1; i < pts.length; i++)
    cum.push(cum[i - 1] + pts[i].distanceTo(pts[i - 1]))
  return { cum, total: cum[cum.length - 1] }
}

/* Lathe avec V re-réparti par longueur d'arc → texture sans étirement local */
function makeLathe(raw: Array<[number, number]>, remapByArc = false) {
  const pts = toVec2(raw)
  const geo = new THREE.LatheGeometry(pts, SEG)
  if (remapByArc) {
    const { cum, total } = arcLengths(pts)
    const uv = geo.getAttribute('uv') as THREE.BufferAttribute
    const n = pts.length - 1
    for (let k = 0; k < uv.count; k++) {
      const j = Math.round(uv.getY(k) * n)
      uv.setY(k, cum[j] / total)
    }
    uv.needsUpdate = true
  }
  return geo
}

/* Étend le label sur toute la zone imprimée : label en haut (bandeau sombre
   sur le col), couleur du bord bas prolongée sur le chanfrein. */
function makeLabelTexture(img: HTMLImageElement, gl: THREE.WebGLRenderer, printArc: number) {
  const W = img.width
  const H = Math.round((W * printArc) / (Math.PI * 2)) // texels ~carrés sur la canette
  const labelH = Math.round(H * (LABEL_SPAN / printArc))
  const cv = document.createElement('canvas')
  cv.width = W
  cv.height = H
  const ctx = cv.getContext('2d')!
  // bord bas du PNG ignoré (liseré clair) ; frange juste au-dessus → l'impression continue
  const skip = Math.round(img.height * 0.012)
  const fringe = Math.max(2, Math.round(img.height * 0.03))
  ctx.drawImage(img, 0, 0, img.width, img.height - skip, 0, 0, W, labelH)
  ctx.drawImage(img, 0, img.height - skip - fringe, img.width, fringe,
                0, labelH - 1, W, H - labelH + 1)
  // re-passe floutée : gomme les stries (texte/code-barres étirés) du chanfrein
  ctx.filter = 'blur(18px)'
  ctx.drawImage(img, 0, img.height - skip - fringe, img.width, fringe,
                0, labelH - 1, W, H - labelH + 1)
  ctx.filter = 'none'

  const tex = new THREE.CanvasTexture(cv)
  tex.wrapS = THREE.RepeatWrapping
  tex.colorSpace = THREE.SRGBColorSpace
  tex.anisotropy = gl.capabilities.getMaxAnisotropy()
  tex.offset.x = 0.5 // logo GREENBULL face caméra au chargement
  return tex
}

export function CanModel() {
  const rigRef = useRef<THREE.Group>(null)
  const spinRef = useRef<THREE.Group>(null)
  const { gl, size } = useThree()

  /* Placement responsive : décalée à droite sur desktop, centrée-haute sur mobile */
  const narrow = size.width <= 720
  const baseX = narrow ? 0 : 1.0
  const baseY = narrow ? 0.55 : 0.05
  const scale = narrow ? 0.44 : 0.62

  /* ── Géométries ──────────────────────────────────────────────────────── */
  const printGeo  = useMemo(() => makeLathe(PRINT_PTS, true), [])
  const topGeo    = useMemo(() => makeLathe(TOP_PTS), [])
  const bottomGeo = useMemo(() => makeLathe(BOTTOM_PTS), [])
  const domeCapGeo = useMemo(() => new THREE.CircleGeometry(0.02, 32), [])

  /* Languette stay-on */
  const rivetGeo = useMemo(() => new THREE.CylinderGeometry(0.045, 0.045, 0.03, 24), [])
  const tabRingGeo = useMemo(() => {
    const g = new THREE.TorusGeometry(0.105, 0.03, 12, 36)
    g.rotateX(Math.PI / 2)
    g.scale(1, 0.35, 1)
    return g
  }, [])
  const tabPlateGeo = useMemo(() => new THREE.BoxGeometry(0.085, 0.014, 0.13), [])

  /* ── Texture label ───────────────────────────────────────────────────── */
  const label = useTexture(`${import.meta.env.BASE_URL}can/label.png`)
  const labelTex = useMemo(() => {
    const { total } = arcLengths(toVec2(PRINT_PTS))
    return makeLabelTexture(label.image as HTMLImageElement, gl, total)
  }, [label, gl])

  /* ── Matériaux ───────────────────────────────────────────────────────── */
  const printMat = useMemo(() => new THREE.MeshPhysicalMaterial({
    map: labelTex,
    metalness: 0.38,
    roughness: 0.3,
    clearcoat: 1.0,
    clearcoatRoughness: 0.16,
    envMapIntensity: 0.95,
  }), [labelTex])

  const aluMat = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: '#e2e1dd',
    metalness: 0.95,
    roughness: 0.26,
    clearcoat: 0.4,
    clearcoatRoughness: 0.3,
    envMapIntensity: 1.2,
    side: THREE.DoubleSide,
  }), [])

  const tabMat = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: '#c9c8c3',
    metalness: 0.95,
    roughness: 0.35,
    envMapIntensity: 1.1,
  }), [])

  /* ── Animation scroll (amortie, indépendante du framerate) ──────────── */
  const st = useRef({ smoothY: 0, lean: 0, prevRaw: 0 })

  useFrame((_, delta) => {
    if (!rigRef.current || !spinRef.current) return
    const s = st.current
    const limit = document.documentElement.scrollHeight - window.innerHeight
    const rawP = limit > 0 ? window.scrollY / limit : 0
    const vRaw = rawP - s.prevRaw
    s.prevRaw = rawP

    /* ≈ 2.9 tours sur toute la page */
    const kY = 1 - Math.exp(-6.5 * delta)
    s.smoothY += (rawP * Math.PI * 5.8 - s.smoothY) * kY

    /* Tilt cinétique selon la vitesse de scroll */
    const tLean = Math.max(-0.16, Math.min(0.16, -vRaw * 1100))
    s.lean += (tLean - s.lean) * (1 - Math.exp(-4 * delta))

    spinRef.current.rotation.y = s.smoothY
    spinRef.current.rotation.z = s.lean
    rigRef.current.position.set(
      baseX,
      baseY + Math.sin(performance.now() / 2400) * 0.05 - rawP * 0.22,
      0,
    )
  })

  return (
    <group ref={rigRef} position={[baseX, baseY, 0]} scale={scale}>
      <group ref={spinRef}>

        {/* Zone imprimée : chanfrein + paroi + col, une seule surface continue */}
        <mesh geometry={printGeo} material={printMat} />

        {/* Haut : sertissage + gorge + couvercle */}
        <mesh geometry={topGeo} material={aluMat} />

        {/* Fond : dôme + pied */}
        <mesh geometry={bottomGeo} material={aluMat} />
        <mesh geometry={domeCapGeo} material={aluMat}
              rotation={[Math.PI / 2, 0, 0]} position={[0, -2.3, 0]} />

        {/* Languette stay-on */}
        <group position={[0, 2.462, 0]} rotation={[0, 0.5, 0]}>
          <mesh geometry={rivetGeo} material={tabMat} />
          <mesh geometry={tabRingGeo} material={tabMat} position={[0, 0, 0.155]} />
          <mesh geometry={tabPlateGeo} material={tabMat} position={[0, 0, 0.06]} />
        </group>

      </group>
    </group>
  )
}
