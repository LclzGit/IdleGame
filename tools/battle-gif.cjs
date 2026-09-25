// GIF de um tanque em batalha: art/sprites/<id>/batalha.gif. Precisa de: npm i gifenc pngjs
// uso: node tools/battle-gif.cjs <id-do-tanque> [id-do-agente-de-ataque]  (com o 2º, o GIF vai pra pasta do agente de ataque)
// Cenário controlado (não depende da sorte da batalha): guarda → 3 vírus quase imortais encostam (escudo) → somem (abaixa o escudo).
// Captura por screenshots, que não travam o loop do jogo.
const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');
const { GIFEncoder, quantize, applyPalette } = require('gifenc'); const { PNG } = require('pngjs');
const TANK = process.argv[2] || 'firewall', GUN = process.argv[3] || 'pulse', OUT = path.resolve(__dirname, '../art/sprites', process.argv[3] || TANK, 'batalha.gif');
// página de teste: o protótipo com os vírus e agentes expostos pro cenário
const PAGE = path.join(require('os').tmpdir(), 'daemonbar-battle.html');
{ const s = fs.readFileSync(path.resolve(__dirname, '../prototype/index.html'), 'utf8'), i = s.lastIndexOf('requestAnimationFrame(frame);');
  fs.writeFileSync(PAGE, s.slice(0, i) + 'window.__t={spawn,get enemies(){return enemies},set enemies(v){enemies=v},get heroes(){return heroes}};' + s.slice(i)); }
(async () => {
  const b = await chromium.launch(); const p = await b.newPage({viewport: {width: 1366, height: 768}});
  await p.addInitScript(([TANK, GUN]) => localStorage.setItem('daemonbar.v2', JSON.stringify({lv: {[TANK]: {a: 1, h: 12}}, data: 0, autoUp: false, stage: 11, maxStage: 14, roster: {[TANK]: 1, [GUN]: 1, aura2: 1}, tank: TANK, gunner: GUN, autoAdv: false})), [TANK, GUN]);
  await p.goto('file://' + PAGE); await p.waitForTimeout(2500);
  await p.evaluate(() => { const T = window.__t; T.enemies = [];
    setTimeout(() => { for (let i = 0; i < 3; i++) { T.spawn(false); const e = T.enemies[T.enemies.length - 1]; e.hp = e.max = 1e15; e.x = 175 + i * 14; } }, 1200);
    setTimeout(() => { T.enemies = []; }, 5200);
    setInterval(() => { window.__t.enemies = window.__t.enemies.filter(e => e.max === 1e15); }, 50);   // só os vírus do teste
  });
  const box = await (await p.$('#strip')).boundingBox(), clip = {x: 0, y: box.y, width: 330, height: box.height};
  const gif = GIFEncoder(); let last = Date.now(), n = 0;
  const end = Date.now() + 7000;
  while (Date.now() < end) {
    const png = PNG.sync.read(await p.screenshot({clip}));
    const now = Date.now(), d = Uint8Array.from(png.data), pal = quantize(d, 256);
    gif.writeFrame(applyPalette(d, pal), png.width, png.height, {palette: pal, delay: Math.max(40, now - last)}); last = now; n++;
  }
  gif.finish(); fs.writeFileSync(OUT, gif.bytes());
  console.log(n, 'quadros', clip.width + 'x' + Math.round(clip.height)); await b.close();
})();
