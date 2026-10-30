# Miguel Rodrigues portfolio

Static portfolio site for Miguel Rodrigues, B2B demand generation marketer in Amsterdam. Goal: get recruiters to see him as a strong candidate for Demand Gen and Growth roles in B2B. Hosting target: GitHub Pages (free). Not deployed yet.

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
- Work: four numbered cases. Left column is number, title, client logos; right column is the intro, stats and the "What I did" accordion. Order: Impact Negotiation Group (Sprints & Sneakers client), SurePay (via Dapper), Founder Sales course (Startupbootcamp x Academy of the Future), Investor Pipeline (Startupbootcamp). SurePay has no stats block on purpose: the only numbers available described the work, not the outcome, so they were removed rather than faked. Waiting on a real result figure from Dapper.
- Ad library: 18 ads, 3 per row, filters: All, Impact Negotiation Group, Polpo, TripCreator, Other.
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
1. Hero: "But who's Miguel?" plus the sales-to-marketing lines, beside a FUT-style
   player card (player-card.png) of him as a toddler. Caption: "Based on the Big Five
   (OCEAN) personality test."
2. Experience timeline.
3. Skills and Tools, side by side.
4. Education.
5. Other interests: six cards, each a 3D icon plus one line. Order is fixed and
   deliberate: Basketball, Traveling, History, Chess, Cinema, Surf. Surf is last.
6. Closing CTA "Still here?" with Email, LinkedIn and See the work.

Decisions taken:
- The spinning tool-logo orbit was dropped from About. It is the home page's signature
  move and repeating it made About feel like a rerun.
- OVERRIDES the earlier "small flat line icons in accent green only" rule. Miguel
  supplied full-colour 3D claymation-style renders and they are what is on the page.
- The card says Structure 62. The OCEAN test actually scored Conscientiousness 50.
  This was raised with Miguel in full and he chose to keep 62. Decision closed, do not
  reopen it.
- A baby.png was added early on and is now unused. Left in the folder on purpose.

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
- Backed up to GitHub: git@github.com:miigueliv/portfolio.git (PRIVATE repo, SSH key auth). After saving a checkpoint, also run `git push` so the backup stays current.
- The repo being private is deliberate. Do not make it public, and do not enable GitHub Pages, until Miguel explicitly says he wants the site live.
- Do not deploy or publish anything until Miguel explicitly says so.
- Preview with the "portfolio" server in .claude/launch.json (python3 http.server on port 4321, bound to 127.0.0.1 so it stays private).
- ALWAYS start that preview server at the beginning of a session and give Miguel the link: http://localhost:4321. He should never have to ask to see his own site.
- ALWAYS show the result after a visual change: reload the preview and post a screenshot. Do not describe a change in words only. If Miguel cannot see it, it is not done.
- Miguel keeps http://localhost:4321 open in a browser tab. The link only works while the preview server is running.

## Open items
- Waiting on Miguel: a real outcome metric for the SurePay case, from Dapper
- Waiting on Miguel: five extra client logos to add to the home logo strip, saved into clients/
- Waiting on Miguel: CV PDF, for a Download CV button
- Waiting on Miguel: 2 to 3 testimonials with name, title and permission
- Waiting on Miguel: a "My role" line per case
- Decide: "ICP Research" is currently the first node in BOTH flows with different tooltips. Suggested fix: "Audience Research" for Demand generation, "Account Research" for Demand capture. Miguel has not chosen yet.
- Confirm which MQL figure was changed to make 144 (quiz set to 21)
- Later, once Miguel approves publishing: GitHub repo, GitHub Pages, then an og:image share preview with the live URL
- The Experience timeline on About is still just five job titles and dates, a worse version of his LinkedIn. It needs one outcome line per role. Waiting on Miguel's numbers.
- The hero line "a camera that came before the marketing career" is never paid off anywhere on the site. He freelanced as a photographer, which is a real differentiator for someone running ads. Worth a section of his own photos.
- great-guy.png is a near-exact copy of the Great Place To Work(R) badge, red and navy, with the (R) symbol intact. It is the only non-green element on the site. This was raised with Miguel twice; he wants it kept as it is. Do not offer to recolour it again.
