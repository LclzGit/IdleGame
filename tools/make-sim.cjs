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
rep("<script>\n(() => {", "<script>\nwindow.__st = {items:[0,0,0,0,0,0], chips:[0,0,0], pulls:[{3:0,4:0,5:0},{3:0,4:0,5:0},{3:0,4:0,5:0}], kills:0, cred:0, comp:0, deaths:0};\n(() => {");
const i = s.lastIndexOf('})();');
s = s.slice(0, i) + `window.__g = {
  step(n, dt) { for (let i = 0; i < n; i++) update(dt); },
  S: () => S, power, stageLabel, recPow,
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
