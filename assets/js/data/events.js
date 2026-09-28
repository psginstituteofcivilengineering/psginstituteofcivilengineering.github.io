window.PSGICE = window.PSGICE || {};

/* ============================================================
   EVENTS DATA — single source of truth for events.html AND the
   home-page banner. Both read this file, so they can never
   disagree.

   STATUS RULES — exactly three states:
     'confirmed' — firm date: fill `date` and `venue`; they show.
     'postponed' — never shows date/venue, even if filled.
                   Site copy: "Postponed — new date to be announced."
     'announced' — title only. Site copy: "Details to be announced."
                   (`blurb` is stored but SUPPRESSED until confirmed.)

   To publish a firm date, an officer makes exactly one edit set:
     status → 'confirmed', fill date + venue, bump lastUpdated.
   No layout code changes. No countdowns exist anywhere on the
   site (rule: none for unconfirmed events).

   Keep `upcoming` in chronological order — array order is
   canonical; the site never parses or sorts dates client-side.
   Dates are literal display strings in 'Month D, YYYY' format.
   Times, if confirmed, go in `date`.
   ============================================================ */
PSGICE.events = {
  lastUpdated: 'September 24, 2026',

  upcoming: [
    { title: 'CE Day — A Day in Monte Carlo', status: 'announced', date: '', venue: '', blurb: '', team: 'gold' },
    { title: 'Sportfest',                     status: 'announced', date: '', venue: '', blurb: '', team: 'gold' },
    { title: 'Christmas Events',              status: 'announced', date: '', venue: '', blurb: '', team: 'gold' },
    { title: "Parents' Night I",              status: 'announced', date: '', venue: '', blurb: '', team: 'gold' },
    { title: 'Mindstrong CE',                 status: 'announced', date: '', venue: '', blurb: '', team: 'gold' }, /* blurb copy held in drafts/ until confirmed */
    { title: '5th Annual Pinning & HardHatting Ceremony', status: 'announced', date: '', venue: '', blurb: '', team: 'gold' },
    { title: "Parents' Night II",             status: 'announced', date: '', venue: '', blurb: '', team: 'gold' }
  ],

  /* archive = past events; always shown with their literal dates. */
  archive: [
    {
      title: 'CEnergy — One Spirit. One Community. One Paulinian Mission.',
      date: 'September 19, 2026',
      venue: 'Global Center',
      time: '3:00–6:00 PM',
      blurb: 'CE Night 2026: the Mr. & Ms. ICE 2026–2027 pageant, with Vocal Solo and Vocal Duet as a separate award track.',
      team: 'gold',
      published: true
    }
  ]
};
