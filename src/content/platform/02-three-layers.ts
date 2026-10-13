import type { Section } from '../types'

export const threeLayers: Section = {
  id: 'three-layers',
  title: 'Storage, compute and cloud services',
  scene: 'three-layers',
  focus: 'compute',
  slide: `## Three layers, scaled separately

Snowflake splits the platform into **database storage**, **compute** and **cloud services**. Each layer scales on its own.

### What each layer does
- **Storage** keeps table data as compressed, columnar **micro-partitions**, plus the history kept for recovery
- **Compute** is the **virtual warehouses** — clusters that execute queries and DML
- **Cloud services** authenticate, optimise, hold metadata and check privileges

### Where the responsibility line sits
- Snowflake operates the hardware, software, upgrades and storage durability
- **You** own data quality, business definitions, access design and compute choices
- A managed platform runs your SQL faithfully — including SQL that is wrong`,
  narration:
    "Snowflake is built from three layers, and the separation between them explains a lot of its behaviour. At the bottom is database storage. When you load a table, Snowflake reorganises the data into compressed, columnar files called micro-partitions, and it also keeps the historical versions it needs for features like Time Travel. In the middle is compute: virtual warehouses, which are clusters of machines that actually execute your queries. Because compute is separate from storage, two warehouses can read the same tables at the same time without copying anything, and a warehouse can be switched off without touching a single row of data. At the top sits cloud services, which authenticates you, plans each query using metadata about those micro-partitions, and checks whether your role is allowed to do what you asked. Snowflake runs all three for you: there are no servers to patch and no disks to manage. But notice what is still yours. Whether the data that loads is correct, what revenue means, which role may see which column, and how much compute you run and when. A managed platform will faithfully execute any SQL you give it, including SQL that is wrong.",
}
