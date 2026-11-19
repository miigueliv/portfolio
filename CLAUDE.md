# Miguel Rodrigues portfolio

Static portfolio site for Miguel Rodrigues, B2B demand generation marketer in Amsterdam. Goal: get recruiters to see him as a strong candidate for Demand Gen and Growth roles in B2B. LIVE at https://miigueliv.github.io/portfolio/ since 30 Oct 2026, on GitHub Pages from the main branch, root folder. Every push to main redeploys the public site in a few minutes, so a mistake on main is a mistake recruiters can see.

## Stack
Plain HTML, CSS and JavaScript. No framework, no build step. Open index.html in a browser to preview.
- Pages: index.html, work.html, ads.html, about.html, contact.html
- Shared: style.css, script.js
- Images: banner.jpg (green flash), me-cut.webp (cut-out photo), me.jpg, player-card.webp (About hero), og.jpg (link preview card), great-guy.png (footer badge), logos/ (tool logos), clients/ (client logos), ads/ (ad-01 to ad-21), icons/ (interest icons)
- Images Miguel supplies are huge. Downscale before use with `sips -Z 240 file.png` (macOS built-in, keeps transparency). There is no PIL or ImageMagick on this machine. The interest icons went from 8.7 MB to 308 KB this way.
- `sips` cannot write WebP: `sips -s format webp` silently produces no file. To make a WebP, render it through headless Chrome instead: a tiny HTML page that draws the image on a canvas and prints `canvas.toDataURL('image/webp',0.85)` into a div, then
  `"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless --allow-file-access-from-files --virtual-time-budget=15000 --dump-dom file:///tmp/enc.html`
  and base64-decode the result. This is how player-card went from 2222 KB to 106 KB.
- In a Claude Code cloud session (Linux) there is no `sips` and no macOS Chrome, but
  Pillow IS there and writes WebP directly. The three Polpo ads added on 10 Nov 2026
  went from 1500x1500 PNG (1.1 to 2.5 MB each) to 800x800 WebP at quality 85, method 6,
  about 47 KB each, which matches the other ads. Same job, one line of Python.
- Headless Chrome is also the reliable way to take a real desktop screenshot: `--window-size=1280,860 --screenshot=/tmp/x.png http://localhost:4321/index.html`. The preview tool's own screenshot only captures the leftmost ~400px when the viewport is wide.

## Design system (keep unless Miguel asks)
- Colors: background #070C05, panel #0E1709, ink #F2F7EA, muted #A3B095, line #223019, accent #CFE8A9
- Fonts: Zen Dots for his name, page titles and big numbers; Instrument Sans for everything else
- Cards: dark panel, rounded 24px, thin green border, soft green glow in the top-left corner, no white top line
- Buttons: pill shaped, accent fill or outline
- Elevation (added 30 Oct 2026, and this is the part that is easy to get wrong):
  on a `#070C05` page a black shadow is INVISIBLE. Black over near-black is 7
  levels of difference out of 255. A first attempt used `rgba(0,0,0,.95)`
  shadows and Miguel could not see a single change. **Height is read as
  lightness, not as shadow.** Each level up is a lighter surface:
  `--surf1:#131E0C` for a card on the page, `--surf2:#1A2812` for that card on
  hover, `--edge1:#2E4021` for its border (lighter than `--line`), plus a
  `--sheen` wash down from the top and a 1px lit top edge. Shadows are kept
  tight and green-tinted; their only job is to stop the lighter card bleeding
  into the page. Things that sit INSIDE a card go the other way and get darker
  (`.case .stats` is `rgba(5,9,4,.55)`), so they read as cut into it.
  Tokens live in the block near the end of style.css, above the mobile block.

## Page notes
- Home: hero with name, subtitle, "Open to Demand Gen and Growth roles in B2B" pill and buttons on the left; cut-out photo with two rotating rings of tool logos on the right; small green flash in the top-left corner. Then a moving strip of client logos, career stats (4+ years, €4M+ pipeline, 20+ brands), the What I do diagram, highlight card (144 MQLs, €150K+ pipeline).
- Work: four numbered cases. Left column is number, title, client logos; right column is the intro, stats and the "What I did" accordion. Order: Impact Negotiation Group (Sprints & Sneakers client), SurePay (via Dapper), Founder Sales course (Startupbootcamp x Academy of the Future), Investor Pipeline (Startupbootcamp). SurePay has no stats block on purpose: see the effort-vs-outcome rule below.
- Ad library: 21 ads, 3 per row, filters: All, Impact Negotiation Group, Polpo, TripCreator, Other. No hero glow here, on purpose. Under the filters a `.fcount` line with `role="status"` announces how many ads are showing. Clicking an ad opens `#lb`, a real dialog: `role="dialog"`, `aria-modal`, a 48x48 close button, focus moves into it, Tab is trapped on the close button, and Escape returns focus to the ad that was clicked.
- About: player card hero, experience timeline, skills, tools, education, "Other interests" cards, closing CTA. See "About page redesign" below.
- Contact: email, LinkedIn, based in Amsterdam, open to roles.

## Components that have specific rules
- What I do diagram (home): two flows, "Demand generation" and "Demand capture", switched by the .ftabs buttons (data-flow="gen" / data-flow="cap"). Inspired by noticed.co but reworded as Miguel's own. Every node is green, including the outcome nodes; hovering a node shows a one-line plain-English explanation. Do not reintroduce removed steps (Content Pillars, Ad Angles, Multi-Channel Campaign, Retargeting Ads, Conversations Started, Sales Follow Up). Qualified Pipeline is the final outcome of Demand capture.
  - `.svcflow` must NOT get `overflow:hidden`: the `.ft` tooltips have to escape
    the card. That also means it must not get the straight 1px `:before` top
    edge the other cards use, because without the clip that bar sticks out past
    the rounded corner. Miguel spotted exactly this. Its top edge comes from the
    `inset 0 1px 0` in `--e1`, which follows the border radius.
- Hero photo (home): sits beside the title on the right at every width ABOVE 560px, and must never stack there. The layout uses clamp() and minmax(0,Nfr) so it shrinks instead of wrapping. The photo and orbit are illustration, so shrinking them is fine.
  - BELOW 560px it stacks under the title. Miguel approved this on 30 Oct 2026 after seeing the measurements: side by side on a 375px screen left only 186px for the title, so the name broke over two lines and the green pill wrapped. Stacking gives the title the full 327px and the photo 290px. This is the one deliberate exception; do not extend it above 560px.
- Hero photo fade: the photo itself stays fully opaque. The fade to background is a separate .orbitstage:after gradient in var(--bg) sitting on top at z-index 3. Do not use mask-image on the photo: that makes it semi-transparent and the orbit logos show through his torso.
- Logo strip (home): .marq, duplicated .marqset for a seamless loop. Both sets must stay identical or the loop jumps. Logos are grayscale and low opacity on purpose; they are there for authority, not attention.
- Work card hierarchy: the title is the dominant element, the number is a small muted index label, the logos are quiet support below a divider. Do not make the number big again.
- Footer (all five pages, identical markup): tagline, "Great Guy To Work With" badge, two link columns (Pages, Elsewhere), legal line, then "Miguel" in Zen Dots at 25vw across the full viewport width. Rules that are load-bearing:
  - The footer must NOT have overflow:hidden. The footer sits inside .wrap (1080px), so overflow:hidden clips the full-width wordmark at the container edge and cuts the last letter off. The clipping belongs on .fword itself.
  - .fnav is a <nav>, so it inherits the global nav rules. It needs align-items:start and padding:0, and .fnav a needs padding:0 and border-bottom:0, or the columns misalign and script.js puts a green underline on the current page link.
  - The wordmark says "Miguel" only, not the full name. Fewer letters means bigger letters at the same width.
  - The badge sits straight. It was tilted once and Miguel asked for it straight.
- Skip link: every page starts with `<a class="skip" href="#main">Skip to content</a>` and the first element after the nav carries `id="main" tabindex="-1"`. It is invisible until a keyboard user tabs to it.
- Hero glow: the green flash is .hero2:before on Home. Work, About and Contact reuse it through the shared .glowhead class (same image and mask, 400px tall instead of 520px). Ad library has no glow on purpose. Do not put overflow-x:clip on a header that carries .glowhead; it cuts the glow off with a hard vertical line.

## About page redesign (DONE, 30 Oct 2026)
Built differently from the plan that was on hold. The country-by-country "short
version" and the travel photos were dropped; Miguel went another way.

What is actually on the page now, in order:
1. Hero: "But who's Miguel?" plus the sales-to-marketing lines, ending on
   "Portuguese, based in Amsterdam." Beside it a FUT-style player card
   (player-card.webp) of him as a toddler, captioned "Stats based on the Big Five
   (OCEAN) personality test." Miguel asked for it 20% smaller on 30 Oct 2026:
   360px to 288px on desktop, 300px to 240px on mobile.
2. Experience card. The timeline, then a thin divider, then Languages and Education
   as two columns of small chips inside the SAME card (.subs). They were separate
   cards once; Miguel asked for them folded in to save vertical space.
3. Skills and Tools, side by side, both using .panel.slim.
4. Other interests: six cards, each a 3D icon plus one line. Order is fixed and
   deliberate: Basketball, Traveling, History, Chess, Cinema, Surf. Surf is last.
5. Closing CTA "Still here?" — "If you've made it this far, there's probably a
   reason. Let's talk!" with two buttons only, Email me and See my work. LinkedIn
   was deliberately removed from here: three options diluted the ask.

Decisions taken:
- The spinning tool-logo orbit was dropped from About. It is the home page's signature
  move and repeating it made About feel like a rerun.
- OVERRIDES the earlier "small flat line icons in accent green only" rule. Miguel
  supplied full-colour 3D claymation-style renders and they are what is on the page.
- The player card stats are final. Decision closed, do not reopen it.
- A baby.png was added early on and is now unused. Left in the folder on purpose.
- Education is one chip: Bachelor's in Tourism Management. Nothing else goes in there.
  The University of Split exchange was dropped; Miguel knows and can have it back.
- Country flags are system emojis. They render on macOS but Windows Chrome draws the
  two country letters instead. Miguel was told and chose to keep the emojis.

## Flow backgrounds, tools section (LIVE since 15 Nov 2026)
Miguel asked for the hero motion from vistadigital.si (a gradient the mouse
pushes around like wet paint) in his own green, then asked for it stronger, at
the bottom of the site too, and for his photo to move out of the hero. He
reviewed it on localhost and asked for it to go live the same day.

What changed:
- `flow.js` (new, loaded on all five pages after script.js). WebGL2, written
  from scratch, no image files. It adds one `<canvas class="flowbg">` per wave
  as the first children of `<body>` and puts `.flowon` (hero wave running) and
  `.flowfoot` (footer wave running) on `<html>`. With no WebGL2 nothing is
  added, the old green flash (`.hero2:before`) stays and the footer looks as it
  did, so do not delete those rules.
- Hero wave (home only at first, now every page: see "Top wave on every page"
  below): a ridge rising from bottom left to the right. It ends
  30px below the hero so it has faded before the "Brands I've worked with" label.
- Footer wave (every page): only the band behind the big "Miguel" wordmark,
  mirrored. It starts at the top of the wordmark on purpose, so the footer
  links and the legal line always sit on plain dark. With `.flowfoot` the
  wordmark is a dark cut-out with a thin green outline; the outline is what
  keeps the letter tops visible above the green.
- **Copy contrast is the priority (Miguel's words: the copy is the most
  important thing).** `.flowon .hero2>div:before` is a soft dark pool behind
  the hero copy that dims any green dragged under the title. If the motion is
  ever made stronger again, check the title with the green pushed over it.
- The photo and logo orbit moved OUT of the home hero into a new
  `<section class="tools">` after What I do: heading "Proficient in the best
  B2B tools" (Miguel's wording), one line of copy, the photo with the orbit,
  then `.wall`, two rows of all 15 tool logos with names moving in opposite
  directions. Each `.wallrow` holds two identical `<ul>`s for a seamless loop,
  same trick as `.marq`; keep the two lists identical. The hero is now one
  column of copy. The older hero-photo notes above (side by side, never stack
  above 560px) no longer apply to the hero; the photo-fade note still applies
  to the figure in its new place.
- Knobs in flow.js: `.3` in DRAW is how far the paint moves, `.5` in FLOW is
  how fast it settles (lower is slower), `.05` is the brush size, `.8` in
  `uPush` is how hard the mouse grabs. Wave position per place is `shape` in
  the two `make()` calls at the bottom.
- Respects reduced motion (one still frame) and pauses when off screen.
- Testing trap: when the Browser pane is hidden, requestAnimationFrame never
  fires and `scroll-behavior:smooth` never arrives, so the wave looks frozen
  in screenshots. That is the pane, not a bug. To test there, temporarily
  expose `frame` from `make()` and call it by hand while dispatching
  `pointermove` events; scroll with `behavior:'instant'`.
- Miguel approved the line under the tools heading ("The stack I use to find
  the right accounts, reach them, and measure what worked.").

## Top wave on every page (17 Nov 2026)
Miguel asked for the home page background motion on the rest of the site, same
motion top and bottom. The footer wave was already on all five pages; only the
top wave was home-only. Nothing in the HTML changed, only `flow.js` and
`style.css`.

- `flow.js` now picks the top wave's anchor with
  `document.querySelector('.hero2, .glowhead, .phead')`: the hero on Home,
  `.glowhead` on Work, About and Contact, the `.phead` block on the Ad library.
  The band still runs from the top of the page to 30px below that header.
- **Short headers get a 400px floor.** Work, Ads and Contact headers are about
  207px against the hero's 560px, so without a floor the band is only ~313px,
  the ridge flattens into a horizontal stripe straight through the title and
  the copy loses contrast. Measured on Work at 1280px: 330 is a stripe over the
  copy, 470 pushes the ridge down into the first case card, 400 is right. If
  you change a page header's height, re-check this number.
- **Copy contrast, same rule as home.** Every page gets the dark pool behind
  its copy. On About the old green flash is switched off and the pool goes on
  `.ahero>div`. On Work and Contact the pool IS `.glowhead:before`, the same
  pseudo element the flash used, so that rule has to reset every glow property
  (transform, mask, opacity, width, height) or the flash leaks through.
- **The Ad library is the awkward one.** Its `.phead` is a block INSIDE
  `#main`, and the filter chips and the `.fcount` "Showing all 21 ads" line are
  siblings BELOW it, sitting right on the bright ridge. The pool cannot go on
  `.phead` there: `.phead` carries `isolation:isolate`, which makes it paint
  ABOVE its non-positioned siblings, so the pool dimmed the chips and the count
  line themselves instead of the green behind them. It took a red-background
  probe to see this. The pool goes on `section#main` instead, where `z-index:-1`
  puts it behind all of that content. `section#main` does not match Work or
  Contact, where the header IS `#main`, and the lightbox `#lb` sits outside the
  section so isolating it is safe.
- The ads pool uses an explicitly sized radial
  (`820px 400px at 280px 210px`) rather than `closest-side`. With
  `closest-side` on a 1300x560 box the count line fell at ~81% of the gradient,
  about .37 alpha, nowhere near enough over bright green. The explicit size
  also keeps the pool off the right-hand side so the ridge stays bright there.
- **`.flowon nav{position:relative;z-index:1}`.** The page header forms a
  stacking context and comes after the nav in the DOM, so its pool painted on
  top of the nav and dimmed the "Miguel Rodrigues" logo (measured: 242,247,234
  down to 54,59,50). Lifting the nav puts it back on top. If you ever add a
  pool to another block, check the logo.
- Fallbacks are unchanged and were re-tested: with no WebGL2 nothing is added,
  `.flowon` is never set, so Work, About and Contact keep the original green
  flash and the Ad library stays plain, which is the deliberate "no glow here"
  rule. Reduced motion still draws one still frame.
- Checked at 1280, 1440 and 1680 wide, and at 390 for breakage only.

## Hero spacing and the career stats row (19 Nov 2026)
Miguel reviewed the live home page and asked for three things. All three are in
`style.css` only; no HTML or JS changed.

- **CTA spacing.** The two hero buttons were 12px apart, which on pills that
  size reads as glued together. Now 18px (`.hero2 .actions` gap). `.btn.ghost`
  margin-left went 12px to 18px as well, so the closing CTAs on Contact and
  About match.
- **Hero height.** The gap between the buttons and the "Brands I've worked
  with" label was NOT padding: `.hero2` had `min-height:clamp(330px,46vw,560px)`
  with the copy vertically centred, so about 145px of empty space sat under the
  buttons. Now `clamp(300px,38vw,470px)` plus a `padding-bottom` of
  `clamp(20px,2.6vw,36px)`. The logo strip moved up roughly 90px.
  Note this also shortens the hero wave, because flow.js sizes the top band as
  `hero.getBoundingClientRect().bottom + 30` with no floor for `.hero2`. The
  ridge still rises correctly at 1440 and 1900; re-check it if the hero height
  changes again.
- **Career stats are no longer a panel.** `.pg` was one bordered, segmented
  slab sitting directly under the low-opacity logo strip, and it fought the
  flow wave behind it. It is now an open three-column row: a hairline rule
  across the top of each stat, a bright accent tick on the left that runs the
  full width on hover, a soft top-left green bloom (the card glow language,
  without the box), and real gaps instead of edge-to-edge divider lines.
  Numbers went from 3rem to 3.6rem max.
  - `.pg` was removed from the `.panel,.case,.dark,...` elevation rule and lost
    its `--surf1` background. It is not a raised surface any more.
  - **Keep the `.pg` class and the `b[data-n]` markup.** script.js counts the
    numbers up off exactly those two selectors. A screenshot taken mid-count
    shows wrong figures (3+, 18+); that is the animation, not a bad number.
  - At 760px and below the numbers are capped at `clamp(1.55rem,7vw,2.1rem)`,
    because "€4M+" is `white-space:nowrap` and overflowed its column at 390px.

## Rules
- Never invent numbers, quotes or claims. Only use what Miguel provides.
- No phone number or references' contact details on the site.
- Keep copy short and specific; Miguel dislikes generic marketing slogans.
- Decorative layers (glows, rings) must use pointer-events: none so they never block the menu.
- Design and review at desktop width. Miguel has explicitly deprioritised mobile: recruiters will see this on a laptop. Do not leave the preview at a narrow viewport, and do not "fix" layouts by stacking them.
- Never leave numbers on the site that describe effort rather than outcome. If there is no real result, show no stat.

## How we work (agreed with Miguel)
- The folder is the source of truth. It is a git repo, so every change is reversible.
- Save points: at the end of each working session, update this file and make one commit summarising what changed. Miguel is new to git, so explain in plain language and never run destructive commands without asking.
- GitHub: git@github.com:miigueliv/portfolio.git (PUBLIC since 30 Oct 2026, SSH key auth). After saving a checkpoint, also run `git push`.
- `git push` is now a deploy, not just a backup. Always check with Miguel before pushing, and say plainly that it will go live.
- The repo is public, so every file and the whole commit history are readable by anyone. Never put a credential, a client's private number or anything Miguel would not want a recruiter to read into this folder. Miguel was told the old history still contains earlier internal notes and chose to accept that. Decision closed.
- **Preview: READ THIS BEFORE SENDING MIGUEL A LINK. It has been got wrong in
  five separate sessions and he has had to ask for a fix every time.**
  Work on this site now happens in two different places, and the preview works
  differently in each. Check which one you are in before you say anything.
  - Run `uname` (or `hostname`). **`Darwin` = Miguel's own Mac.** Start the
    server (`python3 -m http.server 4321 --bind 127.0.0.1` from the project
    folder) and send him http://localhost:4321. That link is real and it works.
  - **`Linux` (hostname `vm`) = a Claude Code CLOUD session.** The code is on a
    container in the cloud, NOT on his Mac. `http://localhost:4321` typed into
    HIS browser points at HIS Mac, where nothing is running, so the link is
    dead on arrival. **Do not send him that URL.** Start the server anyway
    (the container needs it for screenshots), then call the
    `report_preview_port` tool with port 4321, which is what makes the preview
    appear inside the Claude app. Tell him to use the preview pane in the app,
    not a browser tab. Every cloud session starts a fresh empty container, so
    the server from the last session is always gone; start it again.
  - `.claude/launch.json` is referenced in older notes but is NOT in the repo.
    Do not tell him to use it. Start the server with the plain command above.
- ALWAYS show the result after a visual change: reload the preview and post a
  screenshot. Do not describe a change in words only. If Miguel cannot see it,
  it is not done. In a cloud session the screenshot is often the ONLY way he
  can see the work, so it is not optional.
- If Miguel wants the real http://localhost:4321 in his own browser tab back,
  there are two ways and both are his call: run Claude Code on his Mac (desktop
  app or `claude` in a terminal in the portfolio folder), or turn on Remote
  Control on his Mac (Claude desktop app, Settings, Claude Code, Remote
  Control) and share the portfolio folder, which lets a cloud session attach to
  his machine. Until one of those is set up, `list_computer_folders` returns
  nothing and the cloud session cannot reach his Mac at all.

## Open items
- Waiting on Miguel: a result figure for the SurePay case
- Waiting on Miguel: five extra client logos to add to the home logo strip, saved into clients/
- Waiting on Miguel: CV PDF, for a Download CV button
- Waiting on Miguel: 2 to 3 testimonials with name, title and permission
- Waiting on Miguel: a "My role" line per case
- Decide: "ICP Research" is currently the first node in BOTH flows with different tooltips. Suggested fix: "Audience Research" for Demand generation, "Account Research" for Demand capture. Miguel has not chosen yet.
- Confirm which MQL figure was changed to make 144 (quiz set to 21)
- og:image and og:url are DONE (30 Oct 2026). og.jpg is a 1200x630 card: name in Zen Dots, the tagline, the green pill and the cut-out photo on a dark background. It was generated with headless Chrome from a throwaway HTML file, so to change it, rebuild it the same way. LinkedIn and WhatsApp cache previews, so a change can take a day to show up; LinkedIn's Post Inspector forces a refresh.
- The design-polish block near the end of style.css (surfaces, type scale,
  spacing tokens) also has to stay ABOVE the mobile block and BELOW everything
  else, for the same source-order reason. It fixed one real bug: `.svctext h3`
  was 41.6px while its own section's `.svc h2` was 35.2px, so the child outranked
  the parent. It also replaced five different section paddings and four corner
  radii with one scale (--s1..--s6, --r-sm, --r-md).
- Still not applied, suggested and not yet approved: rebuild the Contact page
  (it is about 60% empty), a sticky blurred nav, a subtle scroll-reveal, and
  raising the logo strip from opacity .42 so it is not quite so faint.
- Mobile was fixed on 30 Oct 2026. All the mobile rules now live in ONE block at the END of style.css, and they have to stay there: earlier media queries were silently defeated by unconditional rules written further down the file. If a mobile fix seems to do nothing, check for a later rule overriding it before changing anything else.
- baby.png (252 KB), me.jpg (136 KB) and now player-card.png (2222 KB) are in the repo but used by no page. Ask Miguel before deleting any of them.
- The Experience timeline on About is still just five job titles and dates, a worse version of his LinkedIn. It needs one outcome line per role. Waiting on Miguel's numbers.
- The hero line "a camera that came before the marketing career" is never paid off anywhere on the site. He freelanced as a photographer, which is a real differentiator for someone running ads. Worth a section of his own photos.
- great-guy.png stays exactly as it is, red and navy. It is the only non-green element on the site. Raised with Miguel twice; decision closed. Do not offer to recolour it again.
