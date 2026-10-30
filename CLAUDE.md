# Miguel Rodrigues portfolio

Static portfolio site for Miguel Rodrigues, B2B demand generation marketer in Amsterdam. Goal: get recruiters to see him as a strong candidate for Demand Gen and Growth roles in B2B. LIVE at https://miigueliv.github.io/portfolio/ since 30 Oct 2026, on GitHub Pages from the main branch, root folder. Every push to main redeploys the public site in a few minutes, so a mistake on main is a mistake recruiters can see.

## Stack
Plain HTML, CSS and JavaScript. No framework, no build step. Open index.html in a browser to preview.
- Pages: index.html, work.html, ads.html, about.html, contact.html
- Shared: style.css, script.js
- Images: banner.jpg (green flash), me-cut.webp (cut-out photo), me.jpg, player-card.png (About hero), great-guy.png (footer badge), logos/ (tool logos), clients/ (client logos), ads/ (ad-01 to ad-18), icons/ (interest icons)
- Images Miguel supplies are huge. Downscale before use with `sips -Z 240 file.png` (macOS built-in, keeps transparency). There is no PIL or ImageMagick on this machine. The interest icons went from 8.7 MB to 308 KB this way.

## Design system (keep unless Miguel asks)
- Colors: background #070C05, panel #0E1709, ink #F2F7EA, muted #A3B095, line #223019, accent #CFE8A9
- Fonts: Zen Dots for his name, page titles and big numbers; Instrument Sans for everything else
- Cards: dark panel, rounded 24px, thin green border, soft green glow in the top-left corner, no white top line
- Buttons: pill shaped, accent fill or outline

## Page notes
- Home: hero with name, subtitle, "Open to Demand Gen and Growth roles in B2B" pill and buttons on the left; cut-out photo with two rotating rings of tool logos on the right; small green flash in the top-left corner. Then a moving strip of client logos, career stats (4+ years, €4M+ pipeline, 20+ brands), the What I do diagram, highlight card (144 MQLs, €150K+ pipeline).
- Work: four numbered cases. Left column is number, title, client logos; right column is the intro, stats and the "What I did" accordion. Order: Impact Negotiation Group (Sprints & Sneakers client), SurePay (via Dapper), Founder Sales course (Startupbootcamp x Academy of the Future), Investor Pipeline (Startupbootcamp). SurePay has no stats block on purpose: see the effort-vs-outcome rule below.
- Ad library: 18 ads, 3 per row, filters: All, Impact Negotiation Group, Polpo, TripCreator, Other. No hero glow here, on purpose.
- About: player card hero, experience timeline, skills, tools, education, "Other interests" cards, closing CTA. See "About page redesign" below.
- Contact: email, LinkedIn, based in Amsterdam, open to roles.

## Components that have specific rules
- What I do diagram (home): two flows, "Demand generation" and "Demand capture", switched by the .ftabs buttons (data-flow="gen" / data-flow="cap"). Inspired by noticed.co but reworded as Miguel's own. Every node is green, including the outcome nodes; hovering a node shows a one-line plain-English explanation. Do not reintroduce removed steps (Content Pillars, Ad Angles, Multi-Channel Campaign, Retargeting Ads, Conversations Started, Sales Follow Up). Qualified Pipeline is the final outcome of Demand capture.
- Hero photo (home): must ALWAYS sit beside the title on the right, never stack underneath, at any width. The layout uses clamp() and minmax(0,Nfr) so it shrinks instead of wrapping. The photo and orbit are illustration, so shrinking them is fine.
- Hero photo fade: the photo itself stays fully opaque. The fade to background is a separate .orbitstage:after gradient in var(--bg) sitting on top at z-index 3. Do not use mask-image on the photo: that makes it semi-transparent and the orbit logos show through his torso.
- Logo strip (home): .marq, duplicated .marqset for a seamless loop. Both sets must stay identical or the loop jumps. Logos are grayscale and low opacity on purpose; they are there for authority, not attention.
- Work card hierarchy: the title is the dominant element, the number is a small muted index label, the logos are quiet support below a divider. Do not make the number big again.
- Footer (all five pages, identical markup): tagline, "Great Guy To Work With" badge, two link columns (Pages, Elsewhere), legal line, then "Miguel" in Zen Dots at 25vw across the full viewport width. Rules that are load-bearing:
  - The footer must NOT have overflow:hidden. The footer sits inside .wrap (1080px), so overflow:hidden clips the full-width wordmark at the container edge and cuts the last letter off. The clipping belongs on .fword itself.
  - .fnav is a <nav>, so it inherits the global nav rules. It needs align-items:start and padding:0, and .fnav a needs padding:0 and border-bottom:0, or the columns misalign and script.js puts a green underline on the current page link.
  - The wordmark says "Miguel" only, not the full name. Fewer letters means bigger letters at the same width.
  - The badge sits straight. It was tilted once and Miguel asked for it straight.
- Hero glow: the green flash is .hero2:before on Home. Work, About and Contact reuse it through the shared .glowhead class (same image and mask, 400px tall instead of 520px). Ad library has no glow on purpose. Do not put overflow-x:clip on a header that carries .glowhead; it cuts the glow off with a hard vertical line.

## About page redesign (DONE, 30 Oct 2026)
Built differently from the plan that was on hold. The country-by-country "short
version" and the travel photos were dropped; Miguel went another way.

What is actually on the page now, in order:
1. Hero: "But who's Miguel?" plus the sales-to-marketing lines, ending on
   "Portuguese, based in Amsterdam." Beside it a FUT-style player card
   (player-card.png) of him as a toddler, captioned "Stats based on the Big Five
   (OCEAN) personality test."
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
- Preview with the "portfolio" server in .claude/launch.json (python3 http.server on port 4321, bound to 127.0.0.1 so it stays private).
- ALWAYS start that preview server at the beginning of a session and give Miguel the link: http://localhost:4321. He should never have to ask to see his own site.
- ALWAYS show the result after a visual change: reload the preview and post a screenshot. Do not describe a change in words only. If Miguel cannot see it, it is not done.
- Miguel keeps http://localhost:4321 open in a browser tab. The link only works while the preview server is running.

## Open items
- Waiting on Miguel: a result figure for the SurePay case
- Waiting on Miguel: five extra client logos to add to the home logo strip, saved into clients/
- Waiting on Miguel: CV PDF, for a Download CV button
- Waiting on Miguel: 2 to 3 testimonials with name, title and permission
- Waiting on Miguel: a "My role" line per case
- Decide: "ICP Research" is currently the first node in BOTH flows with different tooltips. Suggested fix: "Audience Research" for Demand generation, "Account Research" for Demand capture. Miguel has not chosen yet.
- Confirm which MQL figure was changed to make 144 (quiz set to 21)
- NEXT: og:image and og:url. Pasting the live link into LinkedIn or WhatsApp currently shows an empty rectangle. This matters now that Miguel is sending the link to recruiters.
- NEXT: the About page is broken on mobile. .ahero does not stack (a later unconditional rule beats the media query), .ints is 3 crushed columns, .subs is 2. The other four pages are fine. Audited at 375x812, not fixed.
- baby.png and me.jpg are in the repo but used by no page.
- The Experience timeline on About is still just five job titles and dates, a worse version of his LinkedIn. It needs one outcome line per role. Waiting on Miguel's numbers.
- The hero line "a camera that came before the marketing career" is never paid off anywhere on the site. He freelanced as a photographer, which is a real differentiator for someone running ads. Worth a section of his own photos.
- great-guy.png stays exactly as it is, red and navy. It is the only non-green element on the site. Raised with Miguel twice; decision closed. Do not offer to recolour it again.
