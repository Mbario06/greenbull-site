// build-assets.mjs
// Pipeline d'assets GreenBull :
//  1. Extrait le logo "double taureau + soleil" des photos (clé de saturation,
//     fond crème + transparence supprimés) -> public/textures/bull-mark.png
//  2. Optimise les 8 rendus + l'affiche en .webp (transparence conservee)
//     vers public/can/ pour les sections de contenu.
//
// Aucune dependance native exotique : uniquement `sharp`.
// Lancement : node scripts/build-assets.mjs

import sharp from 'sharp'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { mkdirSync } from 'node:fs'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')
const SRC = join(ROOT, '..') // dossier ED03 ou se trouvent les PNG bruts
const OUT_TEX = join(ROOT, 'public', 'textures')
const OUT_CAN = join(ROOT, 'public', 'can')

mkdirSync(OUT_TEX, { recursive: true })
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

const BULL_SOURCE = join(SRC, PHOTOS['front'])

// ─────────────────────────────────────────────────────────────────────────────
// 1. Extraction du logo taureau par cle de saturation
// ─────────────────────────────────────────────────────────────────────────────
async function extractBull() {
  // Region genereuse autour du logo (image source 1086x1448).
  // Le logo (taureaux rouges + soleil jaune) se situe au-dessus du wordmark.
  const region = { left: 240, top: 360, width: 600, height: 300 }

  const { data, info } = await sharp(BULL_SOURCE)
    .extract(region)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true })

  const { width, height, channels } = info
  const out = Buffer.alloc(width * height * 4)

  // Bornes du bounding box des pixels conserves
  let minX = width, minY = height, maxX = 0, maxY = 0
  let kept = 0

  for (let i = 0; i < width * height; i++) {
    const r = data[i * channels]
    const g = data[i * channels + 1]
    const b = data[i * channels + 2]
    const a = channels === 4 ? data[i * channels + 3] : 255

    const max = Math.max(r, g, b)
    const min = Math.min(r, g, b)
    const sat = max === 0 ? 0 : (max - min) / max

    // On garde le rouge vif et le jaune vif (le taureau + le soleil),
    // on jette le creme (faible saturation) et le transparent.
    // Le vert du wordmark est exclu par la region (au-dessus de GREENBULL).
    const isVivid = sat > 0.45 && max > 110 && a > 200
    // Anti-vert de securite : si vert nettement dominant -> on jette
    const isGreenish = g > r + 12 && g > b + 12

    let alpha = 0
    if (isVivid && !isGreenish) {
      // feather sur le bord de seuil de saturation
      alpha = Math.round(Math.max(0, Math.min(1, (sat - 0.42) / 0.12)) * 255)
    }

    const o = i * 4
    out[o] = r
    out[o + 1] = g
    out[o + 2] = b
    out[o + 3] = alpha

    if (alpha > 24) {
      kept++
      const x = i % width
      const y = (i / width) | 0
      if (x < minX) minX = x
      if (y < minY) minY = y
      if (x > maxX) maxX = x
      if (y > maxY) maxY = y
    }
  }

  if (kept < 200) {
    throw new Error(`Extraction taureau: trop peu de pixels (${kept}). Ajuster region/seuils.`)
  }

  // padding et recadrage serre
  const pad = 10
  minX = Math.max(0, minX - pad)
  minY = Math.max(0, minY - pad)
  maxX = Math.min(width - 1, maxX + pad)
  maxY = Math.min(height - 1, maxY + pad)
  const bw = maxX - minX + 1
  const bh = maxY - minY + 1

  await sharp(out, { raw: { width, height, channels: 4 } })
    .extract({ left: minX, top: minY, width: bw, height: bh })
    .png()
    .toFile(join(OUT_TEX, 'bull-mark.png'))

  console.log(`✓ bull-mark.png  ${bw}x${bh}  (pixels conserves: ${kept})`)
}

// ─────────────────────────────────────────────────────────────────────────────
// 2. Détourage : le fond est un damier de transparence "cuit" par ChatGPT
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

await extractBull()
await optimizePhotos()
console.log('Termine.')
