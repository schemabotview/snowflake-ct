# snowflake-ct

**Snowflake — From Platform Foundations to Reliable Analytical Data Products**, as a GraphL concept
app: 11 courses (one per chapter), 83 sections, each section a `(scene, slide, narration)` triple.
Deploys to `graphl.in/snowflake-ct/`.

The syllabus, audience, scope and sources are in [`docs/SNOWFLAKE-COURSE-PLAN.md`](docs/SNOWFLAKE-COURSE-PLAN.md).
Every course follows one retail example — orders, customer updates and reference data becoming a
governed analytical data product.

## Running it

```sh
npm install
npm run dev          # http://localhost:5173
```

Routes are `#/<course>-<section>`, e.g. `#/platform-first-query`. `#/` is the catalog.

## Status

| # | Course id | Chapter | Sections | Authored |
| --- | --- | --- | --- | --- |
| 1 | `platform` | Platform Foundations and a First Query | 6 | ✓ |
| 2 | `access` | Objects, Identities, and Access | 8 | ✓ |
| 3 | `tables` | Tables and Reliable Data Changes | 8 | ✓ |
| 4 | `loading` | Loading, Unloading, and Reconciliation | 8 | ✓ |
| 5 | `transform` | Querying, Transformation, and Analytical Serving | 8 | ✓ |
| 6 | `incremental` | Ongoing Changes and Incremental Correctness | 7 | |
| 7 | `pipelines` | Pipeline Orchestration and Dynamic Tables | 8 | |
| 8 | `performance` | Performance and Cost Reasoning | 9 | |
| 9 | `governance` | Governance, Sharing, and Consumption | 7 | |
| 10 | `operations` | Delivery, Operations, and Recovery | 9 | |
| 11 | `architecture` | Integrated Architecture and Evolution | 5 | |

Narration wavs are not generated yet (Colab + Chatterbox pass).

## Verifying a change

```sh
npm run build && npx tsc --noEmit && npm run check
```

…and the section looked at in the browser. The commands pass on frames that are visually wrong.

## Layout

```
docs/           the course plan
src/content/    one folder per course, one file per section + registry
src/scenes/     one folder per course, one file per scene + registry
src/main.tsx    mounts <ConceptApp> from @graphlearning/shell
src/theme.css   --brand / --brand-hover / --accent-2
scripts/        check-content.mjs · init-template.mjs · colab notebook · concept.json · titles.json
public/audio/<course>/    narration wavs
```

Scaffolded from [`content-repo-template`](https://github.com/schemabotview/content-repo-template).
The render engine (`@graphlearning/flow`) and shell (`@graphlearning/shell`) are pinned published
packages — never a `file:` path.
