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
Chapter 4 adds: file format `RAW.CSV_ORDERS` (DD/MM/YYYY dates), files `orders_20261001.csv` (6 orders,
manifest total 410.39) and `orders_resend.csv` (1001–1003 again — the source of RAW's 3 duplicates;
RAW total 632.79), `RAW.ORDERS` lineage columns `SOURCE_FILE`/`SOURCE_ROW`, `RAW.ORDERS_REJECTS`,
pipe `RAW.ORDERS_PIPE`, streaming `EVENTS_PIPE` → `RAW.ORDER_EVENTS`, export stage `SALES.EXPORTS`.
Chapter 5 adds: `ORDERS.STORE_ID` (S-01 Leeds: 1001/1003/1005; S-02 York: 1002/1004/1006),
`SALES.ORDER_LINES` (1001: 59.50+30.00, 1003: 24.90+30.00+20.00, 1005: 48.00), order→customer
(1001/1003 C-207, 1002/1006 C-311, 1004 C-150, 1005 C-388), events 1007 (C-412, 2 items) and 1008
(C-150, no items), `DAILY_REVENUE` = S-01 212.40 / S-02 58.00 on 1 Oct, S-02 120.00 on 2 Oct,
mart `RETAIL.MART` with type-2 `DIM_CUSTOMER`, UDF `SALES.NET_AMOUNT`, procedure `SALES.RELOAD_DAY`.
Chapter 6 adds: CDC log `RAW.CUSTOMER_CHANGES` (SOURCE_SEQ, OP, CUSTOMER_ID, CITY, CHANGED_AT,
LOADED_AT) with 2 Oct events 101 U C-207 Leeds 09:00 · 102 I C-388 Bath 10:15 · 103 U C-207 York 11:30 ·
104 D C-311 12:00 (101 arrives late, after 103); append-only stream `RAW.CUSTOMER_CHANGES_S` (+ audit
stream); `SALES.CUSTOMERS` carries `SOURCE_SEQ` (before: C-150 Derby 37, C-207 Hull 64, C-311 Ripon 88).
Chapter 7 adds: schema `RETAIL.OPS` with tasks `LOAD_ORDERS` (root, CRON 05:30 Europe/London, LOAD_WH),
`CLEAN_ORDERS`, `BUILD_LINES` ∥ `BUILD_CUSTOMER`, finalizer `FINALIZE_RUN`; triggered serverless
`APPLY_CUSTOMERS`; 3 Oct run where BUILD_LINES failed; dynamic tables `MART.ORDERS_CLEAN` (DOWNSTREAM)
→ `MART.REVENUE_DT` (15 min; 09:24 refresh missed at 22 min); DMFs + alert `OPS.ORDERS_STALE`;
dbt project `OPS.RETAIL_DBT`; the 4 Oct double-scheduled build.
Chapter 8 adds (illustrative, labelled as such on screen): `SALES.ORDERS_HISTORY` — 3 years, ~1.2 B rows,
18,240 micro-partitions; the October store-revenue query 14.2 s full scan (TO_CHAR predicate) → 1.1 s
pruned (312 partitions); clustering on ORDER_DATE ≈ 6 credits/day vs 1.5 credits/day saved at 200 runs;
October ledger (BI_WH 310, LOAD_WH 75, clustering 180 …); resource monitor `BI_MONTHLY` (400 credits);
tag `OPS.COST_CENTER`.

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
| loading | `stage-types` | §1 | internal / external stage rows → file format → LIST result |
| loading | `copy-mapping` | §2 | CSV lines → mapped COPY → typed rows with lineage |
| loading | `rejected-rows` | §3 | dry run → errors → ON_ERROR choices → quarantine |
| loading | `file-identity` | §4 | three COPY runs → COPY_HISTORY → boundaries → key check |
| loading | `snowpipe-flow` | §5 | auto-ingest path → COPY vs Snowpipe → pipe DDL → evidence |
| loading | `streaming-channels` | §6 | vertical path beside offsets, architectures, path choice |
| loading | `schema-change` | §7 | evolution DDL → three source changes → responses |
| loading | `reconcile-unload` | §8 | reconciliation → unload → handoff |
| transform | `grain-amplification` | §1 | two grain tables → amplified vs right-grain query |
| transform | `window-latest` | §2 | window SQL → ranked rows → one per customer |
| transform | `variant-flatten` | §3 | JSON payloads → FLATTEN SQL → flattened rows |
| transform | `time-numbers` | §4 | tz SQL → two-dates table → type traps → exact.sql |
| transform | `serving-views` | §5 | view DDL → DAILY_REVENUE → interface comparison |
| transform | `dimensional-model` | §6 | star schema → type-2 rows → as-was vs as-is |
| transform | `snowpark-actions` | §7 | Python → per-call movement table → client vs warehouse |
| transform | `procedures-udfs` | §8 | UDF + procedure DDL → comparison → rights |
| incremental | `cdc-vs-stream` | §1 | vertical CDC path beside events + CDC-vs-stream table |
| incremental | `offset-timeline` | §2 | vertical version timeline beside stream DDL + staleness |
| incremental | `consume-offsets` | §3 | three attempts → consume.sql → one stream per consumer |
| incremental | `stream-output` | §4 | standard stream rows → reading it → mode choice |
| incremental | `incremental-merge` | §5 | guarded MERGE → before / after tables |
| incremental | `late-arrivals` | §6 | arrival table → rule table → tombstone + business time |
| incremental | `recovery-decisions` | §7 | situation table → rebuild.sql → principles |
| pipelines | `task-anatomy` | §1 | two task kinds → tasks.sql → prerequisites table |
| pipelines | `task-graph` | §2 | graph beside run identity → graph.sql |
| pipelines | `partial-failure` | §3 | run table → recover.sql → safety principles |
| pipelines | `dynamic-lag` | §4 | vertical DT chain beside DDL, refresh history, lag rules |
| pipelines | `refresh-modes` | §5 | mode table → FULL blockers → lifecycle table |
| pipelines | `choose-automation` | §6 | comparison → customers as a DT → retail choices |
| pipelines | `pipeline-evidence` | §7 | DMF + alert SQL → results → three evidence kinds |
| pipelines | `external-orchestration` | §8 | vertical Airflow path beside double-run, dbt SQL, ownership |
| performance | `profile-reading` | §1 | vertical operator tree beside timing, statistics, history SQL |
| performance | `pruning-scan` | §2 | partition metadata → wrapped vs range query → pruning rules |
| performance | `cache-measurement` | §3 | three runs → result vs warehouse cache → fair_test.sql |
| performance | `scale-up-out` | §4 | two symptoms beside credits table, multi-cluster DDL, isolation |
| performance | `spill-skew-joins` | §5 | profile-signature table → before / after rewrite |
| performance | `physical-options` | §6 | three-option comparison → estimate + enable SQL → checklist |
| performance | `cost-sources` | §7 | credit ledger → storage table → transfer |
| performance | `cost-controls` | §8 | monitor vs budget coverage → controls.sql → gaps |
| performance | `optimise-evidence` | §9 | vertical loop beside before/after table + decision |

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

Engine note — rows of children: a container **without** internal `edges` lays out a row from
`cols` alone (adding `flow: 'LR'` there can stack it vertically). A container **with** internal
`edges` stacks top-to-bottom unless it sets `flow: 'LR'`. Check every container row on the route.

A wide code card or table sets a column's width and therefore the whole board's scale: shorten
long comment lines and cell text before restacking.

Levers: **add real content, not padding**; **restack** a board toward the pane's ~1:1 aspect; lower
scene `padding` to 0.04 for boards that float, **raise** it (0.12–0.17) for tall boards that touch
the eyebrow.

`npm run density` (`scripts/measure-density.mjs`, needs `npm run dev` running) measures these off the
rendered route — slide height ratio, scene width/height/area ratio, eyebrow overlap — and flags any
frame under target. `check` models no density at all, and its slide-height model deliberately
*overestimates* (a slide modelling 890px rendered at 0.75 of the pane), so a slide can pass `check`
and still sit under the 80 % floor; only the rendered measurement shows it. When a slide renders short but
`check` is near 1000, lengthen the bullets the model already counts as two lines but that render on
one (roughly 50–60 characters, often bold- or chip-heavy): the render grows, the model doesn't. The two ratios come
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
