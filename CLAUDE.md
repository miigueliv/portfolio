# Miguel Rodrigues portfolio

Static portfolio site for Miguel Rodrigues, B2B demand generation marketer in Amsterdam. Goal: get recruiters to see him as a strong candidate for Demand Gen and Growth roles in B2B. Hosting target: GitHub Pages (free). Not deployed yet.

## Stack
Plain HTML, CSS and JavaScript. No framework, no build step. Open index.html in a browser to preview.
- Pages: index.html, work.html, ads.html, about.html, contact.html
- Shared: style.css, script.js
- Images: banner.jpg (green flash), me-cut.webp (cut-out photo), me.jpg, logos/ (tool logos), clients/ (client logos), ads/ (ad-01 to ad-18)

## Design system (keep unless Miguel asks)
- Colors: background #070C05, panel #0E1709, ink #F2F7EA, muted #A3B095, line #223019, accent #CFE8A9
- Fonts: Zen Dots for his name, page titles and big numbers; Instrument Sans for everything else
- Cards: dark panel, rounded 24px, thin green border, soft green glow in the top-left corner, no white top line
- Buttons: pill shaped, accent fill or outline

## Page notes
- Home: hero with name, subtitle, "Open to Demand Gen and Growth roles in B2B" pill and buttons on the left; cut-out photo with two rotating rings of tool logos on the right; small green flash in the top-left corner. Then a moving strip of client logos, career stats (4+ years, €4M+ pipeline, 20+ brands), the What I do diagram, highlight card (144 MQLs, €150K+ pipeline).
- Work: four numbered cases. Left column is number, title, client logos; right column is the intro, stats and the "What I did" accordion. Order: Impact Negotiation Group (Sprints & Sneakers client), SurePay (via Dapper), Founder Sales course (Startupbootcamp x Academy of the Future), Investor Pipeline (Startupbootcamp). SurePay has no stats block on purpose: the only numbers available described the work, not the outcome, so they were removed rather than faked. Waiting on a real result figure from Dapper.
- Ad library: 18 ads, 3 per row, filters: All, Impact Negotiation Group, Polpo, TripCreator, Other.
- About: intro text plus the same orbit photo, experience timeline, skills, tools, education in cards.
- Contact: email, LinkedIn, based in Amsterdam, open to roles.

## Components that have specific rules
- What I do diagram (home): two flows, "Demand generation" and "Demand capture", switched by the .ftabs buttons (data-flow="gen" / data-flow="cap"). Inspired by noticed.co but reworded as Miguel's own. Every node is green, including the outcome nodes; hovering a node shows a one-line plain-English explanation. Do not reintroduce removed steps (Content Pillars, Ad Angles, Multi-Channel Campaign, Retargeting Ads, Conversations Started, Sales Follow Up). Qualified Pipeline is the final outcome of Demand capture.
- Hero photo (home): must ALWAYS sit beside the title on the right, never stack underneath, at any width. The layout uses clamp() and minmax(0,Nfr) so it shrinks instead of wrapping. The photo and orbit are illustration, so shrinking them is fine.
- Hero photo fade: the photo itself stays fully opaque. The fade to background is a separate .orbitstage:after gradient in var(--bg) sitting on top at z-index 3. Do not use mask-image on the photo: that makes it semi-transparent and the orbit logos show through his torso.
- Logo strip (home): .marq, duplicated .marqset for a seamless loop. Both sets must stay identical or the loop jumps. Logos are grayscale and low opacity on purpose; they are there for authority, not attention.
- Work card hierarchy: the title is the dominant element, the number is a small muted index label, the logos are quiet support below a divider. Do not make the number big again.

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
- Not on GitHub yet, by choice. Local git only for now; we add GitHub when Miguel is ready to publish.
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
- Possibly make the About photo static so the orbit is unique to Home
