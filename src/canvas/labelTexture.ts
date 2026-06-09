import * as THREE from 'three'

/**
 * Construit l'étiquette 360° du corps de la canette sur un <canvas>, puis
 * la renvoie en CanvasTexture (albédo plat — l'éclairage vient de la scène).
 *
 * Mise en page autour de la circonférence (u 0→1) :
 *   - FACE  centrée à x = W/2   (taureau + GREENBULL + badge + claim)
 *   - DOS   centré à x = 0 et W (ingrédients, wisdom, code-barres)
 *   - CÔTÉS entre les deux       (micro-copie verticale)
 * Frontière crème → olive ondulée et périodique (raccord invisible à la couture).
 */

const W = 2560
const H = 1600

const CREAM = '#f1ead9'
const OLIVE_TOP = '#7e8a4d'
const OLIVE_BOT = '#5d6a36'
const INK = '#16240f'
const GREEN = '#33501f'
const GREEN_SOFT = '#4d6b30'
const CREAM_TEXT = '#efe9d6'

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.onload = () => resolve(img)
    img.onerror = reject
    img.src = src
  })
}

async function ensureFonts(): Promise<void> {
  if (!('fonts' in document)) return
  const faces = [
    '900 120px Fraunces',
    '700 104px Fraunces',
    '600 60px Fraunces',
    '500 30px "Hanken Grotesk"',
    '600 24px "Hanken Grotesk"',
    '500 22px "DM Mono"',
  ]
  try {
    await Promise.all(faces.map((f) => document.fonts.load(f)))
    await document.fonts.ready
  } catch {
    /* polices indisponibles : on dessine quand même */
  }
}

/** frontière périodique crème→olive : identique en x=0 et x=W */
function boundaryY(x: number): number {
  const t = x / W
  return H * (0.64 + 0.045 * Math.sin(t * Math.PI * 2 - 0.6))
}

function paintBase(ctx: CanvasRenderingContext2D) {
  // crème plein
  ctx.fillStyle = CREAM
  ctx.fillRect(0, 0, W, H)

  // zone olive basse, bord supérieur ondulé
  const grad = ctx.createLinearGradient(0, H * 0.55, 0, H)
  grad.addColorStop(0, OLIVE_TOP)
  grad.addColorStop(1, OLIVE_BOT)
  ctx.fillStyle = grad
  ctx.beginPath()
  ctx.moveTo(0, boundaryY(0))
  const step = 16
  for (let x = step; x <= W; x += step) ctx.lineTo(x, boundaryY(x))
  ctx.lineTo(W, H)
  ctx.lineTo(0, H)
  ctx.closePath()
  ctx.fill()

  // liseré clair sur la frontière (effet sablé premium)
  ctx.strokeStyle = 'rgba(255,255,255,0.10)'
  ctx.lineWidth = 3
  ctx.beginPath()
  ctx.moveTo(0, boundaryY(0))
  for (let x = step; x <= W; x += step) ctx.lineTo(x, boundaryY(x))
  ctx.stroke()
}

/** bandeau "RETURN · RECHARGE" répété en haut (épaule) */
function paintShoulderBand(ctx: CanvasRenderingContext2D) {
  const bandH = H * 0.062
  ctx.fillStyle = '#56632d'
  ctx.fillRect(0, 0, W, bandH)
  ctx.fillStyle = 'rgba(239,233,214,0.92)'
  ctx.font = '500 26px "DM Mono"'
  ctx.textBaseline = 'middle'
  ctx.textAlign = 'left'
  ctx.letterSpacing = '8px'
  const txt = 'RETURN · RECHARGE · '
  const unit = ctx.measureText(txt).width
  for (let x = -unit; x < W + unit; x += unit) ctx.fillText(txt, x, bandH / 2)
  ctx.letterSpacing = '0px'
}

function paintGrain(ctx: CanvasRenderingContext2D) {
  // grain mat subtil (canette sablée)
  for (let i = 0; i < 14000; i++) {
    const x = Math.random() * W
    const y = Math.random() * H
    const dark = Math.random() > 0.5
    ctx.fillStyle = dark ? 'rgba(0,0,0,0.020)' : 'rgba(255,255,255,0.022)'
    ctx.fillRect(x, y, 1.4, 1.4)
  }
}

function drawFront(ctx: CanvasRenderingContext2D, cx: number, bull: HTMLImageElement) {
  ctx.textAlign = 'center'

  // taureau (vrai logo extrait)
  const bw = 320
  const bh = (bull.height / bull.width) * bw
  ctx.drawImage(bull, cx - bw / 2, H * 0.20, bw, bh)

  // wordmark GREENBULL
  ctx.fillStyle = INK
  ctx.font = '700 112px Fraunces'
  ctx.textBaseline = 'alphabetic'
  ctx.letterSpacing = '-2px'
  ctx.fillText('GREENBULL', cx, H * 0.44)
  ctx.letterSpacing = '0px'

  // BY RED BULL
  ctx.fillStyle = GREEN_SOFT
  ctx.font = '500 25px "DM Mono"'
  ctx.letterSpacing = '11px'
  ctx.fillText('BY RED BULL', cx + 6, H * 0.475)
  ctx.letterSpacing = '0px'

  // badge RETURN EDITION
  const badgeW = 380
  const badgeH = 60
  const by = H * 0.505
  roundRect(ctx, cx - badgeW / 2, by, badgeW, badgeH, badgeH / 2)
  ctx.strokeStyle = GREEN
  ctx.lineWidth = 2.5
  ctx.stroke()
  ctx.fillStyle = GREEN
  ctx.font = '600 27px "Hanken Grotesk"'
  ctx.textBaseline = 'middle'
  ctx.letterSpacing = '4px'
  ctx.fillText('RETURN EDITION', cx - 14, by + badgeH / 2 + 1)
  ctx.letterSpacing = '0px'
  // glyphe flèche circulaire dans le badge
  drawReturnGlyph(ctx, cx + badgeW / 2 - 40, by + badgeH / 2, 15, GREEN)

  // claim sur l'olive
  ctx.fillStyle = CREAM_TEXT
  ctx.textBaseline = 'alphabetic'
  ctx.font = '600 40px Fraunces'
  ctx.fillText('Bois-la.', cx, H * 0.745)
  ctx.fillText('Ramène-la.', cx, H * 0.80)
  ctx.fillText('Gagne.', cx, H * 0.855)

  // volume
  ctx.fillStyle = 'rgba(239,233,214,0.75)'
  ctx.font = '500 24px "DM Mono"'
  ctx.letterSpacing = '3px'
  ctx.fillText('250 ml', cx, H * 0.93)
  ctx.letterSpacing = '0px'
}

function drawBack(ctx: CanvasRenderingContext2D, cx: number) {
  ctx.textAlign = 'center'

  ctx.fillStyle = INK
  ctx.font = '600 58px Fraunces'
  ctx.fillText('GREENBULL', cx, H * 0.215)

  ctx.fillStyle = GREEN_SOFT
  ctx.font = '500 20px "DM Mono"'
  ctx.letterSpacing = '8px'
  ctx.fillText('BY RED BULL', cx, H * 0.245)
  ctx.letterSpacing = '0px'

  const lines = [
    "GreenBull Return Edition est pensée pour celles",
    "et ceux qui rendent ce qu'ils empruntent.",
    "Énergie plus clean, aluminium recyclable à l'infini,",
    'et une canette qui garde de la valeur.',
  ]
  ctx.fillStyle = 'rgba(40,52,28,0.82)'
  ctx.font = '500 24px "Hanken Grotesk"'
  lines.forEach((l, i) => ctx.fillText(l, cx, H * 0.32 + i * 34))

  // 3 pictos
  const items = ['INGRÉDIENTS NATURELS', 'RECYCLE & RETURN', 'ANTI-CRASH']
  const gap = 360
  items.forEach((label, i) => {
    const x = cx + (i - 1) * gap
    drawReturnGlyph(ctx, x, H * 0.49, 22, GREEN)
    ctx.fillStyle = GREEN
    ctx.font = '600 18px "Hanken Grotesk"'
    ctx.letterSpacing = '2px'
    ctx.fillText(label, x, H * 0.535)
    ctx.letterSpacing = '0px'
  })

  // wisdom (sur l'olive)
  ctx.fillStyle = CREAM_TEXT
  ctx.font = '600 30px Fraunces'
  ctx.fillText('THE GREENBULL WISDOM', cx, H * 0.72)
  ctx.font = '500 22px "Hanken Grotesk"'
  ctx.fillStyle = 'rgba(239,233,214,0.85)'
  ctx.fillText("« Cette canette vaut encore quelque chose. »", cx, H * 0.76)

  // code-barres factice + url
  drawBarcode(ctx, cx - 150, H * 0.83, 300, 70)
  ctx.fillStyle = 'rgba(239,233,214,0.8)'
  ctx.font = '500 22px "DM Mono"'
  ctx.letterSpacing = '4px'
  ctx.fillText('greenbull.com', cx, H * 0.935)
  ctx.letterSpacing = '0px'
}

function drawSides(ctx: CanvasRenderingContext2D) {
  const msg = 'JE NE SUIS PAS UN DÉCHET — JE SUIS UNE FUTURE CANETTE'
  for (const cx of [W * 0.25, W * 0.75]) {
    ctx.save()
    ctx.translate(cx, H * 0.52)
    ctx.rotate(-Math.PI / 2)
    ctx.fillStyle = 'rgba(30,42,18,0.30)'
    ctx.font = '600 26px "Hanken Grotesk"'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.letterSpacing = '6px'
    ctx.fillText(msg, 0, 0)
    ctx.restore()
  }
  ctx.letterSpacing = '0px'
}

/* ---------- helpers ---------- */

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
) {
  ctx.beginPath()
  ctx.moveTo(x + r, y)
  ctx.arcTo(x + w, y, x + w, y + h, r)
  ctx.arcTo(x + w, y + h, x, y + h, r)
  ctx.arcTo(x, y + h, x, y, r)
  ctx.arcTo(x, y, x + w, y, r)
  ctx.closePath()
}

/** flèche circulaire (symbole "return") */
function drawReturnGlyph(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  r: number,
  color: string,
) {
  ctx.save()
  ctx.strokeStyle = color
  ctx.fillStyle = color
  ctx.lineWidth = Math.max(2, r * 0.16)
  ctx.beginPath()
  ctx.arc(x, y, r, Math.PI * 0.15, Math.PI * 1.75)
  ctx.stroke()
  // pointe de flèche
  const a = Math.PI * 1.75
  const tipX = x + r * Math.cos(a)
  const tipY = y + r * Math.sin(a)
  ctx.beginPath()
  ctx.moveTo(tipX, tipY)
  ctx.lineTo(tipX - r * 0.5, tipY - r * 0.12)
  ctx.lineTo(tipX - r * 0.12, tipY + r * 0.5)
  ctx.closePath()
  ctx.fill()
  ctx.restore()
}

function drawBarcode(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
) {
  ctx.fillStyle = 'rgba(239,233,214,0.85)'
  let cur = x
  while (cur < x + w) {
    const bw = 2 + Math.random() * 6
    if (Math.random() > 0.4) ctx.fillRect(cur, y, bw, h)
    cur += bw + 2 + Math.random() * 3
  }
}

export async function createLabelTexture(): Promise<THREE.CanvasTexture> {
  // Pas de cache singleton : en StrictMode le double-montage disposerait la
  // texture GPU partagée et le 2e montage hériterait d'une texture invalide.
  await ensureFonts()
  const bull = await loadImage('/textures/bull-mark.png')

  const canvas = document.createElement('canvas')
  canvas.width = W
  canvas.height = H
  const ctx = canvas.getContext('2d')!

  paintBase(ctx)
  paintShoulderBand(ctx)
  drawSides(ctx)
  drawFront(ctx, W / 2, bull)
  drawBack(ctx, 0)
  drawBack(ctx, W)
  paintGrain(ctx)

  const tex = new THREE.CanvasTexture(canvas)
  tex.colorSpace = THREE.SRGBColorSpace
  tex.wrapS = THREE.ClampToEdgeWrapping
  tex.wrapT = THREE.ClampToEdgeWrapping
  tex.anisotropy = 8
  tex.needsUpdate = true
  return tex
}
