// build-assets.mjs
// Pipeline d'assets GreenBull (uniquement `sharp`) :
//  1. Rendus + affiche détourés en .webp -> public/can/ (sections de contenu).
//  2. Frames "turntable" alignées (face → 3/4 → dos) -> public/can/turn-*.webp
//     (rotation de la canette par fondu enchaîné au scroll).
//
// Le fond des PNG sources est un damier de transparence "cuit" par ChatGPT :
// on le retire par flood-fill depuis les bords.
// Lancement : node scripts/build-assets.mjs

import sharp from 'sharp'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { mkdirSync } from 'node:fs'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')
const SRC = join(ROOT, '..') // dossier ED03 ou se trouvent les PNG bruts
const OUT_CAN = join(ROOT, 'public', 'can')

mkdirSync(OUT_CAN, { recursive: true })

// Mapping des fichiers source -> noms semantiques
const PHOTOS = {
  'front':     'ChatGPT Image 9 juin 2026, 17_28_58 (1).png', // face, le plus frontal
  'front-b':   'ChatGPT Image 9 juin 2026, 17_27_10 (2).png', // face alternative
  'tilt-left': 'ChatGPT Image 9 juin 2026, 17_27_10 (1).png',
  'q3-a':      'ChatGPT Image 9 juin 2026, 17_27_11 (3).png',
  'q3-b':      'ChatGPT Image 9 juin 2026, 17_27_11 (4).png',
  'q3-c':      'ChatGPT Image 9 juin 2026, 17_28_58 (2).png',
  'top':       'ChatGPT Image 9 juin 2026, 17_28_59 (3).png',
  'back':      'ChatGPT Image 9 juin 2026, 17_28_59 (4).png',
  'poster':    'ChatGPT Image 12 mai 2026 à 16_38_36.png',
}

// ─────────────────────────────────────────────────────────────────────────────
// 1. Détourage : le fond est un damier de transparence "cuit" par ChatGPT
//    (carrés neutres clairs ~225/248). On le retire par flood-fill depuis les
//    bords — les pixels neutres-clairs connectés au bord deviennent transparents.
//    L'étiquette crème (chaude, R>G>B) et les reflets métal (intérieurs) survivent.
// ─────────────────────────────────────────────────────────────────────────────
function isNeutralLight(r, g, b) {
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  return max >= 206 && max - min <= 16
}

async function cutoutCan(srcPath, outPath, targetW) {
  const { data, info } = await sharp(srcPath)
    .resize({ width: targetW, withoutEnlargement: true })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true })

  const { width, height, channels } = info
  const n = width * height
  const removed = new Uint8Array(n)
  const stack = []

  const idx = (x, y) => y * width + x
  const pushIfBg = (x, y) => {
    const i = idx(x, y)
    if (removed[i]) return
    const o = i * channels
    if (isNeutralLight(data[o], data[o + 1], data[o + 2])) {
      removed[i] = 1
      stack.push(i)
    }
  }

  // amorcer depuis tout le pourtour
  for (let x = 0; x < width; x++) {
    pushIfBg(x, 0)
    pushIfBg(x, height - 1)
  }
  for (let y = 0; y < height; y++) {
    pushIfBg(0, y)
    pushIfBg(width - 1, y)
  }

  // BFS/DFS de proche en proche
  while (stack.length) {
    const i = stack.pop()
    const x = i % width
    const y = (i / width) | 0
    if (x > 0) pushIfBg(x - 1, y)
    if (x < width - 1) pushIfBg(x + 1, y)
    if (y > 0) pushIfBg(x, y - 1)
    if (y < height - 1) pushIfBg(x, y + 1)
  }

  // application alpha + léger feather sur la frange neutre du bord
  for (let i = 0; i < n; i++) {
    const o = i * channels
    if (removed[i]) {
      data[o + 3] = 0
      continue
    }
    // pixel conservé touchant une zone retirée + très neutre-clair -> semi-transparent
    const x = i % width
    const y = (i / width) | 0
    const touches =
      (x > 0 && removed[i - 1]) ||
      (x < width - 1 && removed[i + 1]) ||
      (y > 0 && removed[i - width]) ||
      (y < height - 1 && removed[i + width])
    if (touches && isNeutralLight(data[o], data[o + 1], data[o + 2])) {
      data[o + 3] = 90
    }
  }

  await sharp(data, { raw: { width, height, channels } })
    .webp({ quality: 88, alphaQuality: 100, effort: 5 })
    .toFile(outPath)
}

// ─────────────────────────────────────────────────────────────────────────────
// 2. Frames "turntable" alignées : on détoure, on recadre sur la canette, on la
//    remet centrée à hauteur constante sur un canevas fixe -> le fondu enchaîné
//    au scroll superpose des canettes alignées (pas de saut).
// ─────────────────────────────────────────────────────────────────────────────
async function cutoutToPng(srcPath, targetW) {
  const { data, info } = await sharp(srcPath)
    .resize({ width: targetW, withoutEnlargement: true })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true })
  const { width, height, channels } = info
  const removed = new Uint8Array(width * height)
  const stack = []
  const pushIfBg = (x, y) => {
    const i = y * width + x
    if (removed[i]) return
    const o = i * channels
    if (isNeutralLight(data[o], data[o + 1], data[o + 2])) {
      removed[i] = 1
      stack.push(i)
    }
  }
  for (let x = 0; x < width; x++) { pushIfBg(x, 0); pushIfBg(x, height - 1) }
  for (let y = 0; y < height; y++) { pushIfBg(0, y); pushIfBg(width - 1, y) }
  while (stack.length) {
    const i = stack.pop()
    const x = i % width
    const y = (i / width) | 0
    if (x > 0) pushIfBg(x - 1, y)
    if (x < width - 1) pushIfBg(x + 1, y)
    if (y > 0) pushIfBg(x, y - 1)
    if (y < height - 1) pushIfBg(x, y + 1)
  }
  for (let i = 0; i < width * height; i++) if (removed[i]) data[i * channels + 3] = 0
  return sharp(data, { raw: { width, height, channels } }).png().toBuffer()
}

const FRAME_W = 880
const FRAME_H = 1340
const CAN_H = 1200

async function alignedFrame(srcFile, outName) {
  const png = await cutoutToPng(join(SRC, srcFile), 1000)
  const trimmed = await sharp(png)
    .trim({ background: { r: 0, g: 0, b: 0, alpha: 0 }, threshold: 0 })
    .resize({ height: CAN_H })
    .png()
    .toBuffer()
  const m = await sharp(trimmed).metadata()
  await sharp({
    create: { width: FRAME_W, height: FRAME_H, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } },
  })
    .composite([
      {
        input: trimmed,
        left: Math.round((FRAME_W - m.width) / 2),
        top: Math.round((FRAME_H - CAN_H) / 2),
      },
    ])
    .webp({ quality: 90, alphaQuality: 100, effort: 5 })
    .toFile(join(OUT_CAN, outName))
  console.log(`✓ can/${outName}  (${m.width}x${CAN_H} centrée)`)
}

async function optimizePhotos() {
  for (const [name, file] of Object.entries(PHOTOS)) {
    const src = join(SRC, file)
    if (name === 'poster') {
      await sharp(src)
        .resize({ width: 1600, withoutEnlargement: true })
        .webp({ quality: 86, effort: 5 })
        .toFile(join(OUT_CAN, `${name}.webp`))
    } else {
      await cutoutCan(src, join(OUT_CAN, `${name}.webp`), 1000)
    }
    console.log(`✓ can/${name}.webp`)
  }
}

// frames du turntable, dans l'ordre de rotation
await alignedFrame(PHOTOS['front'], 'turn-0.webp')
await alignedFrame(PHOTOS['q3-c'], 'turn-1.webp')
await alignedFrame(PHOTOS['top'], 'turn-2.webp')
await alignedFrame(PHOTOS['back'], 'turn-3.webp')
await optimizePhotos()
console.log('Termine.')
