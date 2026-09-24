// Simulação de balanceamento: roda o jogo real acelerado com um "jogador idle" automático
// e imprime, hora a hora, fase, poder, drops de itens por tier, pacotes, agentes, versões e fragmentos.
// Uso: node tools/make-sim.cjs && node tools/balance-sim.cjs 168 [raids] [casual] [nometa]
//   raids  : o jogador também enfrenta os Chefões
//   casual : joga 3 h por dia (o resto é tempo offline, com o limite de 8 h do jogo)
//   gold=0.5: chance de o jogador pegar cada vírus dourado (padrão 0,25; casual 0,8)
//   nometa : desliga contratos, presença, loja, conquistas e Formatar C: (comparação)
const { chromium } = require('playwright');
const HOURS = +process.argv[2] || 12, ARGS = process.argv.slice(3), RAIDS = ARGS.includes('raids'), CASUAL = ARGS.includes('casual'), META = !ARGS.includes('nometa');
(async()=>{
const b = await chromium.launch(); const p = await b.newPage();
const errs=[]; p.on('pageerror',e=>errs.push(e.message));
await p.goto('file://'+require('path').join(__dirname, 'sim.html')); await p.waitForTimeout(300);
const GOLD = +((ARGS.find(a => a.startsWith('gold=')) || '').split('=')[1] || (CASUAL ? .8 : .25));   // chance de pegar cada vírus dourado
await p.evaluate(([r, m, g])=>{ window.__raidsOn = r; window.__metaOn = m; window.__goldP = g; }, [RAIDS, META, GOLD]);
const rows=[]; const t0=Date.now();
// casual: cada dia tem 180 min online; "hora de jogo" aqui é hora de relógio (inclui o tempo offline)
const ONLINE = CASUAL ? 180 : 1440;
for (let m=1; m<=HOURS*60; m++) {
  const dm = (m - 1) % 1440;
  if (dm < ONLINE) {
    await p.evaluate(m=>{ const g = window.__g; g.step(1200, .05); g.adv(60000); if (window.__raidsOn) g.raidTick(); g.player(); g.meta(m); }, m);
  } else if (dm === ONLINE) {
    await p.evaluate(ms=>{ window.__g.away(ms); }, (1440 - ONLINE) * 60000);
  }
  if (m % 60 === 0 || m === 10 || m === 30) {
    const r = await p.evaluate(()=>{ const g=window.__g, S=g.S(), st=window.__st; return {stage:g.stageLabel(S.maxStage), max:S.maxStage, peak:S.peak, pow:Math.round(g.power()), rec:Math.round(g.recPow(S.maxStage)), cred:Math.round(st.cred), items:[...st.items], chips:[...st.chips], rchips:[...st.rchips], ritems:[...st.ritems], raids:st.raids, raidWins:st.raidWins, pulls:JSON.parse(JSON.stringify(st.pulls)), kills:st.kills, clears:st.clears||0, comp:st.comp, deaths:st.deaths, roster:Object.keys(S.roster), def:Math.round(S.def), treeN:Object.keys(S.tree).length,
      frag:S.frag, verTotal:g.verTotal(), v20:Object.values(S.ver).filter(v=>v.v>=10).length, colMul:+g.colMul().toFixed(3), setores:S.setores, fmtN:S.fmtN, ctr:S.stat.ctr||0, gold:S.stat.gold||0, ach:Object.keys(S.ach).length, bound:S.inv.filter(x=>x.k==='chip'&&x.b).reduce((a,x)=>a+x.n,0)}; });
    r.min = m; rows.push(r); console.log(JSON.stringify(r));
  }
}
require('fs').writeFileSync(require('path').join(__dirname, 'sim_out.json'), JSON.stringify(rows));
console.log('real secs', (Date.now()-t0)/1000, errs.slice(0,3).join('|')||'no errors');
await b.close();})();
