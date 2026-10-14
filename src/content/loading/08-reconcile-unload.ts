import type { Section } from '../types'

export const reconcileUnload: Section = {
  id: 'reconcile-unload',
  title: 'Reconciliation, unloading and handoff',
  scene: 'reconcile-unload',
  focus: 'recon',
  slide: `## Prove it arrived, then hand it on

A successful load proves **transport**, not **correctness**. Reconciliation compares **counts and totals** at every hop against what the source says it sent.

### Reading the reconciliation
- The source manifest promises **6** orders worth **410.39**
- \`RAW\` holds 9 rows: the extra 3 are the known **resend** — explained, not ignored
- \`SALES\` matches the manifest exactly

### Unloading for a consumer
- \`COPY INTO @stage\` writes query results as files — Parquet here
- Files target **16 MB** each by default; expect several
- It **does not warn** on a non-empty path: write to a fresh, dated one

### A clean handoff
- Files, plus a **manifest** of rows and totals, plus the **contract**`,
  narration:
    "A load that succeeds proves only that bytes moved. It does not prove the right data arrived. Reconciliation is how you prove that, and it belongs inside ingestion, not after it. Our source sends a small manifest with each delivery: six orders, worth four hundred and ten pounds thirty-nine in total. We compare that against every hop. Raw orders holds nine rows but only six distinct orders, and its total is higher. That is not a mystery, because we know exactly why: the three resent orders. A difference you can explain is fine; a difference you cannot explain is an incident. The cleaned sales table holds six orders worth four hundred and ten thirty-nine, which matches the manifest exactly. Only then do we hand data on. Unloading uses the same copy command in the other direction: copy into a stage, from a query, writing Parquet files. Snowflake aims for files of about sixteen megabytes each by default, so expect several files unless you ask for a single one. It also does not warn you if the target path already contains files, so always write to a fresh, dated path. And a clean handoff is more than files. Send a manifest of row counts and totals, so the consumer can reconcile in turn, and the contract that says what each column means. That completes the loading chapter: next, we transform these rows into analytical products.",
}
