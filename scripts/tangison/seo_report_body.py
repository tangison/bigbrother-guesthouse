#!/usr/bin/env python3
"""Big Brother Guesthouse, Usakos: SEO Audit and Local Search Report.
Body PDF via ReportLab (TocDocTemplate + multiBuild). Cover is generated
separately from cover HTML (Template 01) and merged as page 0 by pypdf.

Numbering map (Step 3.5):
| Outline | Type    | Section # | Title                                   |
| 1       | cover   | -         | Cover (Template 01, separate PDF)       |
| 2       | toc     | -         | Table of contents (roman i footer)      |
| 3       | content | 1         | Executive summary                       |
| 4       | content | 2         | What we checked and how the site scored |
| 5       | content | 3         | What was found and fixed on 15 October  |
| 6       | content | 4         | Speed: the measured numbers             |
| 7       | content | 5         | Listings, the NTB and the competition   |
| 8       | content | 6         | Your action list                        |
"""
import hashlib
import os
import sys

from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_JUSTIFY, TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.units import inch
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.pdfmetrics import registerFontFamily
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import (
    CondPageBreak,
    HRFlowable,
    KeepTogether,
    PageBreak,
    Paragraph,
    SimpleDocTemplate,
    Spacer,
    Table,
    TableStyle,
)
from reportlab.platypus.tableofcontents import TableOfContents

SKILL_SCRIPTS = "/home/z/my-project/skills/pdf/scripts"
if SKILL_SCRIPTS not in sys.path:
    sys.path.insert(0, SKILL_SCRIPTS)
from pdf import install_font_fallback  # noqa: E402

OUT = "/home/z/my-project/download/bbgh_seo_audit_body.pdf"

# ---- Fonts (allowed set only; probe confirmed on this machine) ------------
FONT_DIR = "/usr/share/fonts"
pdfmetrics.registerFont(TTFont("NotoSerifSC", f"{FONT_DIR}/truetype/noto-serif-sc/NotoSerifSC-Regular.ttf"))
pdfmetrics.registerFont(TTFont("NotoSerifSC-Bold", f"{FONT_DIR}/truetype/noto-serif-sc/NotoSerifSC-Bold.ttf"))
pdfmetrics.registerFont(TTFont("FreeSerif", f"{FONT_DIR}/truetype/freefont/FreeSerif.ttf"))
pdfmetrics.registerFont(TTFont("FreeSerif-Bold", f"{FONT_DIR}/truetype/freefont/FreeSerifBold.ttf"))
pdfmetrics.registerFont(TTFont("FreeSerif-Italic", f"{FONT_DIR}/truetype/freefont/FreeSerifItalic.ttf"))
pdfmetrics.registerFont(TTFont("FreeSerif-BoldItalic", f"{FONT_DIR}/truetype/freefont/FreeSerifBoldItalic.ttf"))
pdfmetrics.registerFont(TTFont("DejaVuSans", f"{FONT_DIR}/truetype/dejavu/DejaVuSansMono.ttf"))
registerFontFamily("NotoSerifSC", normal="NotoSerifSC", bold="NotoSerifSC-Bold")
registerFontFamily("FreeSerif", normal="FreeSerif", bold="FreeSerif-Bold",
                   italic="FreeSerif-Italic", boldItalic="FreeSerif-BoldItalic")
registerFontFamily("DejaVuSans", normal="DejaVuSans", bold="DejaVuSans")
install_font_fallback()

# ---- Cascade palette (auto-generated, copied verbatim) -------------------
PAGE_BG = colors.HexColor("#f2f2f0")
SECTION_BG = colors.HexColor("#f0f0ef")
CARD_BG = colors.HexColor("#e8e7e3")
TABLE_STRIPE = colors.HexColor("#f5f4f2")
HEADER_FILL = colors.HexColor("#6a6249")
COVER_BLOCK = colors.HexColor("#7d714b")
BORDER = colors.HexColor("#d3d0c6")
ICON = colors.HexColor("#a69150")
ACCENT = colors.HexColor("#897128")
ACCENT_2 = colors.HexColor("#6a4fb9")
TEXT_PRIMARY = colors.HexColor("#232220")
TEXT_MUTED = colors.HexColor("#85827b")
SEM_SUCCESS = colors.HexColor("#3d7d53")
SEM_WARNING = colors.HexColor("#9f8552")
SEM_ERROR = colors.HexColor("#8b4f4a")
SEM_INFO = colors.HexColor("#567696")

TABLE_HEADER_COLOR = HEADER_FILL
TABLE_ROW_ODD = TABLE_STRIPE

# ---- Document geometry ----------------------------------------------------
MARGIN = 0.95 * inch
PAGE_W, PAGE_H = A4
AVAIL_W = PAGE_W - 2 * MARGIN
AVAIL_H = PAGE_H - 2 * MARGIN
H1_ORPHAN = AVAIL_H * 0.25

DOC_TITLE = "Big Brother Guesthouse, Usakos: SEO Audit and Local Search Report"

# ---- Styles ---------------------------------------------------------------
st_h1 = ParagraphStyle("H1", fontName="FreeSerif", fontSize=20, leading=27,
                       textColor=TEXT_PRIMARY, spaceBefore=18, spaceAfter=6)
st_h2 = ParagraphStyle("H2", fontName="FreeSerif", fontSize=14.5, leading=21,
                       textColor=HEADER_FILL, spaceBefore=14, spaceAfter=6)
st_body = ParagraphStyle("Body", fontName="FreeSerif", fontSize=10.5, leading=17,
                         textColor=TEXT_PRIMARY, alignment=TA_JUSTIFY, spaceAfter=10)
st_bullet = ParagraphStyle("Bullet", parent=st_body, alignment=TA_LEFT, leftIndent=16,
                           bulletIndent=4, spaceAfter=6)
st_caption = ParagraphStyle("Caption", fontName="FreeSerif", fontSize=8.5, leading=12,
                            textColor=TEXT_MUTED, alignment=TA_CENTER,
                            spaceBefore=3, spaceAfter=6)
st_quote = ParagraphStyle("Quote", fontName="FreeSerif-Italic", fontSize=11, leading=18,
                          textColor=TEXT_PRIMARY, leftIndent=24, spaceBefore=6, spaceAfter=10)
st_th = ParagraphStyle("TH", fontName="FreeSerif", fontSize=9.5, leading=13,
                       textColor=colors.white, alignment=TA_LEFT)
st_td = ParagraphStyle("TD", fontName="FreeSerif", fontSize=9.5, leading=13.5,
                       textColor=TEXT_PRIMARY, alignment=TA_LEFT)
st_stat = ParagraphStyle("Stat", fontName="FreeSerif", fontSize=20, leading=24,
                         textColor=ACCENT, alignment=TA_CENTER)
st_stat_label = ParagraphStyle("StatLabel", fontName="FreeSerif", fontSize=8.5, leading=12,
                               textColor=TEXT_MUTED, alignment=TA_CENTER)
st_toc_title = ParagraphStyle("TocTitle", fontName="FreeSerif", fontSize=20, leading=26,
                              textColor=TEXT_PRIMARY, spaceAfter=14)
toc_l0 = ParagraphStyle("TOC0", fontName="FreeSerif", fontSize=11.5, leading=20, leftIndent=8)
toc_l1 = ParagraphStyle("TOC1", fontName="FreeSerif", fontSize=10, leading=16, leftIndent=28,
                        textColor=TEXT_MUTED)


# ---- Doc template with TOC support ----------------------------------------
class TocDocTemplate(SimpleDocTemplate):
    def afterFlowable(self, flowable):
        if hasattr(flowable, "bookmark_name"):
            level = getattr(flowable, "bookmark_level", 0)
            text = getattr(flowable, "bookmark_text", "")
            key = getattr(flowable, "bookmark_key", "")
            # Body pages display internal page number minus one (page 1 = TOC = i)
            self.notify("TOCEntry", (level, text, self.page - 1, key))


def header_footer(canvas, doc):
    canvas.saveState()
    # Header: doc title left + accent rule (skip on TOC page for calm look)
    if doc.page > 1:
        canvas.setFont("FreeSerif", 7.5)
        canvas.setFillColor(TEXT_MUTED)
        canvas.drawString(MARGIN, PAGE_H - 0.55 * inch, "SEO Audit and Local Search Report")
        canvas.drawRightString(PAGE_W - MARGIN, PAGE_H - 0.55 * inch, "Big Brother Guesthouse, Usakos")
        canvas.setStrokeColor(ACCENT)
        canvas.setLineWidth(1.2)
        canvas.line(MARGIN, PAGE_H - 0.62 * inch, PAGE_W - MARGIN, PAGE_H - 0.62 * inch)
    # Footer: bare page number only (roman i on the TOC page, Arabic resets at 1)
    label = "i" if doc.page == 1 else str(doc.page - 1)
    canvas.setFont("FreeSerif", 9)
    canvas.setFillColor(TEXT_MUTED)
    canvas.drawCentredString(PAGE_W / 2, 0.5 * inch, label)
    canvas.restoreState()


def heading(text, style, level=0):
    key = "h_" + hashlib.md5(text.encode()).hexdigest()[:8]
    p = Paragraph(f'<a name="{key}"/><b>{text}</b>', style)
    p.bookmark_name = key
    p.bookmark_level = level
    p.bookmark_text = text
    p.bookmark_key = key
    return p


def h1_block(text, first_para=None):
    """H1 with accent underline + orphan prevention, bound to first paragraph."""
    items = [
        CondPageBreak(H1_ORPHAN),
        heading(text, st_h1, level=0),
        HRFlowable(width="100%", color=ACCENT, thickness=1.4, spaceBefore=0, spaceAfter=10),
    ]
    if first_para is not None:
        return items[:1] + [KeepTogether(items[1:] + [first_para])]
    return items


def safe_keep_together(elements, max_h=A4[1] * 0.4):
    total = 0
    for el in elements:
        w, h = el.wrap(AVAIL_W, PAGE_H)
        total += h
    if total <= max_h:
        return [KeepTogether(elements)]
    if len(elements) >= 2:
        return [KeepTogether(elements[:2])] + list(elements[2:])
    return list(elements)


def make_table(headers, rows, ratios, caption=None, repeat=True):
    data = [[Paragraph(f"<b>{h}</b>", st_th) for h in headers]]
    for r in rows:
        data.append([Paragraph(c, st_td) for c in r])
    widths = [x * AVAIL_W for x in ratios]
    assert abs(sum(ratios) - 1.0) < 0.01, "ratios must sum to 1"
    t = Table(data, colWidths=widths, hAlign="CENTER", repeatRows=1 if repeat else 0)
    style = [
        ("BACKGROUND", (0, 0), (-1, 0), TABLE_HEADER_COLOR),
        ("TEXTCOLOR", (0, 0), (-1, 0), colors.white),
        ("GRID", (0, 0), (-1, -1), 0.5, BORDER),
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LEFTPADDING", (0, 0), (-1, -1), 7),
        ("RIGHTPADDING", (0, 0), (-1, -1), 7),
        ("TOPPADDING", (0, 0), (-1, -1), 6),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 6),
    ]
    for i in range(1, len(data)):
        style.append(("BACKGROUND", (0, i), (-1, i), colors.white if i % 2 == 1 else TABLE_ROW_ODD))
    t.setStyle(TableStyle(style))
    out = [Spacer(1, 14), t]
    if caption:
        out += [Spacer(1, 2), Paragraph(caption, st_caption), Spacer(1, 10)]
    else:
        out += [Spacer(1, 12)]
    return out


def stat_row(stats):
    """Three stat callout boxes side by side (data-to-ink rule)."""
    gap = 12
    box_w = (AVAIL_W - 2 * gap) / 3
    cells = []
    for value, label in stats:
        inner = Table(
            [[Paragraph(f"<b>{value}</b>", st_stat)], [Paragraph(label, st_stat_label)]],
            colWidths=[box_w],
        )
        inner.setStyle(TableStyle([
            ("BACKGROUND", (0, 0), (-1, -1), CARD_BG),
            ("BOX", (0, 0), (-1, -1), 1, ACCENT),
            ("TOPPADDING", (0, 0), (-1, 0), 10),
            ("BOTTOMPADDING", (0, 1), (-1, 1), 10),
            ("TOPPADDING", (0, 1), (-1, 1), 2),
            ("BOTTOMPADDING", (0, 0), (-1, 0), 2),
        ]))
        cells.append(inner)
    row = Table([cells], colWidths=[box_w + gap, box_w + gap, box_w],
                hAlign="CENTER")
    row.setStyle(TableStyle([
        ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
        ("LEFTPADDING", (0, 0), (-1, -1), 0),
        ("RIGHTPADDING", (0, 0), (0, 1), gap),
        ("RIGHTPADDING", (-1, 0), (-1, -1), 0),
        ("TOPPADDING", (0, 0), (-1, -1), 0),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 0),
    ]))
    return [Spacer(1, 8), row, Spacer(1, 14)]


def body(text):
    return Paragraph(text, st_body)


# ---- Story -----------------------------------------------------------------
story = []

# TOC (internal page 1, roman i)
story.append(Paragraph("<b>Table of contents</b>", st_toc_title))
toc = TableOfContents()
toc.levelStyles = [toc_l0, toc_l1]
story.append(toc)
story.append(PageBreak())

# 1. Executive summary -------------------------------------------------------
story += h1_block("1. Executive summary", body(
    "This report answers three questions for Big Brother Guesthouse: how the new website at "
    "bigbrotherguesthouse.com is doing in search, what was repaired during the audit of "
    "15 October 2026, and what should happen next. The short answer is that the site itself is in "
    "good shape. It loads quickly even on a weak mobile connection, every page carries proper "
    "titles and descriptions, and search engines are handed a clean sitemap, correct addresses and "
    "structured data describing the guesthouse, its rooms and the restaurant."))
story += stat_row([
    ("908 ms", "Largest Contentful Paint, live measurement (Google target: under 2,500 ms)"),
    ("0.00", "Cumulative Layout Shift, live measurement (Google target: under 0.10)"),
    ("106 KB", "Total home page transfer on a phone-sized screen, site budget 500 KB"),
])
story.append(body(
    "Most of the problems found during the audit were small, and every one of them was fixed the "
    "same day. The three that mattered most were duplicated brand text pushing page titles past "
    "Google's 60 character cut, missing social share tags on thirteen pages, and a footer link that "
    "pointed at a dead Namibia Tourism Board web address. All three repairs are already live on the "
    "production site, together with a corrected matangara photograph, a new section listing where "
    "to stay in and around Usakos when the guesthouse is full, and links to the guesthouse's "
    "verified listings on TripAdvisor, SafariNow and Google Maps."))
story.append(body(
    "What remains is work that only the owner can do, and none of it is technical. The single most "
    "valuable step is registering the free Google Search Console account and submitting the "
    "sitemap, because that is the only tool that shows exactly which searches bring guests to the "
    "site and which pages Google has not yet found. After that come two stale booking listings to "
    "freshen up, one broken website link in the restaurant's Google profile, and a handful of "
    "records and photographs the audit could not invent. Section 6 lists every item in order of "
    "value, with the effort each one takes."))

# 2. What we checked ----------------------------------------------------------
story += h1_block("2. What we checked and how the site scored", body(
    "The audit covered all nineteen pages of the site plus the machinery behind them: how the "
    "pages respond, how they redirect, what the sitemap and robots files say, how each page is "
    "titled and described, whether the structured data renders, how the pages behave at a 390 pixel "
    "phone width, how much data each page spends, and whether every image carries a useful "
    "description. Off the site, the audit searched the major booking platforms and directories for "
    "the guesthouse's listings, checked how the two business names are used in public, and looked "
    "at the Google Business Profiles for both the guesthouse and the restaurant."))
story += make_table(
    ["Area", "What was checked", "Verdict"],
    [
        ["Redirects and security", "HTTP to HTTPS, www redirects, HSTS header, 404 page", "Pass"],
        ["Sitemap and robots", "19 URLs listed on the correct www domain, robots points at the sitemap", "Pass"],
        ["Titles and descriptions", "Unique per page, under 60 and 155 characters", "Pass, after fix"],
        ["Canonical addresses", "Every page self-canonical, consistent www spelling", "Pass"],
        ["Structured data", "LodgingBusiness, Restaurant and Menu schema render on the live pages", "Pass, enriched"],
        ["Mobile behaviour", "390 px render: no horizontal scroll, one H1 per page", "Pass"],
        ["Speed and weight", "Live lab vitals and transfer size against the 500 KB budget", "Pass"],
        ["Images", "Alt text present, AVIF and WebP negotiation, lazy loading", "Pass"],
        ["Third-party listings", "Presence and accuracy on booking platforms and directories", "Mixed, see section 5"],
        ["Google Search Console", "Owner-side indexing tool", "Not yet set up, see section 6"],
    ],
    [0.24, 0.56, 0.20],
    caption="Table 1. Audit scorecard by area, checked 15 October 2026.")
story.append(body(
    "One technical note deserves a plain-language explanation. The site answers on two addresses, "
    "bigbrotherguesthouse.com and www.bigbrotherguesthouse.com, and the shorter one currently "
    "serves the pages directly instead of redirecting to the www version. Because every page "
    "carries a canonical tag pointing at the www version and the sitemap only lists www addresses, "
    "search engines will settle on the www version on their own. It is a small inefficiency rather "
    "than an error, and it can be tightened in the Vercel domain settings by redirecting the short "
    "address to the www one."))

# 3. Findings and fixes -------------------------------------------------------
story += h1_block("3. What was found and fixed on 15 October", body(
    "Every finding below was reproduced, fixed in the code, checked on a local production build, "
    "then published and re-verified on the live site the same day. Nothing on this list is waiting "
    "on a third party. The matangara correction came directly from the owner, who marked the live "
    "photo with a cross and confirmed that the dish shown was mopane worms and pap, while the real "
    "matangara photograph was the one an earlier round had removed."))
story += make_table(
    ["Finding", "Why it mattered", "What was done"],
    [
        ["Page titles carried a duplicated brand suffix, for example "
         "Rooms and Rates | Big Brother Guesthouse, Usakos | Big Brother, pushing them past the "
         "60 character cut",
         "Google truncates long titles in results, so the brand repeated and information was cut",
         "Removed the automatic template that appended the brand; every page now shows one clean "
         "title, verified on all nineteen pages"],
        ["Thirteen pages had no social share tags at all",
         "Links shared on WhatsApp and Facebook showed no preview image, title or description",
         "Added Open Graph and Twitter card tags to every page, with the guesthouse and restaurant "
         "photographs as the share images"],
        ["The footer trust link pointed at namibiatourism.com.na, which serves an empty hosting "
         "placeholder page",
         "A dead link on every page of the site, attached to the registration badge itself",
         "The badge now links to the board's own directory entry for the guesthouse at "
         "visitnamibia.com.na, verified live before the switch"],
        ["The Matangara and pap photo showed mopane worms",
         "A mislabelled dish on a page that sells food, marked by the owner with a cross",
         "Restored the owner's original matangara photograph, and the mopane worms photograph "
         "became its own card at its printed menu price of N$100"],
        ["The guesthouse page claimed rates are not published while the rooms page lists every rate",
         "Contradictory copy weakened trust in both pages",
         "The copy now points at the full rates table and the WhatsApp booking line"],
        ["Structured data lacked an alternate name and outbound profile links",
         "Search engines had a thinner picture of the business and its other homes on the web",
         "Added the alternate name Big Brother Guest House and sameAs links to the NTB directory "
         "and the TripAdvisor listing"],
    ],
    [0.34, 0.28, 0.38],
    caption="Table 2. Findings, impact and fixes, all live on 15 October 2026.")
story.append(body(
    "Verification was done in three passes, the same discipline as earlier rounds. First the "
    "repair was checked on a local production build, including a full-page render at 390 pixel "
    "phone width to confirm nothing shifted. Then the changes were pushed to GitHub, from where "
    "the hosting deploys automatically. Finally the live site was re-fetched and every marker "
    "confirmed: clean titles, share tags present, the new listings section, the corrected NTB link "
    "and both dish photographs serving correctly."))

# 4. Performance ---------------------------------------------------------------
story += h1_block("4. Speed: the measured numbers", body(
    "Speed was measured against the live production site with Chrome on a phone-sized screen on "
    "15 October 2026, after the fixes were deployed. These are laboratory measurements on a clean "
    "connection, which is the standard way to compare against Google's published thresholds; real "
    "guests on weak rural mobile data will see somewhat higher numbers, but the gap to the "
    "thresholds below is large enough that the site stays comfortably inside them."))
story += make_table(
    ["Measurement", "Result", "Google threshold", "Verdict"],
    [
        ["First Contentful Paint", "492 ms", "under 1,800 ms", "Excellent"],
        ["Largest Contentful Paint", "908 ms", "under 2,500 ms", "Excellent"],
        ["Cumulative Layout Shift", "0.00", "under 0.10", "Perfect"],
        ["Home page transfer", "97 to 106 KB", "site budget 500 KB", "Well under"],
        ["Requests per home load", "8 to 45", "no set target", "Lean"],
    ],
    [0.34, 0.20, 0.26, 0.20],
    caption="Table 3. Live laboratory vitals, mobile screen, 15 October 2026.")
story.append(body(
    "Two things stand behind these numbers and both are worth keeping as the site grows. The "
    "photographs are served in modern AVIF and WebP formats at exactly the size each screen needs, "
    "and the pages are delivered as static files from a content delivery network, so nothing is "
    "computed on the fly for a first-time visitor. As long as new photographs keep going through "
    "the same pipeline and no heavy scripts are added, the site will stay this fast. The 500 KB "
    "per page budget was set in the original build rules and the home page now uses roughly a "
    "fifth of it on a first load."))

# 5. Listings, NTB, competition ------------------------------------------------
story += h1_block("5. Listings, the NTB and the competition", body(
    "Search rankings for a guesthouse are only half the story: guests also find the property "
    "through booking platforms, map listings and directories, and those records must agree with "
    "the website. The audit searched the major platforms for the guesthouse under every spelling "
    "of the name and verified each hit by opening the page. Where a listing exists it is listed "
    "below with its state; where none exists, that is stated too, and no address was invented to "
    "fill a gap."))
story.append(heading("5.1 Where the guesthouse stands today", st_h2, level=1))
story += make_table(
    ["Platform", "What the listing shows", "State"],
    [
        ["Google Maps and Business Profile",
         "Correct name, Plot 7 address, +264 81 264 7606, website bigbrotherguesthouse.com, 42 reviews",
         "Healthy"],
        ["TripAdvisor",
         "Seven reviews and four photos, several years old, including one negative review never answered",
         "Owner should reply and refresh"],
        ["SafariNow",
         "A bookable page, but it shows three rooms, a wrong map pin and prices in rand",
         "Owner should update"],
        ["Namibia Tourism Board directory",
         "Official entry at visitnamibia.com.na, but contacts still show a 2017 landline and old email",
         "Ask the board to update"],
        ["Telecom online directory",
         "Correct name and current phone number",
         "Fine as is"],
        ["Agoda, Booking.com, Airbnb, Lekkeslaap",
         "No listing found under any spelling; absence verified on 15 October 2026",
         "Send the link if one exists"],
    ],
    [0.26, 0.52, 0.22],
    caption="Table 4. Verified listing inventory for Big Brother Guesthouse.")
story.append(heading("5.2 The NTB link back", st_h2, level=1))
story.append(body(
    "The owner asked for a link back to the Namibia Tourism Board, and the audit found something "
    "better than the link the site had. The old address, namibiatourism.com.na, currently serves "
    "an empty hosting placeholder, so the badge was pointing every visitor at a blank page. The "
    "board's real public establishment directory lives at visitnamibia.com.na, and the guesthouse "
    "has its own entry there. The footer badge now links to that entry, and the registration "
    "details, registration number GHO01094, the class, the approval and certificate dates and the "
    "section of the Tourism Board Act, remain available in the registration modal that opens from "
    "the guesthouse page."))
story.append(body(
    "One correction belongs here for honesty: the directory entry itself still shows a 2017 "
    "landline and an old email address, and the registration number is not displayed on the public "
    "entry. Both are worth one email to the board, because a guest who checks the directory should "
    "find the same numbers as on the website. The website deliberately shows the registration "
    "number from the owner's own certificate, which is the stronger trust signal either way."))
story.append(heading("5.3 The new when-we-are-full section", st_h2, level=1))
story.append(body(
    "The owner asked for a section about the competition for the case when Big Brother is full, "
    "and it is now live on the guesthouse page, with a cross-link from the booking page. It lists "
    "nine real, verified alternatives in three groups: the Bahnhof Hotel, Nubeb and Issa Guesthouse "
    "in town; Uitkyk Guest Farm, Carlo's Mountain Lodge and Achab Camping within fifteen minutes; "
    "and Hohenstein Lodge, Ameib and Spitzkoppe Cabin Camp for those heading towards the mountains. "
    "Every entry links to the establishment's own page, and every blurb was written from the "
    "research rather than copied."))
story.append(body(
    "This kind of section does three jobs at once. It catches guests the guesthouse cannot host, "
    "and a helpful answer to a full house is remembered far longer than a dead end. It gives "
    "search engines exactly the kind of honest local content they reward for phrases such as "
    "Usakos accommodation. And it makes the site a small hub for the town, which is the sort of "
    "page other local businesses link back to."))
story.append(heading("5.4 The two names", st_h2, level=1))
story.append(body(
    "The owner confirmed both trading names: Big Brother Guesthouse for the plot on the B2, and "
    "Big Brothers for the restaurant in town. The public record agrees. Every directory and "
    "platform uses Big Brother Guesthouse in the singular for the guesthouse, and the restaurant "
    "appears everywhere as Big Brothers Restaurant, which matches every physical sign. No business "
    "named Three Brothers exists in Usakos, so the earlier question about that spelling is closed. "
    "The spaced two-word form Big Brother Guest House appears in press articles, so it was added "
    "to the site's structured data as an alternate name, which lets search engines connect all the "
    "spellings to one business."))

# 6. Owner action list ----------------------------------------------------------
story += h1_block("6. Your action list", body(
    "Everything in this list needs the owner's accounts or the owner's knowledge; nothing here can "
    "be done from the website side. The items are ordered by value for the effort they take. The "
    "first one is by far the most important: Google Search Console is the only place that shows "
    "which searches actually bring guests to the site, which pages Google has indexed, and where "
    "errors appear, and it costs nothing but a Google account and half an hour."))
story += make_table(
    ["#", "Action", "Why it matters", "Effort"],
    [
        ["1", "Register Google Search Console for www.bigbrotherguesthouse.com and submit "
              "sitemap.xml",
         "Shows the searches that bring guests, the pages Google has found, and any errors; "
         "speeds up indexing of the new site",
         "About 30 minutes"],
        ["2", "Delete the old bigbrother-guesthouse.vercel.app project on the targis47 account",
         "Two live copies of the site split Google's attention; the old one still shows a "
         "pre-round-6 build",
         "5 minutes in the Vercel dashboard"],
        ["3", "Reply to the unanswered TripAdvisor review and refresh SafariNow with the real "
              "room count, photos and map pin",
         "These are the only two bookable third-party listings found; stale data costs bookings "
         "and an answered review is public customer care",
         "About 1 hour"],
        ["4", "In the restaurant's Google Business Profile, replace the dead website "
              "bigbrother-usakos.com with bigbrotherguesthouse.com/restaurant",
         "Hungry visitors searching the restaurant currently land on a broken page",
         "10 minutes"],
        ["5", "Email the Tourism Board to update the directory entry: new numbers, current email",
         "The board's own record still shows a 2017 landline and an old email address",
         "One email"],
        ["6", "Send the Agoda listing link if one exists",
         "No Agoda listing was found under any spelling of the name; nothing was invented to fill "
         "the gap, so the link must come from the owner",
         "One message"],
        ["7", "Rotate the GitHub and Vercel access tokens that appeared in the chat",
         "Both were pasted in plain text and used once; treat them as spent",
         "15 minutes"],
        ["8", "When ready: flip the Gofile folder with the new location photographs to public, "
              "send the tenth anniversary photographs, and confirm the restaurant's closing times",
         "The hero slideshow gets the new shots, the anniversary section gets its photos, and the "
         "hours line loses its open-ended wording",
         "As available"],
    ],
    [0.05, 0.30, 0.47, 0.18],
    caption="Table 5. Owner actions in priority order.")
story.append(body(
    "With the Search Console account set up and the two stale listings refreshed, the site has "
    "everything it needs to compete for the searches that matter to a B2 stopover: Usakos "
    "accommodation, guesthouse near Spitzkoppe, and a table in Usakos town. New domains typically "
    "take days to a few weeks to settle in search results, and the Search Console graphs will show "
    "the curve. The audit findings in this report were all verified live on the production site on "
    "15 October 2026, and the same checklist can be repeated after the next round of changes."))

# ---- Build -------------------------------------------------------------------
doc = TocDocTemplate(
    OUT,
    pagesize=A4,
    leftMargin=MARGIN,
    rightMargin=MARGIN,
    topMargin=MARGIN,
    bottomMargin=MARGIN,
    title=DOC_TITLE,
    author="Tangison Studio",
    creator="Z.ai",
    subject="SEO audit, listings inventory and owner action plan for Big Brother Guesthouse, Usakos",
)
doc.multiBuild(story, onFirstPage=header_footer, onLaterPages=header_footer)
print("body built:", OUT)
