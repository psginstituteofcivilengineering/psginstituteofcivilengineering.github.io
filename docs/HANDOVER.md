# PSG-ICE Website — Handover Guide

For the officer who looks after this website after the pioneer term.
No coding experience needed. Everything you edit lives in plain text files
inside the website folder. Open them with any text editor (Notepad works).

## 1. Changing an event's status

File: `assets/js/data/events.js`

Every event has a `status` with exactly three possible words:

| Status | What the site shows |
|---|---|
| `'announced'` | Title only, plus the line "Details to be announced." No date, no venue. |
| `'confirmed'` | Title + the date and venue you filled in. |
| `'postponed'` | Title + the line "Postponed — new date to be announced." Never a date. |

To confirm an event: change `status: 'announced'` to `status: 'confirmed'`,
fill in `date:` and `venue:` as plain words (example: `'September 19, 2026'`),
and update `lastUpdated` at the top of the file. That is the only edit needed.
The home-page banner reads the same file, so it updates by itself.
Never write a date for an event that is not confirmed yet.

## 2. News, milestones, officers

- News: `assets/js/data/news.js`. Newest item first. Each item has
  `published: true` or `false`.
  **Warning: the `published` flag only hides an item from the rendered page.
  It is NOT a privacy control.** Every shipped file is public: anyone can open
  it. Anything not ready to be public (drafts, advisories without an approved
  date and wording) must live in the `drafts/` folder OUTSIDE the website
  folder, never inside a shipped file. Move it in only when it is approved.
- Milestones: `assets/js/data/milestones.js`. Same `published` gate and same
  warning, newest first. When there are 6 or more published entries, ask the
  site builder to split them into their own page (already planned, no rework).
- Officers: `assets/js/data/officers.js`. Names are shown exactly as typed —
  never reformat them. Cards show name + position only.
- **Adding an officer photo:**
  1. Name the file with the officer's name as on the roster
     (`Elijah De La Cruz.jpg`). The filename is the only reliable link
     between a picture and a person.
  2. Save a **square** copy (192x192 or bigger) as
     `assets/img/officers/elijah-de-la-cruz.webp`, **under 15 KB**.
  3. Set that officer's `photo:` field in `officers.js` to the path. Leave
     it `photo: ''` for anyone without one.
  One file serves both places a photo appears (organizational chart and
  card grid). Officers without a photo show a grey silhouette placeholder,
  so the page stays aligned.
- **All 22 officer photos are in place** (verified: 44 photo elements across the
  chart and the cards, no silhouettes, no broken images). Accessibility, 400 %
  text, 200 % zoom and overflow checks were re-run against the real set and are
  clean.
- **Photos are edited on a white/transparent background.** If you upload a
  cut-out with a transparent background, the import tool flattens it onto white
  so it does not ship with a black square behind it.
- **Source photos stay at 192x192 in the site folder; the big originals are
  only working files.** Deleting the originals later changes nothing on the site.
- **Before publishing any photo**, confirm with the council that the person
  agreed to appear publicly. Photos of people are personal data: once
  published, anyone can copy them. Strip location data first (the council's
  photo tool does this; phone apps offer "remove location" when sharing).
- Photos (events, milestones): save the image in `assets/img/`,
  then set the `photo:` field to its path. **Alt-text rule:** if the photo only
  decorates (the name or caption already says it), keep alt empty; if the photo
  carries information no text states, write one plain sentence describing it.
- Blocks left empty on purpose (story, core values) show nothing until filled —
  that is intentional, not a bug.
- **Core values:** the five **SPUP Core Values** (official university wording —
  render exactly, capitals and straight quotes included) show under that
  heading on About. They are university statements, not ICE's own: **if ICE later
  adopts its own values, replace the block by changing `coreValuesHeading`
  and the five `title`/`text` entries in `about.js`.**

## 3. Never publish

- Dates, venues, or times of events that are not confirmed.
- Personal contact details of any officer (emails, phone numbers, addresses,
  year levels, IDs). The contact page must never carry an email or phone.
- Anything about other organizations or party lists.
- Words like "coming soon", "TBA", or placeholder text.
- Draft announcements of any kind — keep them in `drafts/`, outside the site.

## 4. Why the page hides for a moment (do not remove)

Four pages — `about`, `events`, `officers`, `news` — build their main content
with `render.js`. Without help, the browser paints an empty page first and then
the content lands, which makes everything jump (this measured as a 0.4–0.8
layout-shift score; the site now measures 0).

Each of those four pages therefore carries two small scripts:

- In `<head>`: adds a `wait` class that hides the page, and arms a 2.5-second
  failsafe that reveals it no matter what.
- Just before `</body>`: removes the `wait` class once the content is built and
  the fonts have loaded.

**Keep both scripts when editing those pages.** If the second one is missing,
the page still appears — after 2.5 seconds, half-empty. If the `<head>` one is
missing, the jump comes back. With JavaScript switched off the class is never
added, so the page is fully visible and the `<noscript>` notes still show.

## 5. The one-place settings

| Setting | File | What it does |
|---|---|---|
| `baseUrl` | `assets/js/data/site-config.js` | The website address: `https://psginstituteofcivilengineering.github.io` (settled). If it ever changes, edit it here and re-stamp the share tags (see below). |
| `noindex` | `assets/js/data/site-config.js` | `true` keeps the site out of Google. Set `false` on launch day. **If it stays `true`, the site will stay out of search results even after launch.** Only then does the canonical tag switch on (render.js adds it). |
| Form links (`tallyFormUrl`, `tallyEmbedUrl`) | `assets/js/data/contact.js` | The embedded form and the "open in new tab" link. |
| No-JS form link | `contact.html` (the line inside `<noscript>`) | **If you ever change `tallyFormUrl`, copy the same link here too.** |
| Facebook link | `assets/js/data/contact.js` + the footer of every page | Keep them the same address. |
| Share image (`ogImagePath`) | `assets/js/data/site-config.js` | Path of the 1200x630 preview picture. |

### Share tags are static — the base URL lives in TWO places

Every page carries static share tags in its `<head>` (inside the
`<!-- share:og ... -->` markers): `og:url` (that page's address), `og:image`,
`og:image:width`, `og:image:height`, `og:image:alt`, and `twitter:image`.
They are static because Facebook, Messenger and most link-preview crawlers
do NOT run JavaScript — tags injected by a script would be invisible to them.
So the base URL exists in **both** `site-config.js` **and** these stamped
blocks, and they must always match. The canonical tag is deliberately NOT
stamped; it appears only after `noindex` is set to `false` on launch day.

To change the address (or fix a mismatch):

- **With the project workspace / on any computer with Python:**
  1. Edit `baseUrl` in `assets/js/data/site-config.js`.
  2. Re-stamp:  `python3 tools/stamp-share-tags.py`
  3. Verify:    `python3 tools/stamp-share-tags.py --check`
     (expected: `OK` for all 7 pages — every page's static tags must show
     the same base.)
- **Only the GitHub web editor available:** do the same edit by hand in the
  marked block of each of the 7 pages (keep the exact format, change only the
  address). Same text, 7 files, 2 lines per file that hold the address
  (`og:url` and `og:image`/`twitter:image`).

### Launch-day checklist (do all of these together)

1. Confirm `baseUrl` in `assets/js/data/site-config.js` is the live address
   (`https://psginstituteofcivilengineering.github.io`) and re-stamp the
   share tags if it changed (stamper, or the 7-file hand edit above) — then
   run the check.
2. Set `noindex: false` in the same file.
3. Upload the changed files.
4. Check the site in Google after a few days; check one shared link shows the
   preview picture.

## 6. Deploying, step by step

1. Copy the whole website folder's contents to the GitHub repository
   (the council's account or organization), branch `main`. The `docs/` and
   `drafts/` notes: `docs/` may go with the site; `drafts/` must NEVER be
   uploaded.
2. On GitHub: Settings → Pages → Source: "Deploy from a branch" →
   branch `main`, folder `/ (root)` → Save.
3. Wait 1–2 minutes, open the address GitHub shows you. Check the home page,
   the logo, and the contact form button.
4. Then do the launch-day checklist above.

## 7. Editing files directly on GitHub (no computer setup needed)

Every edit in this guide also works in the browser:

1. In the repository, open the file (e.g. `assets/js/data/events.js`).
2. Click the **pencil icon** (Edit this file).
3. Make the change exactly as described above — never reformat anything else.
4. Scroll down, click the green **Commit changes** button
   ("Commit directly to the `main` branch").
5. Wait **about two minutes** for the site to update, then reload the page
   (on your phone too, not just your computer).

**Warning: anything committed is PUBLIC — immediately, and even after you
"delete" it later (the history keeps it).** Never paste drafts, personal
details, or anything from the `drafts/` folder into a file that lives in the
repository. Publish less, not more.

## 8. Who to ask

- Website content approval (wording, events, news): ______________________
- Technical changes (layout, code, GitHub settings): ______________________
- University communication guidelines: ______________________

When in doubt: publish less, not more. An empty block is always safer
than an unconfirmed claim.
