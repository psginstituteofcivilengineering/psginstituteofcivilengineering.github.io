window.PSGICE = window.PSGICE || {};

/* ============================================================
   MILESTONES DATA — rendered into the self-contained #milestones
   block inside events.html (anchor: events.html#milestones).

   Kept in its OWN data file on purpose: when entries reach 6 or
   more (agreed split trigger), this block lifts into a standalone
   accomplishments.html (badge ICE-W07) with zero rework — and the
   sitemap badges get renumbered. Do not merge this into events.js.

   Fields: title, date (literal label — day, month, or term
   string), summary (1–2 factual lines), photo (path or ''),
   published (false = renderer skips it everywhere).
   Newest first. Wording rule: nothing beyond council-confirmed
   facts; exact copy approved by the Governor.
   ============================================================ */
PSGICE.milestones = [
  {
    title: 'CEnergy 2026',
    date: 'September 19, 2026',
    summary: 'CE Night 2026 — the Mr. & Ms. ICE 2026\u20132027 pageant, with Vocal Solo and Vocal Duet as a separate award track, at the Global Center.',
    photo: '',
    published: true
  },
  {
    title: 'CE First General Assembly',
    date: 'August 19, 2026',
    summary: 'The council\u2019s First General Assembly of AY 2026\u20132027.',
    photo: '',
    published: true
  },
  {
    title: 'Pioneer Council Established',
    date: 'AY 2026\u20132027',
    summary: 'The pioneer batch of officers serves the first term of PSG-ICE, the student government of the Institute of Civil Engineering.',
    photo: '',
    published: true
  }
];
