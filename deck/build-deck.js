const pptxgen = require('pptxgenjs');
const p = new pptxgen();
p.layout = 'LAYOUT_WIDE';                 // 13.3 x 7.5
p.author = 'Adam Hickey';
p.title = 'Growing with Gritty — website plan for Kim';

// ── Gritty's own palette, approved in V1 ──────────────────────────────
const NAVY  = '1F4666';   // dominant
const BLUE  = '2C5F8A';
const GOLD  = 'D9A93F';   // sharp accent
const GOLDI = '8A6414';
const GREEN = '7FA86B';
const GREENI= '4E7140';
const SKY   = 'BDD7E7';
const PAPER = 'FAF6EC';
const WHITE = 'FFFFFF';
const INK   = '2A3238';
const SOFT  = '55606A';

const H = 'Cambria';      // headers — bookish, safe-list
const B = 'Calibri';      // body — safe-list

const W = 13.3, HT = 7.5, M = 0.7;
const shadow = () => ({ type: 'outer', color: '000000', blur: 14, offset: 3, angle: 90, opacity: 0.16 });

// small helpers
function darkSlide() { const s = p.addSlide(); s.background = { color: NAVY }; return s; }
function lightSlide() { const s = p.addSlide(); s.background = { color: WHITE }; return s; }
function title(s, text, color) {
  s.addText(text, { x: M, y: 0.52, w: W - M * 2, h: 0.9, fontFace: H, fontSize: 34, bold: true,
                    color: color || NAVY, margin: 0 });
}
// the repeated motif: a numbered/emoji token in a filled circle
function token(s, x, y, glyph, fill, txtColor, size) {
  const d = size || 0.62;
  s.addShape(p.ShapeType.ellipse, { x, y, w: d, h: d, fill: { color: fill }, shadow: shadow() });
  s.addText(glyph, { x, y, w: d, h: d, align: 'center', valign: 'middle', fontFace: H,
                     fontSize: glyph.length > 2 ? 13 : (d > 0.7 ? 20 : 15), bold: true, color: txtColor || WHITE, margin: 0 });
}
function card(s, x, y, w, h, fill) {
  s.addShape(p.ShapeType.roundRect, { x, y, w, h, rectRadius: 0.12,
    fill: { color: fill || PAPER }, shadow: shadow() });
}

/* ══ 1 · TITLE ══════════════════════════════════════════════════════ */
{
  const s = darkSlide();
  s.addImage({ path: 'gritty.png', x: 8.9, y: 1.15, w: 3.55, h: 4.34 });
  s.addText('Growing with Gritty', { x: M, y: 1.75, w: 8.0, h: 1.1, fontFace: H, fontSize: 46,
    bold: true, color: WHITE, margin: 0 });
  s.addText('Your website — where it stands, and what happens next', {
    x: M, y: 2.85, w: 7.6, h: 0.6, fontFace: B, fontSize: 18, color: SKY, margin: 0 });
  s.addShape(p.ShapeType.roundRect, { x: M, y: 3.75, w: 4.35, h: 0.62, rectRadius: 0.31,
    fill: { color: GREEN } });
  s.addText('Build Grit. Grow Strong. Never Quit!', { x: M, y: 3.75, w: 4.35, h: 0.62,
    align: 'center', valign: 'middle', fontFace: H, fontSize: 14, bold: true, color: WHITE, margin: 0 });
  s.addText('Prepared by Adam  ·  All character art by Kim Rekowski', {
    x: M, y: 6.35, w: 7.5, h: 0.4, fontFace: B, fontSize: 12, color: SKY, margin: 0 });
  s.addNotes('Goal today: show Kim the three directions, explain why V3, agree next steps, and collect what I need — the drawings and the domain details.');
}

/* ══ 2 · WHAT I DID ═════════════════════════════════════════════════ */
{
  const s = lightSlide();
  title(s, 'What I’ve done so far');
  const items = [
    ['3', 'Three full design versions', 'Each one built and clickable, not a mockup — so you can react to something real.', BLUE],
    ['20+', 'Sites and studies reviewed', 'The best children’s book sites in the world, and what child-development research says actually works.', GOLD],
    ['9', 'Pages already built', 'Home, Meet Gritty, a page for each of your four books, About You, and the Grown-Up Grit Guide.', GREEN]
  ];
  let y = 1.75;
  items.forEach(([n, head, body, c]) => {
    token(s, M, y, n, c, WHITE, 0.72);
    s.addText(head, { x: M + 1.05, y: y - 0.06, w: 10.6, h: 0.42, valign: 'top', fontFace: H,
      fontSize: 20, bold: true, color: NAVY, margin: 0 });
    s.addText(body, { x: M + 1.05, y: y + 0.4, w: 10.6, h: 0.62, valign: 'top', fontFace: B,
      fontSize: 15, color: SOFT, margin: 0 });
    y += 1.42;
  });
  card(s, M, 5.95, W - M * 2, 0.85, PAPER);
  s.addText('Nothing is decided. You pick the direction — and mixing pieces from different versions is a perfectly good answer.',
    { x: M + 0.3, y: 5.95, w: W - M * 2 - 0.6, h: 0.85, valign: 'middle', fontFace: B,
      fontSize: 15, italic: true, color: GOLDI, margin: 0 });
  s.addNotes('Emphasize: everything is built and live at a link she can click on her phone.');
}

/* ══ 3 · THE THREE VERSIONS ═════════════════════════════════════════ */
{
  const s = lightSlide();
  title(s, 'Three directions I built for you');
  const cols = [
    ['v1-card.jpg', 'Version 1', 'The Sheet', 'A calm sample page: your colors, your lettering, one book card. Everything sits still.', SOFT],
    ['v2-card.jpg', 'Version 2', 'The Meadow', 'The page becomes a place. Gritty stands in a meadow and reacts when children tap him.', BLUE],
    ['v3-card.jpg', 'Version 3', 'Alive', 'Gritty breathes and his lines shimmer like hand-drawn animation. Every activity rebuilt around the research.', GREENI]
  ];
  const cw = 3.687, gap = 0.42;
  cols.forEach(([img, ver, name, body, c], i) => {
    const x = M + i * (cw + gap);
    card(s, x, 1.62, cw, 4.45, i === 2 ? PAPER : WHITE);
    if (i === 2) s.addShape(p.ShapeType.roundRect, { x, y: 1.62, w: cw, h: 4.45, rectRadius: 0.12,
      fill: { color: PAPER }, line: { color: GOLD, width: 2.5 } });
    s.addImage({ path: img, x: x + 0.22, y: 1.84, w: cw - 0.44, h: 1.91 });
    s.addText(ver, { x: x + 0.22, y: 3.86, w: cw - 0.44, h: 0.3, fontFace: B, fontSize: 12,
      bold: true, color: c, charSpacing: 1.5, margin: 0 });
    s.addText(name, { x: x + 0.22, y: 4.14, w: cw - 0.44, h: 0.45, fontFace: H, fontSize: 23,
      bold: true, color: NAVY, margin: 0 });
    s.addText(body, { x: x + 0.22, y: 4.66, w: cw - 0.44, h: 1.6, valign: 'top', fontFace: B,
      fontSize: 14, color: SOFT, margin: 0 });
  });
  s.addShape(p.ShapeType.roundRect, { x: M + 2 * (cw + gap) + cw - 1.62, y: 1.42, w: 1.5, h: 0.42,
    rectRadius: 0.21, fill: { color: GOLD } });
  s.addText('MY PICK', { x: M + 2 * (cw + gap) + cw - 1.62, y: 1.42, w: 1.5, h: 0.42,
    align: 'center', valign: 'middle', fontFace: B, fontSize: 11, bold: true, color: WHITE,
    charSpacing: 1.2, margin: 0 });
  s.addText('All three are live — you can click between them at the top of any page.',
    { x: M, y: 6.25, w: W - M * 2, h: 0.4, fontFace: B, fontSize: 13, italic: true, color: SOFT, margin: 0 });
  s.addNotes('Open all three on the laptop here. Let her tap Gritty on V3.');
}

/* ══ 4 · WHY V3 ═════════════════════════════════════════════════════ */
{
  const s = lightSlide();
  title(s, 'Why the research changed my mind');
  s.addText('Three things I built into Version 2 turned out to work against your books. Version 3 undoes them.',
    { x: M, y: 1.5, w: 11.5, h: 0.4, fontFace: B, fontSize: 15, color: SOFT, margin: 0 });
  const rows = [
    ['Sticker charts that show what you haven’t earned yet',
     'Locked grey stickers actually reduce a child’s own motivation. Now stickers only appear for what a child has already done — souvenirs, never a scoreboard.'],
    ['Rewarding a child for pressing “YET”',
     'The moment encouragement pays out, it becomes a transaction. Pressing YET now earns nothing at all.'],
    ['“YET!” on its own',
     'Carol Dweck calls effort-praise with no strategy “false growth mindset.” Now Gritty names the real thing — “you can’t tie your laces… yet” — and offers one idea to try.']
  ];
  let y = 2.12;
  rows.forEach(([head, body], i) => {
    card(s, M, y, W - M * 2, 1.42, PAPER);
    token(s, M + 0.32, y + 0.36, String(i + 1), GOLDI, WHITE, 0.55);
    s.addText(head, { x: M + 1.1, y: y + 0.2, w: 10.5, h: 0.38, valign: 'top', fontFace: H,
      fontSize: 17, bold: true, color: NAVY, margin: 0 });
    s.addText(body, { x: M + 1.1, y: y + 0.62, w: 10.5, h: 0.7, valign: 'top', fontFace: B,
      fontSize: 14, color: SOFT, margin: 0 });
    y += 1.6;
  });
  s.addNotes('The point for Kim: this is not decoration, it is the difference between a site that supports the books and one that quietly undermines them.');
}

/* ══ 5 · THE EVIDENCE (dark) ════════════════════════════════════════ */
{
  const s = darkSlide();
  title(s, 'What the research actually says', WHITE);
  s.addText('These are large studies, not opinions — and they shaped real decisions on your site.',
    { x: M, y: 1.5, w: 11.5, h: 0.4, fontFace: B, fontSize: 15, color: SKY, margin: 0 });
  const stats = [
    ['128', 'experiments', 'showed promised rewards reduce children’s own motivation.', GOLD],
    ['1,978', 'children', 'showed tap-to-play features do nothing for story understanding — games made it worse.', SKY],
    ['43', 'studies', 'found the harm falls hardest on children with least support at home.', 'A8CE92']
  ];
  const cw = 3.687, gap = 0.42;
  stats.forEach(([big, unit, body, c], i) => {
    const x = M + i * (cw + gap);
    s.addShape(p.ShapeType.roundRect, { x, y: 2.18, w: cw, h: 3.0, rectRadius: 0.12,
      fill: { color: '2A567C' } });
    s.addText(big, { x: x + 0.28, y: 2.42, w: cw - 0.56, h: 1.0, fontFace: H, fontSize: 52,
      bold: true, color: c, margin: 0 });
    s.addText(unit, { x: x + 0.28, y: 3.42, w: cw - 0.56, h: 0.32, fontFace: B, fontSize: 13,
      bold: true, color: WHITE, charSpacing: 1.4, margin: 0 });
    s.addText(body, { x: x + 0.28, y: 3.82, w: cw - 0.56, h: 1.2, fontFace: B, fontSize: 14,
      color: SKY, margin: 0 });
  });
  s.addShape(p.ShapeType.roundRect, { x: M, y: 5.5, w: W - M * 2, h: 1.1, rectRadius: 0.12,
    fill: { color: GOLD } });
  s.addText('This is a claim you can make that no competitor can: “there’s nothing to tap during the story — and here’s the research why.” Teachers forward that.',
    { x: M + 0.35, y: 5.5, w: W - M * 2 - 0.7, h: 1.1, valign: 'middle', fontFace: B,
      fontSize: 15, bold: true, color: '4A3405', margin: 0 });
  s.addNotes('Character Lab — Angela Duckworth’s grit organization — shut down in 2024. The parents and teachers who used it have nowhere to go. That gap is an opening for Gritty.');
}

/* ══ 6 · GRITTY COMES ALIVE ═════════════════════════════════════════ */
{
  const s = lightSlide();
  title(s, 'Your drawing, brought to life');
  s.addImage({ path: 'yet.jpg', x: 6.85, y: 1.62, w: 5.75, h: 2.86 });
  s.addText('On Version 3, Gritty breathes, and his outline shimmers the way hand-inked cartoons do — all from the single drawing you already gave me. Nothing was redrawn by a computer.',
    { x: M, y: 1.62, w: 5.8, h: 1.3, fontFace: B, fontSize: 15, color: SOFT, margin: 0 });
  card(s, M, 3.05, 5.8, 2.5, PAPER);
  s.addText('What I’d love you to draw', { x: M + 0.32, y: 3.25, w: 5.2, h: 0.4,
    fontFace: H, fontSize: 18, bold: true, color: NAVY, margin: 0 });
  s.addText([
    { text: 'Gritty with his eyes closed — just the two eyes, so he can blink', options: { bullet: true, breakLine: true } },
    { text: 'Trace your own Gritty twice, as close as you can — that makes his lines shimmer for real', options: { bullet: true, breakLine: true } },
    { text: 'That’s it. Two small things.', options: { bullet: false } }
  ], { x: M + 0.32, y: 3.7, w: 5.2, h: 1.7, valign: 'top', fontFace: B, fontSize: 14, color: SOFT,
       paraSpaceAfter: 6, margin: 0 });
  s.addImage({ path: 'shelf.jpg', x: 6.85, y: 4.72, w: 5.75, h: 2.06 });
  s.addText('Blinking is the single strongest sign of life a character can have — old animation studios cut arms and legs from cartoons so they could afford to animate the eyes.',
    { x: M, y: 5.75, w: 5.8, h: 1.0, fontFace: B, fontSize: 13, italic: true, color: GOLDI, margin: 0 });
  s.addNotes('Reassure her: no AI-generated Gritty, ever. If a pose is needed, we ask her to draw it.');
}

/* ══ 7 · WHAT'S BUILT ═══════════════════════════════════════════════ */
{
  const s = lightSlide();
  title(s, 'The site itself is already built');
  s.addText('Nine working pages, waiting on your final artwork and buy links.',
    { x: M, y: 1.5, w: 11.5, h: 0.4, fontFace: B, fontSize: 15, color: SOFT, margin: 0 });
  const pages = [
    ['🏡', 'Home', 'Gritty welcomes visitors, the four values, all four books'],
    ['🐐', 'Meet Gritty', 'Gritty and his whole family, and “what is grit?”'],
    ['📚', 'Your books', 'One page per book — story, lesson, characters, a grit challenge'],
    ['☕', 'Grown-Up Grit Guide', 'Free printables and conversation starters for parents and teachers'],
    ['✍️', 'About you', 'Your story as a teacher, author and illustrator'],
    ['🔒', 'Nothing collected', 'No sign-ups, no ads, no tracking — anywhere on the site']
  ];
  const cw = 3.687, ch = 1.72, gap = 0.42;
  pages.forEach(([icon, head, body], i) => {
    const x = M + (i % 3) * (cw + gap), y = 2.15 + Math.floor(i / 3) * (ch + 0.45);
    card(s, x, y, cw, ch, i === 5 ? PAPER : WHITE);
    if (i === 5) s.addShape(p.ShapeType.roundRect, { x, y, w: cw, h: ch, rectRadius: 0.12,
      fill: { color: PAPER }, line: { color: GREEN, width: 2 } });
    token(s, x + 0.26, y + 0.26, icon, i === 5 ? GREEN : SKY, i === 5 ? WHITE : NAVY, 0.5);
    s.addText(head, { x: x + 0.86, y: y + 0.17, w: cw - 1.0, h: 0.38, valign: 'middle',
      fontFace: H, fontSize: 15, bold: true, color: NAVY, margin: 0 });
    s.addText(body, { x: x + 0.26, y: y + 0.66, w: cw - 0.52, h: 0.62, fontFace: B, fontSize: 12.5,
      color: SOFT, margin: 0 });
  });
  s.addText('It is not on the internet yet — that happens when you’re happy with the look and we point the web address at it.',
    { x: M, y: 6.35, w: 11.5, h: 0.5, fontFace: B, fontSize: 14, italic: true, color: SOFT, margin: 0 });
  s.addNotes('Phase 1 is done. Phase 2 is Gritty’s World — the activities.');
}

/* ══ 8 · HOW KIM UPDATES IT ═════════════════════════════════════════ */
{
  const s = lightSlide();
  title(s, 'How you’ll change things yourself');
  s.addText('No code, ever. You fill in a form on a web page, press Save, and the site updates in about two minutes.',
    { x: M, y: 1.5, w: 11.5, h: 0.4, fontFace: B, fontSize: 15, color: SOFT, margin: 0 });
  const steps = [
    ['1', 'Open one bookmark', 'A page called Pages CMS. You sign in once and never think about it again.'],
    ['2', 'Pick what to change', 'A simple list down the side: Books, Characters, Printables, Home page, About.'],
    ['3', 'Type in the boxes', 'Same as filling in a form. Upload a PDF or a drawing by dragging it in.'],
    ['4', 'Press Save', 'Two minutes later it’s live for everyone. Every version is kept, so nothing is ever lost.']
  ];
  let y = 2.12;
  steps.forEach(([n, head, body]) => {
    token(s, M, y, n, BLUE, WHITE, 0.62);
    s.addText(head, { x: M + 0.95, y: y - 0.02, w: 10.8, h: 0.36, fontFace: H, fontSize: 18,
      bold: true, color: NAVY, margin: 0 });
    s.addText(body, { x: M + 0.95, y: y + 0.36, w: 10.8, h: 0.42, fontFace: B, fontSize: 14,
      color: SOFT, margin: 0 });
    y += 1.05;
  });
  card(s, M, 6.18, W - M * 2, 0.72, PAPER);
  s.addText('You can’t break it. A half-finished form just doesn’t show that bit yet — and any change can be undone.',
    { x: M + 0.3, y: 6.18, w: W - M * 2 - 0.6, h: 0.72, valign: 'middle', fontFace: B,
      fontSize: 14, bold: true, color: GREENI, margin: 0 });
  s.addNotes('Things she can change herself: buy links, new books, character portraits, printables, all the words on the home and about pages, and new Grit Zone questions.');
}

/* ══ 9 · THE DOMAIN ═════════════════════════════════════════════════ */
{
  const s = lightSlide();
  title(s, 'The web address: polkadotbackpack.com');
  s.addShape(p.ShapeType.roundRect, { x: M, y: 1.48, w: W - M * 2, h: 0.85, rectRadius: 0.12,
    fill: { color: 'FCF3D9' }, line: { color: GOLD, width: 2 } });
  s.addText('Heads up — that address is already in use. It currently points at a Shopify store, and www points somewhere different again. So before anything moves, I need to know what’s there.',
    { x: M + 0.32, y: 1.48, w: W - M * 2 - 0.64, h: 0.85, valign: 'middle', fontFace: B,
      fontSize: 14.5, color: GOLDI, margin: 0 });
  s.addText('What I need from you', { x: M, y: 2.55, w: 5.8, h: 0.4, fontFace: H, fontSize: 20,
    bold: true, color: NAVY, margin: 0 });
  s.addText([
    { text: 'Where did you buy it? (GoDaddy, Namecheap, Shopify…)', options: { bullet: true, breakLine: true } },
    { text: 'The login for that account — or you drive and I’ll talk you through it', options: { bullet: true, breakLine: true } },
    { text: 'What’s on the Shopify store now, and is it staying?', options: { bullet: true, breakLine: true } },
    { text: 'Do you want an email address there, like kim@polkadotbackpack.com?', options: { bullet: true } }
  ], { x: M, y: 3.0, w: 5.8, h: 2.2, valign: 'top', fontFace: B, fontSize: 14, color: SOFT, paraSpaceAfter: 8, margin: 0 });
  s.addText('The choice to make', { x: 6.95, y: 2.55, w: 5.65, h: 0.4, fontFace: H, fontSize: 20,
    bold: true, color: NAVY, margin: 0 });
  const opts = [
    ['A', 'Gritty takes the main address', 'polkadotbackpack.com becomes the book site; the shop moves to shop.polkadotbackpack.com', GREEN],
    ['B', 'Gritty gets its own address', 'The store stays exactly as it is, and the books live somewhere like growingwithgritty.com', BLUE]
  ];
  let y = 3.12;
  opts.forEach(([letter, head, body, c]) => {
    card(s, 6.95, y, 5.65, 1.35, WHITE);
    s.addShape(p.ShapeType.roundRect, { x: 6.95, y, w: 5.65, h: 1.35, rectRadius: 0.12,
      fill: { color: WHITE }, line: { color: c, width: 2 } });
    token(s, 7.2, y + 0.24, letter, c, WHITE, 0.52);
    s.addText(head, { x: 7.85, y: y + 0.18, w: 4.55, h: 0.34, fontFace: H, fontSize: 15.5,
      bold: true, color: NAVY, margin: 0 });
    s.addText(body, { x: 7.85, y: y + 0.56, w: 4.55, h: 0.66, fontFace: B, fontSize: 12.5,
      color: SOFT, margin: 0 });
    y += 1.55;
  });
  s.addText('Once that’s decided the technical side is about twenty minutes, and the site gets a padlock (https) automatically — free, forever.',
    { x: M, y: 6.5, w: 11.5, h: 0.5, fontFace: B, fontSize: 13.5, italic: true, color: SOFT, margin: 0 });
  s.addNotes('Technical detail for me, not the slide: apex resolves to 23.227.38.65 (Shopify), www to 23.92.26.113. Cloudflare Pages needs either nameserver delegation or a CNAME. Update astro.config.mjs site URL once decided.');
}

/* ══ 10 · WHAT I NEED ═══════════════════════════════════════════════ */
{
  const s = lightSlide();
  title(s, 'What I need from you');
  const groups = [
    ['🎨', 'Drawings', ['Gritty with closed eyes (just the eyes)', 'Two traces of your own Gritty', 'Portraits of Grandpa, Gabby, Grandma, Gibby', 'Photos of your book pages, inside'], BLUE],
    ['📝', 'Words & files', ['Where people buy each book', 'Your first coloring pages as PDFs', 'Anything you’d change in the words I wrote'], GREEN],
    ['🤔', 'Decisions', ['Which version you like — or which bits of each', 'What happens to the Shopify store', 'Whether you want school-visit info on the site'], BLUE]
  ];
  const cw = 3.687, gap = 0.42;
  groups.forEach(([icon, head, list, c], i) => {
    const x = M + i * (cw + gap);
    card(s, x, 1.72, cw, 4.15, PAPER);
    token(s, x + 0.28, 1.98, icon, c, WHITE, 0.6);
    s.addText(head, { x: x + 1.0, y: 2.04, w: cw - 1.2, h: 0.42, fontFace: H, fontSize: 19,
      bold: true, color: NAVY, margin: 0 });
    s.addText(list.map((t, j) => ({ text: t, options: { bullet: true, breakLine: j < list.length - 1 } })),
      { x: x + 0.28, y: 2.78, w: cw - 0.56, h: 3.0, valign: 'top', fontFace: B, fontSize: 13.5,
        color: SOFT, paraSpaceAfter: 8, margin: 0 });
  });
  s.addText('None of it is urgent, and none of it has to arrive together. Send things as you finish them.',
    { x: M, y: 6.2, w: 11.5, h: 0.5, fontFace: B, fontSize: 14, italic: true, color: SOFT, margin: 0 });
  s.addNotes('Do not let the list feel like homework. Closed eyes is the one that matters most.');
}

/* ══ 11 · NEXT STEPS (dark close) ═══════════════════════════════════ */
{
  const s = darkSlide();
  title(s, 'What happens next', WHITE);
  const steps = [
    ['Now', 'You pick a direction', 'Look at all three on your phone. Tell me what feels right and what doesn’t.', GOLD],
    ['Then', 'I finish the look', 'I apply your choice across every page and send it back to you.', SKY],
    ['Next', 'We sort the address', 'Twenty minutes together to point polkadotbackpack.com where we agree.', SKY],
    ['Then', 'You get the keys', 'I set up your editing page and walk you through it once on a call.', SKY],
    ['After', 'Gritty’s World', 'The activities — the Grit Zone, the Calm Corner, the Power of YET.', 'A8CE92']
  ];
  let y = 1.72;
  steps.forEach(([when, head, body, c]) => {
    s.addShape(p.ShapeType.roundRect, { x: M, y, w: 1.15, h: 0.44, rectRadius: 0.22, fill: { color: c } });
    s.addText(when, { x: M, y, w: 1.15, h: 0.44, align: 'center', valign: 'middle', fontFace: B,
      fontSize: 12, bold: true, color: c === GOLD ? '4A3405' : NAVY, margin: 0 });
    s.addText(head, { x: M + 1.42, y: y - 0.04, w: 3.5, h: 0.4, fontFace: H, fontSize: 18,
      bold: true, color: WHITE, margin: 0 });
    s.addText(body, { x: M + 4.95, y: y - 0.06, w: 6.95, h: 0.5, valign: 'top', fontFace: B,
      fontSize: 14, color: SKY, margin: 0 });
    y += 0.92;
  });
  s.addShape(p.ShapeType.roundRect, { x: M, y: 6.15, w: W - M * 2, h: 0.8, rectRadius: 0.12,
    fill: { color: '2A567C' } });
  s.addText('“There’s no hurry. Gritty will be here.”', { x: M, y: 6.15, w: W - M * 2, h: 0.8,
    align: 'center', valign: 'middle', fontFace: H, fontSize: 19, italic: true, color: SKY, margin: 0 });
  s.addNotes('Close by opening V3 on her phone and letting her press YET.');
}

p.writeFile({ fileName: 'Growing-with-Gritty-for-Kim.pptx' })
  .then(f => console.log('wrote', f));
