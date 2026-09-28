window.PSGICE = window.PSGICE || {};

/* ============================================================
   SITE CONFIG — the ONE place launch settings live.
   Loaded by every page before render.js; render.js applies it.

   · baseUrl   — absolute site URL WITHOUT a trailing slash.
                 SETTLED (Governor-approved): the live address below is
                 final — psginstituteofcivilengineering.github.io, a user
                 site on a dedicated personal council account, served from
                 the repo root. The base URL lives in TWO places: here AND
                 the stamped static og tags in each page's <head>; re-run
                 tools/stamp-share-tags.py after any future change.
   · noindex   — true injects <meta name="robots"
                 content="noindex"> on every page. Flip to false
                 ON LAUNCH DAY PHASE 2 — the only other change needed.
   · ogImagePath — site-relative path of the 1200x630 social share image.
   ============================================================ */
PSGICE.siteConfig = {
  baseUrl: 'https://psginstituteofcivilengineering.github.io',
  noindex: true,
  ogImagePath: 'assets/img/og-share-1200x630.png'
};
