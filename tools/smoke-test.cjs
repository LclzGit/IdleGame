// Teste de fumaça: abre o protótipo com saves variados (novo, com todas as peças/IAs/Root/pacotes vinculados
// e um save de fim de jogo) e passa por todos os painéis. Qualquer erro de JavaScript falha o teste.
// Uso: node tools/smoke-test.cjs   (precisa do Playwright)
const { chromium } = require('playwright');
const path = require('path');
const it = (cls, type, t, x = {}) => ({k:'gear', cls, type, t, lv:40, set:'rootkit', af:[{k:'gold', v:3}], q:1, name:`${type} teste`, ...x});
const loaded = {
  lv:{firewall:{a:20, h:20}, scanner:{a:20, h:20}}, stage:40, maxStage:45, data:1e6, def:500, tree:{b0m0:2},
  roster:{firewall:1, scanner:1, bulwark7:1, archer:1}, tank:'bulwark7', gunner:'archer', pity:{fw:{}, sc:{}},
  gear:{
    fw:{helmet:it('fw', 'helmet', 3), armor:it('fw', 'armor', 4), boots:it('fw', 'boots', 2), weapon:it('fw', 'weapon', 1), shield:it('fw', 'shield', 4),
        vaccine:it('fw', 'vaccine', 2, {vs:'worm'}), ai:it('fw', 'ai', 3, {ai:'claudio'}), driver:it('fw', 'driver', 2), token:it('fw', 'token', 5, {af:[{k:'boss', v:33}]})},
    sc:{weapon:it('sc', 'weapon', 3, {wt:'single'}), ai:it('sc', 'ai', 4, {ai:'geminios'})},
    pt:{ai:it('pt', 'ai', 1, {ai:'copiloto'}), vaccine:it('pt', 'vaccine', 1, {vs:'bug'})},
  },
  inv:[{k:'chip', r:0, n:5}, {k:'chip', r:0, n:5, b:true}, {k:'chip', r:1, n:2, b:true}, it('sc', 'ai', 5, {ai:'gruk', pick:3, af:[]}), it('pt', 'token', 2)],
  ver:{scanner:{v:5, d:3}, archer:{v:10, d:0}}, frag:500, setores:120, fmtN:2, peak:140, raids:{creeper:Date.now() + 3600e3},
  upl:{slots:[0, Date.now() + 3600e3, 0, 0], steam:[{k:'chip', r:1, n:1}]}, last:Date.now() - 2 * 3600e3,
};
const late = {...loaded, stage:125, maxStage:130, lv:{bulwark7:{a:180, h:180}, archer:{a:180, h:180}, pt:{a:150, h:150}}};
const SAVES = {novo:null, carregado:loaded, fim:late, antigo:{lv:{}, gear:{fw:{b:1}}, inv:[{k:'chip', r:0, n:3}, {junk:1}], pity:{fw:0}}};
const PANELS = ['agent', 'col', 'comp', 'gacha', 'upload', 'tree', 'stages', 'raid', 'quest', 'codex', 'rank', 'odds', 'log', 'readme'];
(async () => {
  const b = await chromium.launch(); let fail = 0;
  for (const [name, save] of Object.entries(SAVES)) {
    const p = await b.newPage({viewport:{width:1280, height:900}}); const errs = [];
    p.on('pageerror', e => errs.push(e.message));
    if (save) await p.addInitScript(s => localStorage.setItem('daemonbar.v2', s), JSON.stringify(save));
    await p.goto('file://' + path.join(__dirname, '../prototype/index.html')); await p.waitForTimeout(800);
    for (const k of PANELS) {
      await p.evaluate(k => { const el = document.querySelector(`#pNav [data-open="${k}"], [data-open="${k}"]`); if (el) el.click(); }, k);
      await p.waitForTimeout(120);
    }
    await p.click('#speed'); await p.click('#speed'); await p.waitForTimeout(3000);
    console.log(`${name.padEnd(10)} ${errs.length ? 'ERRO: ' + errs.slice(0, 3).join(' | ') : 'ok'}`);
    fail += errs.length; await p.close();
  }
  await b.close(); process.exit(fail ? 1 : 0);
})();
