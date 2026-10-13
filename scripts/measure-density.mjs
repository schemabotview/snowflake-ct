// Frame density, measured off the RENDERED route — the half of the CLAUDE.md density targets that
// `npm run check` cannot model. check catches a slide that overflows; this catches the opposite, a
// frame that builds green and leaves its pane half empty.
//
//   slide   rendered slide height / slide pane height      target 0.80–0.95
//   scene   union of node boxes / scene pane, per axis     binding axis >= 0.85, area >= 0.55
//   eyebrow topmost node under the top-left eyebrow label  must not happen
//
// Targets, not thresholds: a deliberately sparse board can sit under them, so this reports and
// flags but always exits 0. It does not see an edge label landing on a card — still look at the route.
//
// Needs the dev server: `npm run dev`, then `npm run density [course-or-route ...]`.
// Chromium: set PUPPETEER_EXECUTABLE_PATH if puppeteer has no downloaded browser (cloud sessions:
// /opt/pw-browsers/chromium).
import { readFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'
import puppeteer from 'puppeteer'

const BASE = process.env.DENSITY_URL ?? 'http://localhost:5173/'

// Routes in syllabus order: src/content/<course>/NN-<id>.ts → #/<course>-<id>.
const registry = readFileSync('src/content/index.ts', 'utf8')
const courses = [...registry.matchAll(/import \{ (\w+) \} from '\.\/(\w+)'/g)].map((m) => m[2])
const routes = courses.flatMap((c) =>
  readdirSync(join('src/content', c))
    .filter((f) => /^\d+-.*\.ts$/.test(f))
    .sort()
    .map((f) => `${c}-${readFileSync(join('src/content', c, f), 'utf8').match(/\bid: '([\w-]+)',/)[1]}`),
)
const args = process.argv.slice(2)
const pick = args.length ? routes.filter((r) => args.some((a) => r === a || r.startsWith(`${a}-`))) : routes

const browser = await puppeteer.launch({ args: ['--no-sandbox'] })
const page = await browser.newPage()
await page.setViewport({ width: 1920, height: 1080 })

let flagged = 0
console.log(`${'route'.padEnd(44)} slide   scene w  h     area   flags`)
for (const route of pick) {
  await page.goto(`${BASE}?capture=1#/${route}`, { waitUntil: 'networkidle0' })
  await page.waitForSelector('.react-flow__node')
  await new Promise((r) => setTimeout(r, 800)) // fitView settles after the first paint
  const m = await page.evaluate(() => {
    const pane = document.querySelector('.scene-area').getBoundingClientRect()
    const slidePane = document.querySelector('.slide-panel').getBoundingClientRect()
    const slide = document.querySelector('.slide-panel__scaler').getBoundingClientRect()
    let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity
    for (const n of document.querySelectorAll('.react-flow__node')) {
      const r = n.getBoundingClientRect()
      x0 = Math.min(x0, r.left); y0 = Math.min(y0, r.top); x1 = Math.max(x1, r.right); y1 = Math.max(y1, r.bottom)
    }
    const top = [...document.querySelectorAll('.react-flow__node')]
      .map((n) => n.getBoundingClientRect())
      .filter((r) => r.top < 60 && r.left < 320).length // the "SUBJECT · COURSE" eyebrow's box
    return { slide: slide.height / slidePane.height, w: (x1 - x0) / pane.width, h: (y1 - y0) / pane.height, top }
  })
  const area = m.w * m.h
  const flags = [
    m.slide < 0.8 && 'slide<0.80',
    m.slide > 0.95 && 'slide>0.95',
    Math.max(m.w, m.h) < 0.85 && 'bind<0.85',
    area < 0.55 && 'area<0.55',
    m.top && 'eyebrow',
  ].filter(Boolean)
  if (flags.length) flagged++
  const f = (n) => n.toFixed(2)
  console.log(`${route.padEnd(44)} ${f(m.slide)}    ${f(m.w)}  ${f(m.h)}  ${f(area)}   ${flags.join(' ')}`)
}
await browser.close()
console.log(flagged ? `\n${flagged} frame(s) under target — look at them.` : '\n✓ every frame within the density targets')
