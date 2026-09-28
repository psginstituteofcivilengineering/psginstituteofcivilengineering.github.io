window.PSGICE = window.PSGICE || {};

/* ============================================================
   ABOUT DATA — institute text ONLY (about.html, ICE-W02).
   Faculty names are NOT here — the page reads them from
   officers.js for the "guided by" credit.

   HIDDEN-UNTIL-SUPPLIED RULE: any field left empty ('' or [])
   renders NOTHING on the page — no heading, no placeholder,
   no "coming soon".

   SPUP statements below are OFFICIAL WORDING supplied by the
   Governor — render EXACTLY; do not edit, paraphrase, or
   punctuate. Headings on the page are "SPUP Vision",
   "SPUP Mission", "SPUP Quality Policy" — these are university
   statements, not ICE's own.

   Schema:
     pioneerStory: [ 'paragraph', ... ]            (empty = hidden)
     vision:       'statement'                     (SPUP official)
     missionIntro: 'intro sentence before the <ol>'
     mission:      [ 'item', ... ]   (ordered list, no terminal marks)
     qualityPolicy:'statement'                     (SPUP official)
     coreValuesHeading: 'heading'                  (SPUP official)
     coreValues:   [ { title, text }, ... ]        (empty = hidden)
                   SPUP Core Values — OFFICIAL WORDING supplied by the
                   Governor (poster text; line breaks joined into single
                   paragraphs); capitals and straight quotes kept EXACTLY.
   ============================================================ */
PSGICE.about = {
  pioneerStory: [],
  vision: 'St. Paul University Philippines is an internationally recognized institution dedicated to the formation of competent leaders and responsible citizens of their communities, country, and the world.',
  missionIntro: 'Animated by the Gospel and guided by the teachings of the Church, it helps to uplift the quality of life and to effect social transformation through:',
  mission: [
    'Quality, Catholic, Paulinian formation, academic excellence, research, and community services',
    'Optimum access to Paulinian education and service in an atmosphere of compassionate caring',
    'Responsive and innovative management processes'
  ],
  qualityPolicy: 'St. Paul University Philippines commits to provide Quality Catholic, Paulinian Global Education in a Caring Environment through adherence to statutory and regulatory laws and legislations, customer requirements, and continual improvement, in accordance with the framework of ISO 9001:2015.',
  coreValuesHeading: 'SPUP Core Values',
  coreValues: [
    { title: 'CHRIST', text: 'Christ is the CENTER of Paulinian life. The Paulinian follows and imitates Christ, doing everything in reference to Him.' },
    { title: 'COMMISSION', text: 'By baptism, the Paulinian is commissioned to share the Good News of Christ.' },
    { title: 'COMMUNITY', text: 'The Paulinian is a RESPONSIBLE FAMILY MEMBER and CITIZEN, concerned with building communities, promotion of peoples, justice and peace, and the protection of the environment.' },
    { title: 'CHARISM', text: 'The Paulinian develops his GIFTS/TALENTS to be put in the service of the community, he strives to grow and improve daily, always seeking the better and finer things and the Final good.' },
    { title: 'CHARITY', text: 'Urged on by the LOVE OF CHRIST, the Paulinian is warm, loving, hospitable and "all to all" especially to the underprivileged.' }
  ]
};
