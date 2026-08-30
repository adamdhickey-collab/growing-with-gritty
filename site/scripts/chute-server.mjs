#!/usr/bin/env node
/**
 * The image chute, as a page you drop files onto.
 *
 *   npm run chute        →  http://localhost:4322
 *
 * Drag pictures from the Desktop (or paste one from the clipboard), say
 * which folder they belong in, and they are converted to webp and filed
 * under public/images — the same rules as the command line, since both call
 * landImage(). Nothing is committed: look at the diff, then commit.
 *
 * Local only. It binds to 127.0.0.1, so nothing outside this Mac can reach
 * it, and it writes only inside public/images.
 *
 * This is Adam's tool. Kim's route is the Pages CMS media uploader, which is
 * a real URL she can use from anywhere — see site/README.md.
 */
import http from 'node:http';
import { landImage, folders, slug, ChuteError, MAX_WIDTH } from './lib/land-image.mjs';

const PORT = Number(process.env.PORT) || 4322;
const LIMIT = 40 * 1024 * 1024; // a 40MB scan is already far past anything useful

const PAGE = `<!doctype html>
<html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Image chute — Growing with Gritty</title>
<style>
  :root {
    --paper:#FAF6EC; --card:#fff; --blue:#2C5F8A; --blue-deep:#1F4666;
    --green:#7FA86B; --green-ink:#4E7140; --gold:#D9A93F; --gold-ink:#8A6414;
    --sky:#BDD7E7; --ink:#2A3238; --soft:#55606A; --radius:18px;
  }
  * { box-sizing:border-box; margin:0; }
  body { background:var(--paper); color:var(--ink); padding:32px 20px 64px;
         font:16px/1.6 system-ui,-apple-system,"Segoe UI",sans-serif; }
  .wrap { max-width:820px; margin:0 auto; }
  h1 { font-size:1.7rem; color:var(--blue-deep); letter-spacing:-.01em; }
  .sub { color:var(--soft); margin:6px 0 24px; }
  .sub code { background:#fff; padding:2px 7px; border-radius:6px; font-size:.88em; }

  #zone { border:3px dashed var(--sky); border-radius:var(--radius); background:#fff;
          padding:48px 24px; text-align:center; cursor:pointer; transition:.15s; }
  #zone:hover, #zone.over { border-color:var(--gold); background:#FFFDF4; }
  #zone.over { transform:scale(1.01); }
  #zone b { display:block; font-size:1.2rem; color:var(--blue); margin-bottom:4px; }
  #zone span { color:var(--soft); font-size:.94rem; }

  .card { background:var(--card); border:1px solid rgba(42,50,56,.1); border-radius:var(--radius);
          box-shadow:0 10px 24px -18px rgba(44,95,138,.5); padding:16px; margin-top:16px;
          display:grid; grid-template-columns:104px 1fr; gap:16px; align-items:start; }
  .thumb { width:104px; height:104px; border-radius:12px; object-fit:cover;
           background:var(--sky); }
  .fields { display:flex; flex-wrap:wrap; gap:8px; align-items:center; }
  .fields label { font-size:.8rem; font-weight:700; color:var(--soft);
                  text-transform:uppercase; letter-spacing:.08em; width:100%; }
  select, input[type=text], input[type=number] {
    font:inherit; font-size:.95rem; padding:9px 12px; border:2px solid var(--sky);
    border-radius:10px; background:#fff; color:var(--ink); min-height:42px; }
  input[type=text] { flex:1; min-width:150px; }
  input[type=number] { width:96px; }
  select:focus, input:focus { outline:3px solid var(--gold); outline-offset:1px; }
  .slash { color:var(--soft); }
  .name { font-weight:600; color:var(--blue-deep); word-break:break-all; }
  .meta { color:var(--soft); font-size:.88rem; }

  button { font:inherit; font-weight:600; cursor:pointer; border:none; border-radius:999px;
           padding:10px 22px; min-height:44px; background:var(--blue); color:#fff;
           transition:.15s; }
  button:hover { background:var(--blue-deep); }
  button:disabled { opacity:.5; cursor:default; }
  button.gold { background:var(--gold); color:#3a2a06; }
  button.ghost { background:transparent; color:var(--blue); border:2px solid var(--blue); }
  .row { display:flex; gap:10px; align-items:center; flex-wrap:wrap; margin-top:12px; }

  .done { border-color:var(--green); background:#F7FBF4; }
  .done .ok { color:var(--green-ink); font-weight:700; }
  .fail { border-color:var(--gold-ink); background:#FFFDF4; }
  .fail .msg { color:var(--gold-ink); font-weight:600; }
  .hint { color:var(--soft); font-size:.9rem; }
  code.url { background:var(--paper); border:1px solid var(--sky); padding:5px 10px;
             border-radius:8px; font-size:.9rem; user-select:all; }
  .foot { margin-top:34px; color:var(--soft); font-size:.9rem; }
</style></head>
<body><div class="wrap">
  <h1>Image chute</h1>
  <p class="sub">Drop pictures here and they land in <code>site/public/images/</code>,
     converted to webp and sized for the web. Nothing is committed —
     look at the diff, then commit.</p>

  <div id="zone" tabindex="0" role="button" aria-label="Drop images, or click to choose files">
    <b>Drop images here</b>
    <span>or click to choose &middot; or paste one with &#8984;V</span>
  </div>
  <input id="file" type="file" accept="image/*" multiple hidden>

  <div id="list"></div>

  <p class="foot">Running from <code>npm run chute</code>. Close the terminal to stop it.
     Kim uploads through Pages CMS instead — same folder, real URL.</p>
</div>

<script>
var FOLDERS = __FOLDERS__;
var MAXW = __MAXW__;
var zone = document.getElementById('zone');
var picker = document.getElementById('file');
var list = document.getElementById('list');

zone.addEventListener('click', function(){ picker.click(); });
zone.addEventListener('keydown', function(e){
  if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); picker.click(); }
});
picker.addEventListener('change', function(){ add(picker.files); picker.value = ''; });
['dragenter','dragover'].forEach(function(t){
  zone.addEventListener(t, function(e){ e.preventDefault(); zone.classList.add('over'); });
});
['dragleave','drop'].forEach(function(t){
  zone.addEventListener(t, function(e){ e.preventDefault(); zone.classList.remove('over'); });
});
zone.addEventListener('drop', function(e){ add(e.dataTransfer.files); });
document.addEventListener('paste', function(e){
  var f = [].slice.call(e.clipboardData.files);
  if (f.length) add(f);
});

function slug(s){
  return s.replace(/\\.[^.]+$/, '').toLowerCase()
    .replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '') || 'untitled';
}

function add(files){
  [].slice.call(files).forEach(function(file){
    if (!/^image\\//.test(file.type) && !/\\.(heic|heif|tiff?)$/i.test(file.name)) return;
    card(file);
  });
}

function card(file){
  var el = document.createElement('div');
  el.className = 'card';

  var img = document.createElement('img');
  img.className = 'thumb';
  img.alt = '';
  img.src = URL.createObjectURL(file);
  el.appendChild(img);

  var body = document.createElement('div');
  var opts = FOLDERS.map(function(f){
    return '<option value="' + f + '">' + f + '/</option>';
  }).join('');
  body.innerHTML =
    '<p class="name">' + file.name + '</p>' +
    '<p class="meta">' + (file.size/1048576).toFixed(2) + ' MB</p>' +
    '<div class="fields" style="margin-top:10px">' +
      '<label>Where it lands</label>' +
      '<select class="folder">' + opts + '<option value="__new">new folder…</option></select>' +
      '<input class="newfolder" type="text" placeholder="folder name" hidden>' +
      '<span class="slash">/</span>' +
      '<input class="nm" type="text" value="' + slug(file.name) + '">' +
      '<span class="slash">.webp</span>' +
    '</div>' +
    '<div class="fields" style="margin-top:10px">' +
      '<label>Width</label>' +
      '<input class="w" type="number" value="' + MAXW + '" min="80" max="4000" step="20">' +
      '<span class="hint">pixels — it is only ever shrunk, never enlarged</span>' +
    '</div>' +
    '<div class="row"><button class="go">Add to the site</button>' +
    '<span class="status hint"></span></div>';
  el.appendChild(body);
  list.prepend(el);

  var sel = body.querySelector('.folder');
  var nf = body.querySelector('.newfolder');
  sel.addEventListener('change', function(){
    nf.hidden = sel.value !== '__new';
    if (!nf.hidden) nf.focus();
  });

  body.querySelector('.go').addEventListener('click', function(){ send(false); });

  function send(replace){
    var btn = body.querySelector('.go');
    var status = body.querySelector('.status');
    var folder = sel.value === '__new' ? nf.value.trim() : sel.value;
    var nm = body.querySelector('.nm').value.trim();
    if (!folder) { status.textContent = 'Name the folder first.'; return; }
    if (!nm) { status.textContent = 'Give it a name first.'; return; }
    btn.disabled = true;
    status.textContent = 'Converting…';
    var q = '?name=' + encodeURIComponent(folder + '/' + nm) +
            '&width=' + encodeURIComponent(body.querySelector('.w').value) +
            (replace ? '&replace=1' : '');
    fetch('/add' + q, { method: 'PUT', body: file })
      .then(function(r){ return r.json().then(function(j){ return { ok: r.ok, j: j }; }); })
      .then(function(res){
        if (res.ok) return win(res.j);
        fail(res.j, btn, status);
      })
      .catch(function(e){ fail({ message: String(e) }, btn, status); });
  }

  function win(j){
    if (FOLDERS.indexOf(j.folder) === -1) { FOLDERS.push(j.folder); FOLDERS.sort(); }
    el.className = 'card done';
    body.innerHTML =
      '<p class="ok">✓ Added</p>' +
      '<p class="name">' + j.rel + '</p>' +
      '<p class="meta">' + j.from.width + '×' + j.from.height + ' → ' +
        j.width + '×' + j.height + ' · ' + Math.round(j.bytes/1024) + ' KB</p>' +
      '<div class="row"><code class="url">' + j.url + '</code>' +
      '<button class="ghost copy">Copy path</button></div>';
    body.querySelector('.copy').addEventListener('click', function(){
      navigator.clipboard.writeText(j.url);
      this.textContent = 'Copied';
    });
  }

  function fail(j, btn, status){
    btn.disabled = false;
    status.textContent = '';
    el.classList.add('fail');
    var note = body.querySelector('.failnote');
    if (!note) {
      note = document.createElement('div');
      note.className = 'failnote';
      note.style.marginTop = '10px';
      body.appendChild(note);
    }
    note.innerHTML = '<p class="msg">' + (j.message || 'Something went wrong.') + '</p>' +
      (j.hint ? '<p class="hint">' + j.hint + '</p>' : '');
    if (j.code === 'exists') {
      var again = document.createElement('button');
      again.className = 'gold';
      again.style.marginTop = '10px';
      again.textContent = 'Replace it';
      again.addEventListener('click', function(){ again.remove(); send(true); });
      note.appendChild(again);
    }
  }
}
</script></body></html>`;

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, 'http://localhost');
  const json = (code, body) => {
    res.writeHead(code, { 'content-type': 'application/json' });
    res.end(JSON.stringify(body));
  };

  if (req.method === 'GET' && url.pathname === '/') {
    res.writeHead(200, { 'content-type': 'text/html; charset=utf-8' });
    return res.end(
      PAGE.replace('__FOLDERS__', JSON.stringify(folders()))
        .replace('__MAXW__', String(MAX_WIDTH))
    );
  }

  if (req.method === 'PUT' && url.pathname === '/add') {
    const chunks = [];
    let size = 0;
    try {
      for await (const c of req) {
        size += c.length;
        if (size > LIMIT) {
          req.destroy();
          return json(413, { message: 'That file is over 40MB — too big to be a website image.' });
        }
        chunks.push(c);
      }
    } catch {
      return json(400, { message: 'The upload was interrupted.' });
    }

    const name = url.searchParams.get('name') || '';
    const width = Number(url.searchParams.get('width')) || MAX_WIDTH;
    try {
      const out = await landImage(Buffer.concat(chunks), name, {
        replace: url.searchParams.get('replace') === '1',
        maxWidth: Math.min(Math.max(width, 80), 4000),
        sourceName: name.split('/').pop() || 'the image',
      });
      console.log(`  ✓ ${out.rel}  ${out.width}x${out.height}  ${Math.round(out.bytes / 1024)} KB`);
      return json(200, { ...out, folder: name.split('/')[0] });
    } catch (e) {
      if (e instanceof ChuteError) {
        console.log(`  · refused (${e.code}): ${e.message}`);
        return json(e.code === 'exists' ? 409 : 400,
          { code: e.code, message: e.message, hint: e.hint });
      }
      console.error(e);
      return json(500, { message: e.message });
    }
  }

  res.writeHead(404).end();
});

/* 127.0.0.1, not 0.0.0.0: this writes to the repo, so it stays on this Mac */
server.listen(PORT, '127.0.0.1', () => {
  console.log(`\n  Image chute → http://localhost:${PORT}\n`);
  console.log('  Drop pictures on the page; they land in site/public/images/.');
  console.log('  Nothing is committed. Ctrl-C to stop.\n');
});
