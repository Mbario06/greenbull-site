/**
 * generate-can.mjs  v5
 * Génère public/can/model.glb — canette slim 250 ml.
 *
 * v5 — profils dérivés des images de référence GreenBull :
 *
 *  TOP :
 *  ─ Épaule S-curve franche depuis R=1.000
 *  ─ Neck minimum R=0.755 (à ~70% de la hauteur du top)
 *  ─ Chime (bead) R=0.858 — c'est le trait visuel clé des images de référence :
 *    le rebord annulaire qui donne l'aspect "vrai dessus de canette"
 *  ─ Lid seam + plat fidèles (R≈0.830 puis ferme à 0)
 *  ─ Hauteur totale : 0.420u (vs 0.360 en v4)
 *
 *  BOTTOM :
 *  ─ Chamfer doux (référence images : bas sobre, footring fin)
 *  ─ Footring crest à -HH-0.218 (moins profond que v4 → moins "dramatique")
 *  ─ Dome center à -HH+0.008 (intérieur, DoubleSide gère les normales)
 *  ─ Hauteur totale : ~0.218u
 *
 * Usage : node scripts/generate-can.mjs
 */

/* ── Polyfills Node.js ──────────────────────────────────────────────────── */
import { Blob as NodeBlob } from 'buffer'
if (typeof globalThis.Blob === 'undefined') globalThis.Blob = NodeBlob

globalThis.FileReader = class NodeFileReader {
  readAsArrayBuffer(blob) {
    const self     = this
    const realBlob = blob instanceof NodeBlob ? blob : new NodeBlob([blob])
    realBlob.arrayBuffer().then(buf => {
      self.result = buf
      if (typeof self.onload    === 'function') self.onload({ target: self })
      if (typeof self.onloadend === 'function') self.onloadend({ target: self })
    })
  }
}

/* ── Imports ────────────────────────────────────────────────────────────── */
import * as THREE from 'three'
import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter.js'
import { writeFileSync, mkdirSync } from 'fs'
import { dirname, resolve } from 'path'
import { fileURLToPath } from 'url'

const __dir = dirname(fileURLToPath(import.meta.url))
const OUT   = resolve(__dir, '../public/can/model.glb')

/* ── Dimensions canette slim 250 ml ─────────────────────────────────────── */
const R   = 1.00
const H   = 3.80
const HH  = H / 2      // 1.90
const SEG = 128
const PTS = 100

function smoothProfile(ctrl, n = PTS) {
  const pts3D = ctrl.map(([x, y]) => new THREE.Vector3(x, y, 0))
  const curve  = new THREE.CatmullRomCurve3(pts3D, false, 'catmullrom', 0.5)
  return curve.getPoints(n).map(p => new THREE.Vector2(Math.max(0, p.x), p.y))
}

/* ─────────────────────────────────────────────────────────────────────────
   PROFIL HAUT v5  — extrait des images de référence GreenBull

   Observations sur les renders de référence :
   ─ La zone corps→col suit une S-curve franche et courte
   ─ Le neck minimum est clairement visible et assez prononcé
   ─ Le CHIME (bead) est l'élément visuel le plus distinctif :
     un anneau qui s'élargit au-dessus du col → c'est ce qui donne
     l'aspect "vrai dessus de canette aluminium" qu'on n'avait pas avant
   ─ Le couvercle (lid) est plat, à R≈0.830 puis se ferme au centre
   ─ Vue du dessus (référence) : le bord extérieur du lid ≈ 85% du corps

   Points de contrôle → 100 points CatmullRom lissés
   ───────────────────────────────────────────────────────────────────────── */
const topCtrl = [
  // ── Ancre jonction (force normale radiale = zéro couture avec le corps)
  [1.000, HH + 0.000],
  [1.000, HH + 0.002],

  // ── Épaule S-curve franche
  //    Inspiré : la canette commence à se rétrécir immédiatement et de façon nette
  [0.974, HH + 0.046],
  [0.928, HH + 0.118],   // steepest de la S-curve
  [0.874, HH + 0.192],
  [0.816, HH + 0.255],   // épaule-col jonction

  // ── Col (neck) — le point d'étranglement
  //    Référence : neck visible à R≈0.755, situé à ~70% de la hauteur du top
  [0.773, HH + 0.295],
  [0.755, HH + 0.318],   // ── NECK MINIMUM  R=0.755

  // ── Chime (bead) — TRAIT VISUEL CLÉ
  //    Sur les images de référence, le rebord annulaire argenté au-dessus
  //    du col est très visible. Il monte à R≈0.855–0.860.
  //    C'est ce qui donne l'aspect "vraie canette" qu'on n'avait pas.
  [0.798, HH + 0.338],   // montée vers chime
  [0.858, HH + 0.368],   // ── CHIME PEAK  R=0.858  ← NOUVEAU vs v4 (était 0.742)

  // ── Lid (couvercle)
  //    Post-chime : légère descente vers le seam, puis lid plat
  [0.830, HH + 0.386],   // lid seam
  [0.428, HH + 0.414],   // lid plat
  [0.000, HH + 0.420],   // centre lid — hauteur totale top : 0.420u
]

/* ─────────────────────────────────────────────────────────────────────────
   PROFIL BAS v5  — extrait des images de référence GreenBull

   Observations :
   ─ Sur les vues frontales et légèrement inclinées, le bas est SOBRE :
     chamfer doux, footring très fin, dome pas trop dramatique
   ─ Vue du dessous (référence) : footring en anneau fin, dome concave central
   ─ Hauteur totale visible du bas ≈ 5–7 % de la hauteur totale = court

   Le DoubleSide sur le matériau alu (CanModel.tsx) gère les faces
   à normales inversées de la zone dome interior.
   ───────────────────────────────────────────────────────────────────────── */
const botCtrl = [
  // ── Ancre jonction
  [1.000, -HH - 0.000],
  [1.000, -HH - 0.002],

  // ── Chamfer corps → base (doux, comme sur les références)
  [0.986, -HH - 0.030],
  [0.960, -HH - 0.074],
  [0.930, -HH - 0.128],
  [0.900, -HH - 0.172],

  // ── Footring V — crest fin, paroi intérieure distincte
  [0.860, -HH - 0.218],   // ── CRÊTE FOOTRING (moins profond que v4 → plus sobre)
  [0.808, -HH - 0.182],   // paroi intérieure footring

  // ── Dome concave
  [0.710, -HH - 0.146],
  [0.470, -HH - 0.082],
  [0.210, -HH - 0.028],
  [0.000, -HH + 0.008],   // centre dome (légèrement au-dessus → DoubleSide gère)
]

/* ── Géométries ─────────────────────────────────────────────────────────── */
const topPoints = smoothProfile(topCtrl, PTS)
const botPoints = smoothProfile(botCtrl, PTS)

const bodyGeo = new THREE.CylinderGeometry(R, R, H, SEG, 1, true)
bodyGeo.computeVertexNormals()

const topGeo = new THREE.LatheGeometry(topPoints, SEG)
topGeo.computeVertexNormals()

const botGeo = new THREE.LatheGeometry(botPoints, SEG)
botGeo.computeVertexNormals()

/* ── Scène & Export ─────────────────────────────────────────────────────── */
const scene = new THREE.Scene()

const bodyMesh = new THREE.Mesh(bodyGeo, new THREE.MeshStandardMaterial())
bodyMesh.name  = 'body'
scene.add(bodyMesh)

const topMesh  = new THREE.Mesh(topGeo, new THREE.MeshStandardMaterial())
topMesh.name   = 'top'
scene.add(topMesh)

const botMesh  = new THREE.Mesh(botGeo, new THREE.MeshStandardMaterial())
botMesh.name   = 'bottom'
scene.add(botMesh)

const exporter = new GLTFExporter()
console.log('Génération du modèle GLB v5...')

exporter.parse(
  scene,
  (result) => {
    const buffer = Buffer.from(result)
    mkdirSync(resolve(__dir, '../public/can'), { recursive: true })
    writeFileSync(OUT, buffer)
    const kb = (buffer.byteLength / 1024).toFixed(1)
    console.log(`✓ public/can/model.glb généré (${kb} KB)`)
    console.log(`  body   : ${bodyGeo.attributes.position.count} vertices, H=${H}, SEG=${SEG}`)
    console.log(`  top    : ${topGeo.attributes.position.count} vertices`)
    console.log(`           neck R=0.755 @ HH+0.318, chime R=0.858 @ HH+0.368, lid top HH+0.420`)
    console.log(`  bottom : ${botGeo.attributes.position.count} vertices`)
    console.log(`           crest -HH-0.218, dome center -HH+0.008`)
  },
  (err) => { console.error('Erreur :', err); process.exit(1) },
  { binary: true }
)
