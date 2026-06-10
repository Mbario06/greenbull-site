import { useRef, useMemo } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { useTexture } from '@react-three/drei'
import * as THREE from 'three'

/* ── Dimensions canette slim 250 ml ──────────────────────────────────────── */
const R  = 1.00   // rayon corps
const H  = 3.80   // hauteur corps
const HH = H / 2  // 1.90

/* ── Profil dôme bas — LatheGeometry simple, zéro retournement de profil ── */
const DOME_PTS = [
  new THREE.Vector2(0.86, 0.000),  // bord intérieur footring
  new THREE.Vector2(0.74, 0.062),
  new THREE.Vector2(0.58, 0.130),
  new THREE.Vector2(0.38, 0.192),
  new THREE.Vector2(0.16, 0.236),
  new THREE.Vector2(0.02, 0.248),  // centre (R=0.02 pour éviter le pôle dégénéré)
]

export function CanModel() {
  const groupRef = useRef<THREE.Group>(null)
  const { gl } = useThree()

  /* ── Texture label ───────────────────────────────────────────────────── */
  const label = useTexture(`${import.meta.env.BASE_URL}can/label.png`)
  useMemo(() => {
    label.wrapS       = THREE.RepeatWrapping
    label.colorSpace  = THREE.SRGBColorSpace
    label.anisotropy  = gl.capabilities.getMaxAnisotropy()
    label.offset.x    = 0.5   // U=0 → face +Z ; logo GREENBULL à U≈0.5 → face caméra
    label.needsUpdate = true
  }, [label, gl])

  /* ── Matériaux ───────────────────────────────────────────────────────── */
  const bodyMat = useMemo(() => new THREE.MeshStandardMaterial({
    map:             label,
    metalness:       0.45,
    roughness:       0.32,
    envMapIntensity: 1.2,
  }), [label])

  const aluMat = useMemo(() => new THREE.MeshStandardMaterial({
    color:           new THREE.Color('#ccc9bf'),
    metalness:       0.72,
    roughness:       0.22,
    envMapIntensity: 1.1,
    side:            THREE.DoubleSide,
  }), [])

  /* ── Géométries ──────────────────────────────────────────────────────── */

  // Corps — CylinderGeometry ouvert, UVs cylindriques natifs pour le label
  const bodyGeo = useMemo(
    () => new THREE.CylinderGeometry(R, R, H, 128, 1, true), [])

  // TOP ─────────────────────────────────────────────────────────────────
  // Épaule : frustum R=1.00→0.76 sur 0.30u (normales propres, pas de CatmullRom)
  const shoulderGeo = useMemo(
    () => new THREE.CylinderGeometry(0.76, R, 0.30, 128, 1, true), [])

  // Chime : vrai tore horizontal (TorusGeometry) — anneau bead visible
  // Centre anneau R=0.80, tube r=0.04 → bord interne R=0.76 = raccord neck ✓
  const chimeGeo = useMemo(
    () => new THREE.TorusGeometry(0.80, 0.040, 32, 128), [])

  // Couvercle : disque plat (CircleGeometry) — normales correctes, pas de pôle pinché
  const lidGeo = useMemo(
    () => new THREE.CircleGeometry(0.80, 128), [])

  // BOTTOM ──────────────────────────────────────────────────────────────
  // Chanfrein : frustum R=1.00→0.88 sur 0.18u
  const chamferGeo = useMemo(
    () => new THREE.CylinderGeometry(R, 0.88, 0.18, 128, 1, true), [])

  // Footring : tore horizontal fin
  const footringGeo = useMemo(
    () => new THREE.TorusGeometry(0.88, 0.022, 16, 128), [])

  // Dôme : LatheGeometry simple (profil monotone ↑, normales propres)
  const domeGeo = useMemo(() => {
    const g = new THREE.LatheGeometry([...DOME_PTS], 128)
    g.computeVertexNormals()
    return g
  }, [])

  // Capuchon centre dôme : petit disque pour fermer le trou à R=0.02
  const domeCapGeo = useMemo(
    () => new THREE.CircleGeometry(0.02, 64), [])

  /* ── Animation scroll ────────────────────────────────────────────────── */
  const st = useRef({ smoothY: 0, lean: 0, prevRaw: 0 })

  useFrame(() => {
    if (!groupRef.current) return
    const s     = st.current
    const limit = document.documentElement.scrollHeight - window.innerHeight
    const rawP  = limit > 0 ? window.scrollY / limit : 0
    const vRaw  = rawP - s.prevRaw
    s.prevRaw   = rawP

    /* 1044° (5.8π) sur toute la page ≈ 2.9 tours */
    s.smoothY += (rawP * Math.PI * 5.8 - s.smoothY) * 0.17

    /* Tilt cinétique selon la vitesse de scroll */
    const tLean = Math.max(-0.18, Math.min(0.18, -vRaw * 1200))
    s.lean     += (tLean - s.lean) * 0.07

    groupRef.current.rotation.y = s.smoothY
    groupRef.current.rotation.z = s.lean
    groupRef.current.position.y =
      Math.sin(performance.now() / 2000) * 0.06 - rawP * 0.22
  })

  /* ── Positions ───────────────────────────────────────────────────────── */
  const SHOULDER_Y = HH + 0.15        //  2.05  — centre frustum épaule
  const CHIME_Y    = HH + 0.30        //  2.20  — centre tore chime (= haut épaule)
  const LID_Y      = CHIME_Y + 0.040  //  2.240 — couvercle sur le dessus du chime

  const CHAMFER_Y  = -(HH + 0.09)     // -1.99  — centre frustum chanfrein
  const FOOTRING_Y = -(HH + 0.18)     // -2.08  — tore footring (= bas chanfrein)
  const DOME_Y     = FOOTRING_Y       // -2.08  — origine LatheGeo dôme
  const DOMECAP_Y  = DOME_Y + 0.248   // -1.832 — capuchon centre dôme

  return (
    <group ref={groupRef} scale={0.67}>

      {/* Corps — label texture */}
      <mesh geometry={bodyGeo} material={bodyMat} />

      {/* ── TOP ──────────────────────────────────────────────────────── */}
      {/* Épaule : frustum R=1.00→0.76 */}
      <mesh geometry={shoulderGeo} material={aluMat}
            position={[0, SHOULDER_Y, 0]} />

      {/* Chime : tore horizontal — bord interne R=0.76 raccorde l'épaule */}
      <mesh geometry={chimeGeo} material={aluMat}
            rotation={[Math.PI / 2, 0, 0]}
            position={[0, CHIME_Y, 0]} />

      {/* Couvercle : disque plat face +Y */}
      <mesh geometry={lidGeo} material={aluMat}
            rotation={[-Math.PI / 2, 0, 0]}
            position={[0, LID_Y, 0]} />

      {/* ── BOTTOM ───────────────────────────────────────────────────── */}
      {/* Chanfrein : frustum R=1.00→0.88 */}
      <mesh geometry={chamferGeo} material={aluMat}
            position={[0, CHAMFER_Y, 0]} />

      {/* Footring : tore horizontal fin */}
      <mesh geometry={footringGeo} material={aluMat}
            rotation={[Math.PI / 2, 0, 0]}
            position={[0, FOOTRING_Y, 0]} />

      {/* Dôme : bol concave LatheGeometry (normales propres, zéro retournement) */}
      <mesh geometry={domeGeo} material={aluMat}
            position={[0, DOME_Y, 0]} />

      {/* Capuchon centre dôme : ferme le trou R=0.02, face -Y */}
      <mesh geometry={domeCapGeo} material={aluMat}
            rotation={[Math.PI / 2, 0, 0]}
            position={[0, DOMECAP_Y, 0]} />

    </group>
  )
}
