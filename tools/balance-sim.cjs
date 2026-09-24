// Simulação de balanceamento: roda o jogo real acelerado com um "jogador idle" automático
// e imprime, hora a hora, fase, poder, drops de itens por tier, pacotes e agentes baixados.
// Uso: node tools/make-sim.cjs && node tools/balance-sim.cjs 48   (horas de jogo)
const { chromium } = require('playwright');
const HOURS = +process.argv[2] || 12;
(async()=>{
const b = await chromium.launch(); const p = await b.newPage();
const errs=[]; p.on('pageerror',e=>errs.push(e.message));
await p.goto('file://'+require('path').join(__dirname, 'sim.html')); await p.waitForTimeout(300);
const rows=[]; const t0=Date.now();
for (let m=1; m<=HOURS*60; m++) {
  await p.evaluate(()=>{ window.__g.step(1200, .05); window.__g.player(); });   // 1 minuto de jogo
  if (m % 60 === 0 || m === 10 || m === 30) {
    const r = await p.evaluate(()=>{ const S=window.__g.S(), st=window.__st; return {stage:window.__g.stageLabel(S.maxStage), max:S.maxStage, pow:Math.round(window.__g.power()), rec:Math.round(window.__g.recPow(S.maxStage)), cred:Math.round(st.cred), items:[...st.items], chips:[...st.chips], pulls:JSON.parse(JSON.stringify(st.pulls)), kills:st.kills, comp:st.comp, deaths:st.deaths, roster:Object.keys(S.roster), def:Math.round(S.def), treeN:Object.keys(S.tree).length}; });
    r.min = m; rows.push(r); console.log(JSON.stringify(r));
  }
}
require('fs').writeFileSync(require('path').join(__dirname, 'sim_out.json'), JSON.stringify(rows));
console.log('real secs', (Date.now()-t0)/1000, errs.slice(0,3).join('|')||'no errors');
await b.close();})();
