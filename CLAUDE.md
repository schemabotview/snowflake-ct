# CLAUDE.md — snowflake-ct

> The workspace-level `CLAUDE.md` (one level up, in `graphl-workspace`) holds the invariants that
> span every repo. This file is only what is true *here*.

## What this repo is

The Snowflake GraphL concept app: 11 courses, one per chapter of `docs/SNOWFLAKE-COURSE-PLAN.md`,
83 sections in all. A **section** is `(scene, slide, narration)` and is one segment of the course
video. One section = one slide.

The render engine is `@graphlearning/flow`; the app shell is `@graphlearning/shell`. Both are
**published packages pinned by version**. This repo's own surface is `src/content/`, `src/scenes/`,
`src/main.tsx` and `src/theme.css` — nothing else.

## Course arc and route contract

Routes are `#/<courseId>-<sectionId>`. Course ids, in syllabus order:

`platform` · `access` · `tables` · `loading` · `transform` · `incremental` · `pipelines` ·
`performance` · `governance` · `operations` · `architecture`

Every course follows one retail example (orders, customer updates, reference data → trusted details
and business summaries). Keep table, warehouse and role names consistent across courses:
database `RETAIL` with schemas `RAW` (as landed: `ORDERS`, stage `LANDING`), `SALES` (cleaned:
`ORDERS`, `CUSTOMERS`, view `DAILY_REVENUE`; managed access) and `REFERENCE` (`PRODUCTS`, `STORES`);
warehouses `BI_WH` (Small) and `LOAD_WH` (Medium); account roles `ANALYST`, `LOADER`, `RETAIL_ADMIN`
(owns `RETAIL`, granted to `SYSADMIN`); database roles `RETAIL.SALES_READ`, `RETAIL.RAW_WRITE`;
users `ANA` (PERSON) and `LOADER_SVC` (SERVICE); storage integration `S3_RETAIL_INT` on
`s3://retailco-landing/orders/`; organisation `RETAILCO` with accounts `PROD`, `EUPROD`, `DEV`.
Row counts: `SALES.ORDERS` holds 6 orders, `RAW.ORDERS` 9 rows (3 duplicate deliveries).
Chapter 3 adds: transient `RAW.ORDERS_BATCH`, `RAW.CUSTOMER_UPDATES` (C-207 Leeds 09:00 / York 11:30,
C-388 Bath), `SALES.CUSTOMERS` (C-150 Derby, C-207 Hull → York after MERGE), clone database `RETAIL_DEV`,
the 14:05 bad-UPDATE incident on 2 October.

Teaching order per section, from the plan: objective → mental model → annotated example and expected
behaviour → alternative or failure contrast → summary → bridge.

### Accuracy

Snowflake is continuously delivered. Before stating a limit, default, edition requirement or billing
rule, check it against current docs.snowflake.com (this container's network policy blocks the site
directly; web search against it works). Label assumptions on screen — credits, not money; state
cloud, Region, edition and table type where they matter.

## Scene inventory

| Course | Scene id | Used by | Shape |
| --- | --- | --- | --- |
| platform | `workload-requirements` | §1 | sources → Snowflake (details + summaries, requirements) → consumers |
| platform | `three-layers` | §2 | cloud services / compute / storage, with "owned by you" below |
| platform | `org-accounts` | §3 | organisation of three accounts + identifier code card |
| platform | `session-context` | §4 | session.sql → session context → warehouses → storage layer (3 tables) |
| platform | `first-query` | §5 | input table → annotated SQL → result table |
| platform | `cost-ledger` | §6 | warehouse DDL → assumption ledger → lifecycle |
| access | `object-tree` | §1 | account-level objects + database RETAIL (3 schemas) → names.sql |
| access | `name-resolution` | §2 | unqualified statement → two sessions (6 vs 9) → case-rules table |
| access | `users-authentication` | §3 | network policy → PERSON / SERVICE users → service user DDL |
| access | `role-hierarchy` | §4 | system roles → RETAIL_ADMIN → working roles → users → roles.sql |
| access | `access-chain` | §5 | four-link privilege chain → role matrix → denied query |
| access | `database-roles` | §6 | database roles → account roles (+ share) → DDL |
| access | `managed-access` | §7 | standard vs managed access schema → future grants |
| access | `stage-access` | §8 | Snowflake privileges → AWS IAM → integration + stage DDL |
| tables | `data-contract` | §1 | ORDERS schema + contract table → type guard |
| tables | `constraint-enforcement` | §2 | enforcement table → two inserts → constraint DDL + dup check |
| tables | `table-lifecycle` | §3 | kinds table → Time Travel / Fail-safe / purged → DDL |
| tables | `transaction-boundary` | §4 | reload script → intended vs executed commits |
| tables | `merge-dedup` | §5 | source + target tables → MERGE with QUALIFY → result |
| tables | `time-travel` | §6 | incident timeline → read, clone, swap, UNDROP |
| tables | `clone-storage` | §7 | two tables → source-only / shared / clone-only partitions → DDL |
| tables | `table-types` | §8 | type matrix → selection questions → retail fit |

## Valid `icon:` keys

The engine does not guard icon names. These are the keys in `@graphlearning/flow`'s lucide registry
(read off the bundle); anything else renders a card with no glyph:

`monitor terminal code filecode cloud building braces cpu layers globe database network wrench
receipt tag gauge bell key shieldcheck usercheck scanface scroll gitbranch ban circlecheck
circleslash router dooropen server boxes clock repeat lock scale workflow box gears memory zap brain
waves share funnel copy table harddrive folder file users power plug scissors link skull search
pencil sigma hash sortarrows regex bug barchart chartpie star snowflake calendar ruler history merge
warehouse package swap trash tree fingerprint`

## Known engine issue

`@graphlearning/flow`'s data-mode `kind: 'table'` renderer maps rows without React keys, so any
section with a data table logs a "unique key prop" warning in dev. Harmless on screen; fix belongs in
`ui-flow`, not here.

## Invariants — do not break

- **Never write `x` or `y`.** Scenes are declarative: nodes, edges, nesting. `computeLayout` is not
  exported, so there is no way around this, and that is the point — reproducible frames.
- **Do not reimplement the shell.** `SectionView`, `CourseIndex`, `SlidePanel` and the hooks are
  withheld on purpose. The route contract (`#/<courseId>-<sectionId>`, `?capture=1`,
  `window.__scene.plan()`) is what every recorder drives, and it holds only if every repo composes
  the pieces identically.
- **`SiteHeader` goes on the catalog page only** — never on a section. A section is a video frame.
- **Three stylesheets, in cascade order**, imported in `main.tsx`. The order is load-bearing:
  1. `@graphlearning/flow/styles.css` — react-flow plus the IBM Plex faces the engine is
     *calibrated* to. `codeMetrics` sizes code nodes from a measured 9.02px glyph advance, so a
     different monospace face mis-sizes every code card. Carries the `.tok-*` colours.
  2. `@graphlearning/shell/styles.css` — the shell paints the canvas (`--bg: #1a1d23`; SceneView
     draws its dots at `#2a2f38` assuming a dark surface).
  3. `./theme.css` — this repo's three brand tokens. **Last, or the brand loses to the defaults.**
- **`file:../ui-flow` / `file:../ui-shell` must never be committed.** Local engine work only; CI has
  no sibling checkout.
- **Narration is never hand-produced.** `.tts` → `.wav` via Colab + Chatterbox only.

## Layout rules the frames actually care about

`npm run check` (`scripts/check-content.mjs`) models four silent failures — each builds green and
breaks only on screen. Its comments carry the measured constants; the short version:

- **Leaf cards are a fixed 210×96** with a ~134px text column. Only containers grow to fit. Keep the
  `label` to 2 wrapped lines; 2 label lines + 2 sub lines fits. Watch unbreakable tokens — `_`, `.`
  and `/` are **not** break opportunities in CSS, so `snake_case` and paths overflow sideways in a
  way the height model cannot see.
- **Slides do not scale to fit.** Type size is fixed by the frame (`zoom = paneWidth / 806`,
  width-proportional only), so an over-long slide **clips at the bottom** with no error.
  `check` fails over 1000 modelled design px; the band below gives the floor too. Bullets cost far
  more than prose of the same length.
- **A `focus:` that names no node in its scene is a silent no-op** — nothing lights up.
- **`icon:` names are NOT guarded.** The engine's lucide registry is `Record<string, LucideIcon>`
  and does not enumerate its keys, so a wrong name type-checks, passes `check`, builds, and renders
  a card with no glyph. There are ~75 valid keys; copy one off an existing scene rather than
  guessing a lucide name (`volume`, `move`, `maximize` and `git` are all absent, for instance).
- **A section with no wav narrates silence** and records a silent segment. Audio resolves purely by
  convention: `public/audio/<course>/<section-id>.wav`.

What `check` does *not* model: an edge label landing on top of a card, or whether the frame is too
empty. Look at the route.

### Density targets — the frame must use the space it has

The guarded failure is a slide that overflows. The unguarded one is its opposite: a frame that
builds green, reads correctly, and leaves half its pane empty. Against the ~1080 design px pane:

| | target | why |
| --- | --- | --- |
| slide height | **80–95 %** of the pane (≈ 865–1025px; `SLIDE_H_MAX` caps the top at 1000) | below 80 % the right half looks empty; above ~95 % it risks clipping |
| scene, binding axis | ≥ 0.85 of the pane | the board should reach the edge it is limited by |
| scene, area | ≥ 0.55 of the pane (w × h) | a wide board that fills the width but a third of the height wastes the pane |
| eyebrow | no node under the top-left eyebrow label | boards that bind on height run up to y≈30 |

Engine note: a container with `flow: 'LR'` **and** `cols` can stack its children vertically —
drop the `flow` and let `cols` lay out the row.

Levers: **add real content, not padding**; **restack** a board toward the pane's ~1:1 aspect; lower
scene `padding` to 0.04 for boards that float, **raise** it (0.12–0.17) for tall boards that touch
the eyebrow.

`npm run density` (`scripts/measure-density.mjs`, needs `npm run dev` running) measures these off the
rendered route — slide height ratio, scene width/height/area ratio, eyebrow overlap — and flags any
frame under target. `check` models no density at all, and its slide-height model deliberately
*overestimates* (a slide modelling 890px rendered at 0.75 of the pane), so a slide can pass `check`
and still sit under the 80 % floor; only the rendered measurement shows it. The two ratios come
from one repo's ~80 frames of diagram-and-code-card boards, so a deliberately sparse board can sit
under them. Targets, not thresholds.

## Guards before handing over

```sh
npm run build && npx tsc --noEmit && npm run check
npm run density   # with `npm run dev` running; PUPPETEER_EXECUTABLE_PATH=/opt/pw-browsers/chromium in cloud sessions
```

All four are a **floor, not proof** — they pass on frames that are visually wrong. The rendered
route is the real bar, and the owner reviews it.

## Working agreement

- **Author the whole unit, then hand over the route.** Scenes, slides and narration together.
- **No ASCII sketches of scenes.** A sketch cannot show what the layout engine will do, which is the
  only thing worth looking at.
- **No silent scaffolding**, no work outside the ask. Say plainly what was built, what was verified,
  and what was left out.
