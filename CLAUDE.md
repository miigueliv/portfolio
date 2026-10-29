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
- Home: hero with name, subtitle, "Open to Demand Gen and Growth roles in B2B" pill and buttons on the left; cut-out photo with two rotating rings of tool logos on the right; small green flash in the top-left corner. Then career stats (4+ years, €4M+ pipeline, 7 industries, 20+ brands), What I do funnel bars, highlight card (144 MQLs, €150K+ pipeline).
- Work: four numbered cases, client logos instead of text labels, results as big green numbers, "What I did" expands on hover or click and closes when the case scrolls out of view. Order: Impact Negotiation Group (Sprints & Sneakers client), SurePay (via Dapper), Founder Sales course (Startupbootcamp x Academy of the Future), Investor Pipeline (Startupbootcamp).
- Ad library: 18 ads, 3 per row, filters: All, Impact Negotiation Group, Polpo, TripCreator, Other.
- About: intro text plus the same orbit photo, experience timeline, skills, tools, education in cards.
- Contact: email, LinkedIn, based in Amsterdam, open to roles.

## Rules
- Never invent numbers, quotes or claims. Only use what Miguel provides.
- No phone number or references' contact details on the site.
- Keep copy short and specific; Miguel dislikes generic marketing slogans.
- Decorative layers (glows, rings) must use pointer-events: none so they never block the menu.
- Check mobile (390px wide) after layout changes.

## Open items
- Deploy to GitHub Pages, then add an og:image share preview with the live URL
- CV PDF and a Download CV button (waiting for the file)
- 2 to 3 testimonials with name, title and permission (waiting for quotes)
- A "My role" line per case (waiting for Miguel's input)
- Confirm which MQL figure was changed to make 144 (quiz set to 21)
- Possibly make the About photo static so the orbit is unique to Home
