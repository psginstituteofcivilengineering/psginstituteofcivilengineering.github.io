# PSG-ICE Website — Deploy Plan (written, NOT executed)

Do not run any of this until the Governor approves it.

**Settled decisions (Governor, this run):**
- Live address: `https://psginstituteofcivilengineering.github.io/` — a GitHub
  user site on a **personal account** (`psginstituteofcivilengineering`,
  purpose-created as the council's dedicated account). No organization.
- Repo name: `psginstituteofcivilengineering.github.io` (public), site served
  from the repository root.
- **Transfer path: Option B only** — a zip (`psg-ice-site.zip`) built on disk
  in the workspace, hash-verified on the download machine, then uploaded
  through github.com. Direct git push from the sandbox (Option A) is removed.
- Transfer hygiene finding, recorded during QA: two copies of an exported
  file downloaded through the workspace preview arrived modified — each was
  byte-identical to the disk file **except for one injected 361-byte
  Cloudflare analytics tag**. The disk files are clean; the alteration lives
  in the preview download channel. That is why the zip hash check (A.5) and
  the pre-push checks (A.3) are mandatory: only disk-verified bytes ship.

## A. Publish on GitHub Pages

1. Create the account `psginstituteofcivilengineering` (the council's
   dedicated personal account — credentials belong to the council, not to any
   officer's personal account). **Turn on two-factor authentication**, save
   the recovery codes with a **second officer** (not only the account
   creator), and invite the other officers via
   **Settings → Collaborators** on the repository.
2. Create the repository **`psginstituteofcivilengineering.github.io`**
   (public) — exact spelling.
3. **PRE-PUSH verification (required — run in the workspace before the zip
   is offered for download; all three must PASS):**
   ```bash
   cd PSG-ICE
   # 1) tracker string check — *.html, *.js, *.css only, excluding docs/ and .git
   find . -type f \( -name '*.html' -o -name '*.js' -o -name '*.css' \) \
     -not -path './docs/*' -not -path './.git/*' -print0 \
     | xargs -0 grep -ilE 'cloudflare|cf-beacon|beacon' \
     && echo "FAIL: tracker string found" || echo "PASS: no tracker strings"
   # 2) every external URL in those files, sorted (expected: the site's own
   #    github.io address (9 URLs), tally.so (2), facebook.com (1);
   #    w3.org namespaces would also be normal if ever present)
   find . -type f \( -name '*.html' -o -name '*.js' -o -name '*.css' \) \
     -not -path './docs/*' -not -path './.git/*' -print0 \
     | xargs -0 grep -hoE 'https?://[^"'"'"' <>)]+' | sort -u
   # 3) placeholder FAIL check
   grep -rnE '<ACCOUNT>|<REPO>' . --exclude-dir=.git --exclude-dir=docs \
     && echo "FAIL: placeholders remain" || echo "PASS: no placeholders"
   ```
4. Confirm the zip list (below) matches the real folder: 60 files
   (`index.html` and the other 6 pages at the zip root, `assets/`, `docs/`).
5. **After downloading the zip, verify the hash on your own machine BEFORE
   uploading anything:**
   - Windows PowerShell:  `Get-FileHash .\psg-ice-site.zip -Algorithm SHA256`
   - macOS / Linux:       `shasum -a 256 psg-ice-site.zip`
   Compare against the hash in the launch report. **If it differs, stop —
   the download channel altered it.** Then unzip.
6. In the repository on github.com: "uploading an existing file" — drag in
   the **unzipped contents** so the repo root holds `index.html`, the other
   six pages, `assets/`, and `docs/`. **Never** upload `drafts/`, `tools/`,
   QA screenshots, offline bundles, or deployment reports.
7. Repository → Settings → Pages. Source: **Deploy from a branch** —
   branch `main`, folder `/ (root)`. Save.
8. Wait ~2 minutes. Open `https://psginstituteofcivilengineering.github.io/`
   and confirm the home page loads with the logo and nav.

## B. Two-phase launch

The base URL lives in TWO places: `site-config.js` and the static share tags
(`og:url`, `og:image`, `twitter:image`) stamped in every page's `<head>` —
they already match the live address (`stamp-share-tags.py --check` passed).

**Phase 1 (upload day):**
- The site ships with `baseUrl` set, `noindex: true`, and the static share
  tags in place. Nothing to re-stamp.
- Verify on the LIVE address: view page source (or `curl -s`) on any page —
  `og:image` shows
  `https://psginstituteofcivilengineering.github.io/assets/img/og-share-1200x630.png`.
- Test the live link in **Facebook's Sharing Debugger**
  (developers.facebook.com/tools/debug): the preview card must show the
  PSG-ICE title, description, and the navy share picture.
- Then **stop and get the Governor's approval before Phase 2.**

**Phase 2 (after approval):**
1. In `assets/js/data/site-config.js`: set `noindex: false`. (The canonical
   tag is then injected by `render.js` on every page.)
2. In `assets/js/data/events.js`: set `lastUpdated` (currently
   `'September 24, 2026'`) to the real publish date.
3. Upload both changed files; wait ~2 minutes.
4. **Warning: if `noindex` stays `true`, the site will stay out of Google and
   other search results even though it is live.**
5. Verify: view page source on the live site — every page's static
   `og:url`/`og:image`/`twitter:image` shows the real address and
   `rel="canonical"` now exists.

## C. Post-launch smoke test (by hand, on a phone)

- [ ] Home, About, Officers, Events, News, Contact all open.
- [ ] Logo shows in the header; favicon shows in the browser tab.
- [ ] Facebook link (footer + contact page) opens the council page.
- [ ] Contact page: "Show the contact form" button loads the form;
      "Open the form in new tab" works without pressing the button;
      a test message submits and shows Tally's confirmation.
- [ ] Events page: unconfirmed events show "Details to be announced." and
      no dates; milestones block lists the three entries.
- [ ] Officers page: 22 names, correct positions.
- [ ] Share the home link to Messenger/Facebook once: the preview card shows
      the PSG-ICE title, description, and the navy share picture.
- [ ] Rotate the phone / use a small window: nothing overflows sideways.
- [ ] **No-injected-analytics check (required):** on the LIVE GitHub Pages
      address, open View Source on every page and search for
      "cloudflareinsights", "beacon.min.js", and "data-cf-beacon".
      Expected result: zero matches on all pages. During QA a Cloudflare
      analytics beacon was found in preview-downloaded copies of exported
      files; it was verified absent from all source files on disk, and this
      live-source check is the final confirmation that GitHub Pages serves
      only the disk-verified bytes. Also check DevTools → Network for any
      request to cloudflareinsights.com while reloading each page.

## D. Roll back in one step

Repository → Settings → Pages → Source: **None** (site goes offline at once),
or revert to the previous commit / upload the previous files back to `main`
to restore the last good version. Pages redeploys automatically in ~2 minutes.
