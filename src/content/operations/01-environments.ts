import type { Section } from '../types'

export const environmentsSection: Section = {
  id: 'environments',
  title: 'Environments, configuration and version control',
  scene: 'environments',
  focus: 'targets',
  slide: `## One definition, three environments

Everything this course built — tables, views, policies, tasks — is **code**. It belongs in **version control**, deployed the same way to every environment.

### Declarative definitions
- **DCM Projects** describe objects with \`DEFINE\`: the **desired state**, not the steps
- \`DEFINE\` runs as \`CREATE OR ALTER\`, generally available since **July 2026**
- A \`manifest.yml\` holds each **target's** variables: account, database, warehouse size

### Three environments, one artefact
- **dev** and **test** live in the \`DEV\` account; **prod** in \`PROD\`
- Environments differ by **configuration only**, never by hand-edited SQL
- What reaches prod is the **commit that was tested** — nothing else`,
  narration:
    "Over nine chapters, our retailer has accumulated a lot of objects: tables, views, policies, streams, tasks, dynamic tables and shares. Every one of them is code, and this chapter is about changing that code safely, and recovering when things go wrong anyway. The first step is to keep every definition in version control, in one Git repository. Snowflake's DCM projects let you describe objects declaratively. A define statement states what a table or view should look like, its desired state, and Snowflake works out how to get there, running it as create or alter, which became generally available in July twenty twenty-six. A manifest file lists the targets, and holds the variables that differ between them: which account, which database, which warehouse size. Our retailer has three targets. Development and test both live in the DEV account, in separate databases, and production lives in PROD. The rule that keeps this honest is that environments differ only by configuration. Nobody hand-edits SQL in test or production, because a hand edit is a change nobody tested and nobody can reproduce. And what reaches production is exactly the commit that passed testing: one artefact, promoted, not rebuilt. With that in place, a release becomes a reviewable event instead of a series of console sessions.",
}
