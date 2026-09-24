// Gera tools/sim.html: o protótipo com contadores e um "jogador idle" expostos em window.__g.
const fs = require('fs'), path = require('path');
let s = fs.readFileSync(path.join(__dirname, '../prototype/index.html'), 'utf8');
const rep = (o, n) => { if (!s.includes(o)) throw new Error('não achei: ' + o.slice(0, 60)); s = s.replace(o, n); };
rep("function dropGear(boss, forceType) {\n  const it = makeItem(boss, forceType),", "function dropGear(boss, forceType) {\n  const it = makeItem(boss, forceType); window.__st.items[it.t]++; const _x = 0,");
rep("    if (addItem({k:'chip', r, n:1})) {", "    window.__st.chips[r]++;\n    if (addItem({k:'chip', r, n:1})) {");
rep("function kill(e) {", "function kill(e) {\n  window.__st.kills++; if (e.boss) window.__st.clears = (window.__st.clears || 0) + 1; window.__st.cred += e.reward * (1 + tv('gold') + glob('gold'));");
rep("  if (!(T.id in S.roster)) { S.roster[T.id] = 1; return {T, res:'new'}; }", "  window.__st.pulls[chip][st]++;\n  if (!(T.id in S.roster)) { S.roster[T.id] = 1; return {T, res:'new'}; }");
rep("function compile(sel) {", "function compile(sel) {\n  window.__st.comp++;");
rep("function rollback(why) {", "function rollback(why) {\n  window.__st.deaths++;");
rep("      S.seenT = Math.max(S.seenT, tt);", "      window.__st.ritems[tt]++; S.seenT = Math.max(S.seenT, tt);");
rep("    R.gp.forEach((n, r) => { if (!n) return;", "    R.gp.forEach((n, r) => { if (!n) return; window.__st.rchips[r] += n;");
rep("<script>\n(() => {", "<script>\nwindow.__st = {items:[0,0,0,0,0,0], chips:[0,0,0], rchips:[0,0,0], ritems:[0,0,0,0,0,0], raids:0, raidWins:0, pulls:[{3:0,4:0,5:0},{3:0,4:0,5:0},{3:0,4:0,5:0}], kills:0, cred:0, comp:0, deaths:0};\n(() => {");
const i = s.lastIndexOf('})();');
s = s.slice(0, i) + `window.__g = {
  step(n, dt) { for (let i = 0; i < n; i++) { update(dt); if (gold && !gold.dec) { gold.dec = 1; if (Math.random() < (window.__goldP ?? .5)) catchGold(); } } },
  S: () => S, power, stageLabel, recPow, verTotal, fmtGain, colMul, preMul,
  // chefões: o jogador tenta assim que a espera acaba e o poder chega a 90% do recomendado
  raidTick() {
    for (const R of RAIDS) {
      if (!raidOpen(R) || !raidReady(R) || power() < raidPow(R) * .9) continue;
      lastRaid = null; startRaid(R.id);
      let ts = 0; while (raid && ts < RAID_TIME + 5) { update(.05); ts += .05; }
      window.__st.raids++; if (lastRaid && lastRaid.win) window.__st.raidWins++;
    }
  },
  // o relógio do jogo anda junto com a simulação (esperas, contratos, semanas, temporadas)
  adv(ms) { S.toff += ms; ctrSync(); },
  away(ms) { S.toff += ms; offline(ms); ctrSync(); },
  meta(min) {
    if (window.__metaOn === false) return;
    claimPres();
    for (const k of ['d', 'w']) (S.ctr[k] || []).forEach((c, i) => claimCtr(k, i));
    ACH.forEach(A => claimAch(A.id));
    // loja: ★5 que falta > ★4 que falta > Raro vinculado
    for (const cls of ['fw', 'sc']) {
      gBanner = cls;
      for (const st of [5, 4]) {
        const miss = CLASSES[cls].list.find(x => x.stars === st && !(x.id in S.roster));
        const c = SHOP.find(o => o.id === 's' + st).c;
        if (miss && S.frag >= c) { shopPick[st] = miss.id; buyShop('s' + st); }
      }
    }
    while (S.frag >= 1500) buyShop('raro');
    // Formatar C: quando está no Kernel Panic e a fase máxima parou de subir há 6 h
    if (S.maxStage !== this.lastMax) { this.lastMax = S.maxStage; this.lastMaxAt = min; }
    if (fmtGain() > 0 && min - this.lastMaxAt >= 360) { formatC(); window.__st.fmt = (window.__st.fmt || 0) + 1; this.lastMaxAt = min; }
  },

  player() {
    for (const cls of ['fw', 'sc']) {
      gBanner = cls;
      for (let r = 2; r >= 0; r--) { let n = chipCount(r); while (n >= 10) { summon(r, 10); n -= 10; } if (r > 0) while (chipCount(r) >= 1 && cls === (r % 2 ? 'sc' : 'fw')) summon(r, 1); }
      const best = CLASSES[cls].list.filter(x => x.id in S.roster).sort((a, b) => b.stars - a.stars)[0];
      if (best && S[CLASSES[cls].key] !== best.id) equip(best.id);
    }
    for (let k = 0; k < 20; k++) {
      const n = TREE.filter(x => x.br >= 0 && nodeOpen(x) && nodeLv(x.id) < x.max).sort((a, b) => nodeCost(a) - nodeCost(b))[0];
      if (!n || S.def < nodeCost(n)) break; buyNode(n.id);
    }
  },
};
` + s.slice(i);
fs.writeFileSync(path.join(__dirname, 'sim.html'), s);
console.log('tools/sim.html gerado');
