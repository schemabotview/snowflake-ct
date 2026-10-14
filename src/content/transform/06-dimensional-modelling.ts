import type { Section } from '../types'

export const dimensionalModelling: Section = {
  id: 'dimensional-modelling',
  title: 'Facts, dimensions and historical definitions',
  scene: 'dimensional-model',
  focus: 'scd-rows',
  slide: `## Facts at one grain, dimensions with history

A **fact table** records events at one declared grain — here, one row per **order line**. **Dimensions** describe the who, what, where and when.

### Keeping history
- Chapter 3's MERGE **overwrote** C-207's city: Hull became York, history gone
- A **type 2** dimension adds a new row per change, with \`VALID_FROM\` and \`VALID_TO\`
- Facts join to the row that was **valid at the time** of the event

### Two honest answers
- Revenue by city **as it was**: C-207's October orders count in **Hull**
- Revenue by city **as it is**: the same orders count in **York**
- Neither is wrong — the question must say **which** it means`,
  narration:
    "So far we have transformed tables one query at a time. A dimensional model organises them for analysis. At the centre is a fact table, which records business events at one declared grain. Ours is one row per order line, with measures such as quantity and amount. Around it sit dimensions: date, product, store and customer, which describe the who, what, where and when of each fact. The interesting part is history. In chapter three, our merge overwrote customer C two oh seven's city: Hull became York, and Hull was gone. That is fine for a mailing list, but it changes the past. If finance asks for October revenue by city, should C two oh seven's orders from the first of October count in Hull, where the customer lived when they ordered, or York, where they live now? A type two dimension keeps both. Each change adds a new row with the dates it was valid from and to, and a flag for the current one. Facts join to whichever row was valid when the event happened. Now there are two honest answers: revenue by city as it was, which puts the orders in Hull, and as it is, which puts them in York. Neither is wrong, but the question must say which it means. The same goes for the definition of revenue itself: write it down, version it, and date its changes.",
}
