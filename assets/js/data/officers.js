window.PSGICE = window.PSGICE || {};

/* ============================================================
   OFFICERS DATA — full roster, rendered EXACTLY as written here
   (names are never reformatted, shortened, or inferred).
   Feeds: officers.html (org chart + cards) and the about.html
   "guided by" faculty credit.

   PRIVACY: cards render name + position ONLY, with an initials
   placeholder (or `photo` when supplied). No year level, age,
   contact details, or IDs — ever.

   `photo` is optional: save to assets/img/officers/ and set the
   relative path; until then the initials placeholder renders.
   Empty `name` renders as "To be announced".

   Tiers (render order): faculty → executive → councilors →
   multimedia → mayors.
   ============================================================ */
PSGICE.officers = [
  /* --- Faculty tier --- */
  { slot: 'adviser',             tier: 'faculty',      position: 'Council Adviser',          name: 'Engr. Valen Wendel A. Golino',     photo: 'assets/img/officers/valen-wendel-a-golino.webp' },
  { slot: 'program-coordinator', tier: 'faculty',      position: 'Program Coordinator',      name: 'Engr. Cirilo Mar Pat Gazzingan III', photo: 'assets/img/officers/cirilo-mar-pat-gazzingan-iii.webp' },

  /* --- Executive tier (18 student officers start here) --- */
  { slot: 'ice-rep',             tier: 'executive',    position: 'ICE Representative',       name: 'Angela Gailie Alilam',  photo: 'assets/img/officers/angela-gailie-alilam.webp' },
  { slot: 'governor',            tier: 'executive',    position: 'Governor',                 name: 'Elijah De La Cruz',     photo: 'assets/img/officers/elijah-de-la-cruz.webp' },
  { slot: 'vice-governor',       tier: 'executive',    position: 'Vice Governor',            name: 'Mark Kenneth Paris',    photo: 'assets/img/officers/mark-kenneth-paris.webp' },
  { slot: 'secretary',           tier: 'executive',    position: 'Secretary',                name: 'Monique Musa',          photo: 'assets/img/officers/monique-musa.webp' },
  { slot: 'assistant-secretary', tier: 'executive',    position: 'Assistant Secretary',      name: 'Reign Albano',          photo: 'assets/img/officers/reign-albano.webp' },
  { slot: 'treasurer',           tier: 'executive',    position: 'Treasurer',                name: 'Lea Catembung',         photo: 'assets/img/officers/lea-catembung.webp' },
  { slot: 'assistant-treasurer', tier: 'executive',    position: 'Assistant Treasurer',      name: 'Shareen Ramos',         photo: 'assets/img/officers/shareen-ramos.webp' },
  { slot: 'pro',                 tier: 'executive',    position: 'Public Relations Officer', name: 'Shane Buraga',          photo: 'assets/img/officers/shane-buraga.webp' },

  /* --- Councilors --- */
  { slot: 'councilor-1',         tier: 'councilors',   position: 'Councilor',                name: 'Jhesharie Tayawa',      photo: 'assets/img/officers/jhesharie-tayawa.webp' },
  { slot: 'councilor-2',         tier: 'councilors',   position: 'Councilor',                name: 'Argie Baua',            photo: 'assets/img/officers/argie-baua.webp' },
  { slot: 'councilor-3',         tier: 'councilors',   position: 'Councilor',                name: 'Charmagne Ulsano',      photo: 'assets/img/officers/charmagne-ulsano.webp' },
  { slot: 'councilor-4',         tier: 'councilors',   position: 'Councilor',                name: 'Jeremiah Casanova',     photo: 'assets/img/officers/jeremiah-casanova.webp' },
  { slot: 'councilor-5',         tier: 'councilors',   position: 'Councilor',                name: 'Krystin Simon',         photo: 'assets/img/officers/krystin-simon.webp' },
  { slot: 'councilor-6',         tier: 'councilors',   position: 'Councilor',                name: 'Edcel John Ancheta',    photo: 'assets/img/officers/edcel-john-ancheta.webp' },
  { slot: 'councilor-7',         tier: 'councilors',   position: 'Councilor',                name: 'Ryan Catubag',          photo: 'assets/img/officers/ryan-catubag.webp' },
  { slot: 'councilor-8',         tier: 'councilors',   position: 'Councilor',                name: 'Christian Libao',       photo: 'assets/img/officers/christian-libao.webp' },

  /* --- Multimedia --- */
  { slot: 'multimedia-1',        tier: 'multimedia',   position: 'Multimedia Coordinator',   name: 'Jessica Dela Cruz',     photo: 'assets/img/officers/jessica-dela-cruz.webp' },
  { slot: 'multimedia-2',        tier: 'multimedia',   position: 'Multimedia Coordinator',   name: 'Micah Mariano',         photo: 'assets/img/officers/micah-mariano.webp' },

  /* --- Year Representatives --- */
  { slot: 'mayor-3rd-year',      tier: 'mayors',       position: '3rd Year Mayor',           name: 'Danna Paula Callangan', photo: 'assets/img/officers/danna-paula-callangan.webp' },
  { slot: 'mayor-2nd-year',      tier: 'mayors',       position: '2nd Year Mayor',           name: 'Christopher Yiu',       photo: 'assets/img/officers/christopher-yiu.webp' }
];
