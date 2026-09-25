// Gera um GIF de cada animação importada (art/sprites/<id>/frames.json → art/sprites/<id>/<tipo>.gif),
// com os pés alinhados como no jogo, fundo escuro e pixels ampliados. Precisa de: npm i gifenc
// uso: node tools/anim-gif.cjs <id>
const { chromium } = require('playwright');
const { GIFEncoder, quantize, applyPalette } = require('gifenc');
const fs = require('fs'), path = require('path');
const id = process.argv[2];
const dir = path.resolve(__dirname, '../art/sprites', id);
const F = JSON.parse(fs.readFileSync(path.join(dir, 'frames.json'), 'utf8'));
const DELAY = {caminhada: 110, ataque: 120, defesa: 150, cura: 120, pulso: 140};
const Z = 3;   // ampliação

(async () => {
  const b = await chromium.launch(); const p = await b.newPage();
  for (const [kind, frames] of Object.entries(F)) {
    if (kind === 'corpo') continue;
    const res = await p.evaluate(async ([frames, Z]) => {
      const ims = await Promise.all(frames.map(([u]) => new Promise(r => { const i = new Image(); i.onload = () => r(i); i.src = u; })));
      // área comum: pés no mesmo x e no mesmo chão
      const left = Math.max(...frames.map(f => f[3])), right = Math.max(...frames.map(f => f[1] - f[3])), top = Math.max(...frames.map(f => f[2]));
      const W = (left + right + 16) * Z, H = (top + 10) * Z, out = [];
      for (let i = 0; i < frames.length; i++) {
        const c = document.createElement('canvas'); c.width = W; c.height = H; const g = c.getContext('2d');
        g.fillStyle = '#0b0a16'; g.fillRect(0, 0, W, H);
        g.fillStyle = '#1f5a60'; g.fillRect(0, H - 5 * Z, W, Z);
        g.imageSmoothingEnabled = false;
        const [, w, h, fx] = frames[i];
        g.drawImage(ims[i], (8 + left - fx) * Z, H - 5 * Z - h * Z, w * Z, h * Z);
        out.push(Array.from(g.getImageData(0, 0, W, H).data));
      }
      return {W, H, out};
    }, [frames, Z]);
    const gif = GIFEncoder();
    for (const px of res.out) {
      const data = Uint8Array.from(px), pal = quantize(data, 256), idx = applyPalette(data, pal);
      gif.writeFrame(idx, res.W, res.H, {palette: pal, delay: DELAY[kind] || 120});
    }
    gif.finish();
    fs.writeFileSync(path.join(dir, `${kind}.gif`), gif.bytes());
    console.log(`${kind}.gif`, res.out.length, 'quadros', res.W + 'x' + res.H);
  }
  await b.close();
})();
