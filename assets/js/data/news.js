window.PSGICE = window.PSGICE || {};

/* ============================================================
   NEWS DATA — newest first (array order is canonical).
   Rendered on news.html (all) and the home page (first 3).

   Fields: title, date, tag, body, published,
           link (optional URL) + linkLabel (optional visible label).
           When `link` is set, the card renders a real anchor —
           new tab, rel="noopener noreferrer"; when empty, nothing
           renders.
   · `date` — literal display string ('Month D, YYYY'). '' hides
     the date line; fill the real announcement date BEFORE
     flipping an item to published.
   · `published` — false keeps the item in this file but the
     renderer skips it everywhere. NOT a privacy control:
     unpublished copy must live in the drafts/ folder OUTSIDE
     the site, never in this shipped file.
   · Wording rule: factual statements only — nothing beyond what
     the council has confirmed. Exact copy is approved by the
     Governor before publish.
   ============================================================ */
PSGICE.news = [
  {
    title: 'CEnergy — One Spirit. One Community. One Paulinian Mission.',
    date: 'September 19, 2026',
    tag: 'Event',
    body: 'CE Night was held at the Global Center, featuring the Mr. & Ms. ICE 2026\u20132027 pageant and the Vocal Solo and Vocal Duet award tracks.',
    link: 'https://www.facebook.com/spupice',
    linkLabel: 'See the recap on our Facebook page',
    published: true
  }
];
