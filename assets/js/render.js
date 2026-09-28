/* ============================================================
   PSG-ICE · render.js — Stage 3
   Renders the data files (window.PSGICE) into marked containers.
   Pure DOM — no dependencies, no localStorage, NO client-side
   Date parsing or math: every date shown is a literal string
   from a data file (Asia/Manila labels set by officers).

   Rules enforced here:
   · Publish gate: items with published === false are skipped
     everywhere (news, milestones, archive).
   · Event statuses: confirmed shows date/venue; postponed and
     announced never do. Blurbs render only when confirmed.
     No countdowns exist anywhere.
   · Hidden-until-supplied: empty about.js fields render nothing.
   · Officer names verbatim; initials (aria-hidden) derived
     separately for the photo placeholder.
   · Monte Carlo styling lives only inside .mc-* event blocks.

   Containers render only when present, so every page includes
   this same file safely.
   ============================================================ */
(function () {
  'use strict';
  var D = window.PSGICE || {};

  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  /* Publish gate — skip only on explicit false (missing = published). */
  function isPublished(item) { return !(item && item.published === false); }

  var STATUS_LABEL = {
    confirmed: 'Confirmed',
    postponed: 'Postponed',
    announced: 'Announced soon'
  };
  var TEAM_DOT = {
    gold: 'var(--mc-gold)',
    lucarian: 'var(--team-lucarian)',
    vesperian: 'var(--team-vesperian)',
    monarch: 'var(--team-monarch)'
  };

  /* Exact site copy per status (never shows a date unless confirmed). */
  function statusLine(ev) {
    if (ev.status === 'postponed') return 'Postponed — new date to be announced.';
    if (ev.status === 'announced') return 'Details to be announced.';
    return '';
  }

  function pill(ev) {
    var dot = TEAM_DOT[ev.team] || TEAM_DOT.gold;
    return '<span class="mc-pill mc-pill--' + esc(ev.status) + '">'
      + '<span class="mc-pill-dot" style="background:' + dot + '" aria-hidden="true"></span>'
      + esc(STATUS_LABEL[ev.status] || '') + '</span>';
  }

  /* ---------- Home banner ---------- */
  function pickBanner(events) {
    var order = ['confirmed', 'postponed', 'announced'];
    for (var i = 0; i < order.length; i++) {
      for (var j = 0; j < events.length; j++) {
        if (events[j].status === order[i]) return events[j];
      }
    }
    return null;
  }

  function bannerCard(ev) {
    var meta = [];
    if (ev.status === 'confirmed') {
      if (ev.date) meta.push(esc(ev.date));
      if (ev.venue) meta.push(esc(ev.venue));
    }
    var line = statusLine(ev);
    return ''
      + '<article class="mc-event-card">'
      +   '<div class="mc-event-top">' + pill(ev)
      +     '<span class="mc-eyebrow">Featured</span>'
      +   '</div>'
      +   '<h2 class="mc-event-title">' + esc(ev.title) + '</h2>'
      +   (meta.length
          ? '<p class="mc-event-meta">' + meta.join('<span class="dot-sep" aria-hidden="true">&middot;</span>') + '</p>'
          : '')
      +   (line ? '<p class="mc-event-status">' + esc(line) + '</p>' : '')
      +   (ev.status === 'confirmed' && ev.blurb
          ? '<p class="mc-event-blurb">' + esc(ev.blurb) + '</p>' : '')
      +   '<p class="mc-event-link"><a href="events.html">All events <span aria-hidden="true">&rarr;</span></a></p>'
      + '</article>';
  }

  function renderBanner() {
    var host = document.getElementById('event-banner');
    if (!host) return;
    var upcoming = (D.events && D.events.upcoming) || [];
    var ev = pickBanner(upcoming.filter(isPublished));
    if (!ev) { host.hidden = true; return; }
    host.innerHTML = bannerCard(ev);
    host.classList.add('is-revealed');
  }

  /* ---------- News ---------- */
  function newsCard(n, h) {
    h = h || 'h3';   /* news.html passes 'h2': cards sit directly under the page h1 there */
    var label = n.tag ? esc(n.tag) : 'Announcement';
    if (n.date) {
      label += ' <span class="dot-sep" aria-hidden="true">&middot;</span> ' + esc(n.date);
    }
    return ''
      + '<article class="card news-card">'
      +   '<p class="mono-label">' + label + '</p>'
      +   '<' + h + '>' + esc(n.title) + '</' + h + '>'
      +   (n.body ? '<p>' + esc(n.body) + '</p>' : '')
      +   (n.link
          ? '<p class="news-link"><a class="link-mono" href="' + esc(n.link)
            + '" target="_blank" rel="noopener noreferrer">'
            + esc(n.linkLabel || n.link)
            + ' <span aria-hidden="true">&#8599;</span></a></p>'
          : '')
      + '</article>';
  }

  function renderNews() {
    var host = document.getElementById('news-latest');
    if (!host) return;
    var items = (D.news || []).filter(isPublished).slice(0, 3);
    host.innerHTML = items.length
      ? items.map(newsCard).join('')
      : '<p class="empty">No announcements yet.</p>';
  }

  function renderNewsAll() {
    var host = document.getElementById('news-all');
    if (!host) return;
    var items = (D.news || []).filter(isPublished);
    host.innerHTML = items.length
      ? items.map(function (n) { return newsCard(n, 'h2'); }).join('')
      : '<p class="empty">No announcements yet.</p>';
  }

  /* ---------- Officers (org chart + cards) ---------- */
  var TIER_ORDER = ['faculty', 'executive', 'councilors', 'multimedia', 'mayors'];
  var TIER_TITLE = {
    faculty: 'Faculty',
    executive: 'Executive Officers',
    councilors: 'Councilors',
    multimedia: 'Multimedia Coordinators',
    mayors: 'Year Representatives'
  };

  function officers() { return D.officers || []; }
  function officer(slot) {
    var list = officers();
    for (var i = 0; i < list.length; i++) {
      if (list[i].slot === slot) return list[i];
    }
    return null;
  }
  function displayName(o) { return (o && o.name) ? o.name : 'To be announced'; }

  var HONORIFIC = { 'engr.': 1, 'dr.': 1, 'mr.': 1, 'ms.': 1, 'mrs.': 1, 'arch.': 1, 'atty.': 1 };
  var SUFFIX_RE = /^(i{1,3}|iv|v|jr\.?|sr\.?)$/i;
  /* Decorative initials ONLY (rendered aria-hidden). The visible name
     text is always verbatim. Honorifics/suffixes are skipped so the
     placeholder reads sensibly (e.g. 'VG' for Engr. ... Golino).
     DORMANT: officers with no photo now show the silhouette placeholder
     instead. Kept in case the council prefers monograms back. */
  function initialsFor(name) {
    var t = String(name || '').trim().split(/\s+/).filter(Boolean);
    while (t.length && HONORIFIC[t[0].toLowerCase()]) t.shift();
    while (t.length && SUFFIX_RE.test(t[t.length - 1])) t.pop();
    if (!t.length) return '\u00B7';
    var first = t[0].charAt(0);
    var last = t.length > 1 ? t[t.length - 1].charAt(0) : (t[0].charAt(1) || '');
    return (first + last).toUpperCase();
  }

  /* Photos: alt="" is deliberate. The officer's name and position are
     always printed as real text immediately beside the image, so a
     descriptive alt would make a screen reader say the same person twice.
     Officers with no photo get the neutral silhouette placeholder
     (aria-hidden: purely decorative). */
  function orgVisual(o) {
    return o.photo
      ? '<img class="org-photo" src="' + esc(o.photo) + '" alt="" width="36" height="36">'
      : '<span class="org-silhouette" aria-hidden="true"></span>';
  }
  function cardVisual(o) {
    return o.photo
      ? '<img class="officer-photo" src="' + esc(o.photo) + '" alt="" width="64" height="64">'
      : '<span class="officer-silhouette" aria-hidden="true"></span>';
  }
  function personLi(o) {
    if (!o) return '';
    return '<li class="org-person"><span class="org-person-row">' + orgVisual(o)
      + '<span class="org-person-text"><span class="org-pos">' + esc(o.position) + '</span>'
      + '<span class="org-name">' + esc(displayName(o)) + '</span></span></span></li>';
  }
  function liWithChildren(o, children) {
    if (!o) return '';
    return '<li class="org-person"><span class="org-person-row">' + orgVisual(o)
      + '<span class="org-person-text"><span class="org-pos">' + esc(o.position) + '</span>'
      + '<span class="org-name">' + esc(displayName(o)) + '</span></span></span>'
      + (children ? '<ul>' + children + '</ul>' : '')
      + '</li>';
  }
  function tierLis(tier) {
    return officers().filter(function (o) { return o.tier === tier; })
      .map(personLi).join('');
  }

  function renderOrgChart() {
    var host = document.getElementById('org-chart');
    if (!host) return;
    var exec = personLi(officer('ice-rep'))
      + liWithChildren(officer('governor'),
        liWithChildren(officer('vice-governor'))
        + liWithChildren(officer('secretary'), personLi(officer('assistant-secretary')))
        + liWithChildren(officer('treasurer'), personLi(officer('assistant-treasurer')))
        + personLi(officer('pro'))
      );
    host.innerHTML = '<ul class="org">'
      + '<li><span class="org-tier-label">' + esc(TIER_TITLE.faculty) + '</span><ul>' + tierLis('faculty') + '</ul></li>'
      + '<li><span class="org-tier-label">' + esc(TIER_TITLE.executive) + '</span><ul>' + exec + '</ul></li>'
      + '<li><span class="org-tier-label">' + esc(TIER_TITLE.councilors) + '</span><ul>' + tierLis('councilors') + '</ul></li>'
      + '<li><span class="org-tier-label">' + esc(TIER_TITLE.multimedia) + '</span><ul>' + tierLis('multimedia') + '</ul></li>'
      + '<li><span class="org-tier-label">' + esc(TIER_TITLE.mayors) + '</span><ul>' + tierLis('mayors') + '</ul></li>'
      + '</ul>';
  }

  function officerCard(o) {
    return '<article class="card officer-card">' + cardVisual(o)
      + '<h4>' + esc(displayName(o)) + '</h4>'
      + '<p class="mono-label">' + esc(o.position) + '</p>'
      + '</article>';
  }

  function renderOfficerCards() {
    var host = document.getElementById('officer-sections');
    if (!host) return;
    host.innerHTML = TIER_ORDER.map(function (tier) {
      var list = officers().filter(function (o) { return o.tier === tier; });
      if (!list.length) return '';
      return '<section class="officer-tier"><h3>' + esc(TIER_TITLE[tier]) + '</h3>'
        + '<div class="card-grid">' + list.map(officerCard).join('') + '</div></section>';
    }).join('');
  }

  /* ---------- About (hidden-until-supplied; SPUP wording verbatim) ---------- */
  function aboutSection(title, inner) {
    return '<section class="section about-block"><h2>' + esc(title) + '</h2>' + inner + '</section>';
  }
  function renderAbout() {
    var gb = document.getElementById('guided-by');
    if (gb) {
      var adv = officer('adviser'), pc = officer('program-coordinator');
      if (adv && adv.name && pc && pc.name) {
        gb.innerHTML = 'Guided by <strong>' + esc(adv.name) + '</strong> (' + esc(adv.position)
          + ') and <strong>' + esc(pc.name) + '</strong> (' + esc(pc.position) + ').';
        gb.hidden = false;
      } else {
        gb.hidden = true;
      }
    }
    var host = document.getElementById('about-blocks');
    if (!host) return;
    var A = D.about || {};
    var html = '';
    if (A.pioneerStory && A.pioneerStory.length) {
      html += aboutSection('The Pioneer Story',
        A.pioneerStory.map(function (p) { return '<p>' + esc(p) + '</p>'; }).join(''));
    }
    if (A.vision) {
      html += aboutSection('SPUP Vision', '<p>' + esc(A.vision) + '</p>');
    }
    if (A.missionIntro || (A.mission && A.mission.length)) {
      html += aboutSection('SPUP Mission',
        (A.missionIntro ? '<p>' + esc(A.missionIntro) + '</p>' : '')
        + ((A.mission && A.mission.length)
          ? '<ol class="mission-list">' + A.mission.map(function (m) { return '<li>' + esc(m) + '</li>'; }).join('') + '</ol>'
          : ''));
    }
    if (A.qualityPolicy) {
      html += aboutSection('SPUP Quality Policy', '<p>' + esc(A.qualityPolicy) + '</p>');
    }
    if (A.coreValues && A.coreValues.length) {
      html += aboutSection(A.coreValuesHeading || 'Core Values',
        '<ul class="values-list">' + A.coreValues.map(function (v) {
          return '<li><strong>' + esc(v.title) + '</strong>' + (v.text ? ' — ' + esc(v.text) : '') + '</li>';
        }).join('') + '</ul>');
    }
    host.innerHTML = html;
  }

  /* ---------- Events page (Stage 3) ---------- */
  function upcomingCard(ev) {
    var meta = [];
    if (ev.status === 'confirmed') {
      if (ev.date) meta.push(esc(ev.date));
      if (ev.venue) meta.push(esc(ev.venue));
    }
    var line = statusLine(ev);
    return ''
      + '<article class="mc-event-card">'
      +   '<div class="mc-event-top">' + pill(ev) + '</div>'
      +   '<h3 class="mc-event-title">' + esc(ev.title) + '</h3>'
      +   (meta.length
          ? '<p class="mc-event-meta">' + meta.join('<span class="dot-sep" aria-hidden="true">&middot;</span>') + '</p>'
          : '')
      +   (line ? '<p class="mc-event-status">' + esc(line) + '</p>' : '')
      +   (ev.status === 'confirmed' && ev.blurb
          ? '<p class="mc-event-blurb">' + esc(ev.blurb) + '</p>' : '')
      + '</article>';
  }

  function archiveCard(ev) {
    var meta = [];
    if (ev.date) meta.push(esc(ev.date));
    if (ev.venue) meta.push(esc(ev.venue));
    if (ev.time) meta.push(esc(ev.time));
    return ''
      + '<article class="mc-event-card mc-event-card--past">'
      +   '<div class="mc-event-top"><span class="mc-eyebrow">Past event</span></div>'
      +   '<h3 class="mc-event-title">' + esc(ev.title) + '</h3>'
      +   (meta.length
          ? '<p class="mc-event-meta">' + meta.join('<span class="dot-sep" aria-hidden="true">&middot;</span>') + '</p>'
          : '')
      +   (ev.blurb ? '<p class="mc-event-blurb">' + esc(ev.blurb) + '</p>' : '')
      + '</article>';
  }

  function renderEvents() {
    var up = document.getElementById('events-upcoming');
    if (up) {
      var list = ((D.events && D.events.upcoming) || []).filter(isPublished);
      up.innerHTML = list.length
        ? list.map(upcomingCard).join('')
        : '<p class="empty">No upcoming events yet.</p>';
    }
    var ar = document.getElementById('events-archive');
    if (ar) {
      var past = ((D.events && D.events.archive) || []).filter(isPublished);
      ar.innerHTML = past.length
        ? past.map(archiveCard).join('')
        : '<p class="empty">No archived events yet.</p>';
    }
    var lu = document.getElementById('events-updated');
    if (lu && D.events && D.events.lastUpdated) {
      lu.textContent = 'Last updated: ' + D.events.lastUpdated;
    }
  }

  /* ---------- Milestones (self-contained block, anchor #milestones) ---------- */
  function milestoneCard(m) {
    return '<article class="card milestone-card">'
      + '<p class="mono-label">' + esc(m.date) + '</p>'
      + '<h3>' + esc(m.title) + '</h3>'
      + (m.summary ? '<p>' + esc(m.summary) + '</p>' : '')
      + (m.photo ? '<img class="milestone-photo" src="' + esc(m.photo) + '" alt="">' : '')
      + '</article>';
  }
  function renderMilestones() {
    var host = document.getElementById('milestones');
    if (!host) return;
    var list = (D.milestones || []).filter(isPublished);
    var wrap = document.getElementById('milestones-section');
    if (wrap) wrap.hidden = !list.length;
    host.innerHTML = list.map(milestoneCard).join('');
  }

  /* ---------- Contact (Tally embed; renders NOTHING until URL exists) ---------- */
  /* Click-to-load: NOTHING from Tally/Google is requested until the
     visitor presses the button. The fallback link stays visible
     always; the no-JS path is the static <noscript> link. */
  function renderContact() {
    var host = document.getElementById('contact-form-area');
    if (!host) return;
    var C = D.contact || {};
    var embed = C.tallyEmbedUrl || C.tallyFormUrl;
    if (!C.tallyFormUrl || !embed) { host.hidden = true; return; }
    host.hidden = false;
    host.innerHTML =
      '<p class="contact-fallback"><a class="link-mono" href="' + esc(C.tallyFormUrl)
      + '" target="_blank" rel="noopener noreferrer">Open the form in a new tab '
      + '<span aria-hidden="true">&#8599;</span></a></p>'
      + '<p class="contact-load"><button type="button" class="btn btn-primary" id="contact-load-btn">'
      + 'Show the contact form</button></p>';
    var btn = document.getElementById('contact-load-btn');
    btn.addEventListener('click', function () {
      var f = document.createElement('iframe');
      f.className = 'tally-frame';
      f.src = embed;
      f.title = 'PSG-ICE feedback form (Tally)';
      var wrap = btn.parentNode;
      wrap.parentNode.replaceChild(f, wrap);
      f.focus(); /* keyboard flow continues inside the form */
    });
  }

  /* ---------- Site config (ONE place: data/site-config.js) ----------
     · noindex:true  → inject <meta name="robots" content="noindex">.
     · og:url / og:image / twitter:image are STATIC in each page head
       (stamped by tools/stamp-share-tags.py from baseUrl) so link-preview
       crawlers see them — render.js no longer injects them.
     · canonical — injected ONLY when noindex is false (launch day).
       While baseUrl holds placeholders canonical stays off. */
  function applySiteConfig() {
    var cfg = D.siteConfig;
    if (!cfg) return;
    var page = location.pathname.split('/').pop() || 'index.html';

    if (cfg.noindex && !document.querySelector('meta[name="robots"]')) {
      var m = document.createElement('meta');
      m.name = 'robots';
      m.content = 'noindex';
      document.head.appendChild(m);
    }

    if (cfg.baseUrl && !cfg.noindex) {
      var base = String(cfg.baseUrl).replace(/\/+$/, '');
      var url = base + '/' + page;
      if (!document.querySelector('link[rel="canonical"]')) {
        var c = document.createElement('link');
        c.rel = 'canonical';
        document.head.appendChild(c);
      }
      document.querySelector('link[rel="canonical"]').href = url;
    }
  }

  function init() {
    applySiteConfig();
    renderBanner(); renderNews(); renderNewsAll();
    renderOrgChart(); renderOfficerCards();
    renderAbout();
    renderEvents(); renderMilestones();
    renderContact();
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
