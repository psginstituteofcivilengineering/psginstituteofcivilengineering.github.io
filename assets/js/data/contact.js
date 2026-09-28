window.PSGICE = window.PSGICE || {};

/* ============================================================
   CONTACT DATA (contact.html, ICE-W06).
   · tallyFormUrl  — PUBLIC /r/ link: used for the visible
     "Open the form in a new tab" fallback (and the noscript copy).
   · tallyEmbedUrl — IFRAME SOURCE ONLY (/embed/ pattern). The
     iframe must never use the /r/ link.
   If either is empty, the form area renders NOTHING (no error
   text, no placeholder); the Facebook link and scope line remain.
   No email addresses, phone numbers, or office hours — ever.
   ============================================================ */
PSGICE.contact = {
  tallyFormUrl: 'https://tally.so/r/ODv0L7',
  tallyEmbedUrl: 'https://tally.so/embed/ODv0L7?alignLeft=1&hideTitle=1&transparentBackground=1',
  facebook: 'https://www.facebook.com/spupice'
};
