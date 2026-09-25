// Importa folhas de animação geradas (quadros lado a lado, fundo branco, linha de chão opcional)
// e grava os quadros prontos pro jogo em art/sprites/<id>/frames.json.
// uso: node tools/import-anim.cjs <id>        (lê art/sprites/<id>/{caminhada,ataque,defesa,corpo,cura,pulso}.jpg|png)
// Número de quadros esperado por folha: caminhada 6, ataque 5, defesa 5, cura 5, pulso 4 (como nos prompts).
// Cada quadro vira [dataURL, largura, altura, xDosPés] com o personagem a 72 px de altura (mesmo padrão das fichas).
// Todos os quadros de uma folha usam a mesma escala e a mesma linha de chão, então pulo e recuo são preservados.
const { chromium } = require('playwright');
const fs = require('fs'), path = require('path');
const id = process.argv[2];
if (!id) { console.log('uso: node tools/import-anim.cjs <id>'); process.exit(1); }
const dir = path.resolve(__dirname, '../art/sprites', id);
const KINDS = ['corpo', 'caminhada', 'ataque', 'defesa', 'cura', 'pulso'];
const H = 72;

(async () => {
  const b = await chromium.launch(); const p = await b.newPage();
  const out = {}, preview = [];
  for (const kind of KINDS) {
    const f = ['jpg', 'jpeg', 'png', 'webp'].map(e => path.join(dir, `${kind}.${e}`)).find(fs.existsSync);
    if (!f) continue;
    const mime = f.endsWith('png') ? 'png' : f.endsWith('webp') ? 'webp' : 'jpeg';
    const src = `data:image/${mime};base64,` + fs.readFileSync(f).toString('base64');
    const frames = await p.evaluate(async ([src, H, single, N]) => {
      const im = new Image(); im.src = src; await im.decode();
      const W = im.width, Hh = im.height, c = document.createElement('canvas'); c.width = W; c.height = Hh;
      const g = c.getContext('2d'); g.drawImage(im, 0, 0);
      const d = g.getImageData(0, 0, W, Hh), a = d.data;
      const lum = i => (a[i] + a[i + 1] + a[i + 2]) / 3, sat = i => Math.max(a[i], a[i + 1], a[i + 2]) - Math.min(a[i], a[i + 1], a[i + 2]);
      const bg = i => lum(i) > 222 && sat(i) < 30;
      const lineRows = [];
      for (let y = Math.floor(Hh * .5); y < Hh; y++) { let best = 0, run = 0;
        for (let x = 0; x < W; x++) { if (lum((y * W + x) * 4) < 235) { run++; best = Math.max(best, run); } else run = 0; }
        if (best >= W * .4) lineRows.push(y); }
      // a linha pode ter 3-4 px com o miolo tracejado: inclui as fileiras vizinhas
      for (const y of [...lineRows]) for (const dy of [-2, -1, 1, 2]) if (!lineRows.includes(y + dy) && y + dy < Hh) lineRows.push(y + dy);
      // 1) fundo branco: flood fill a partir das bordas
      const seen = new Uint8Array(W * Hh), st = [];
      for (let x = 0; x < W; x++) st.push(x, (Hh - 1) * W + x); for (let y = 0; y < Hh; y++) st.push(y * W, y * W + W - 1);
      while (st.length) { const k = st.pop(); if (seen[k]) continue; seen[k] = 1; if (!bg(k * 4)) continue; a[k * 4 + 3] = 0; const x = k % W, y = (k / W) | 0;
        if (x > 0) st.push(k - 1); if (x < W - 1) st.push(k + 1); if (y > 0) st.push(k - W); if (y < Hh - 1) st.push(k + W); }
      // 1b) escudos de energia, brilhos e clarões são translúcidos no desenho original: áreas claras ligadas ao fundo
      //     (sem contorno preto no meio) viram transparência proporcional ("cor pra alfa" contra o branco).
      //     O que fica dentro do contorno do personagem (armadura clara) não é tocado.
      { const light = i => (a[i] + a[i + 1] + a[i + 2]) / 3 > 160 && Math.min(a[i], a[i + 1], a[i + 2]) > 95, vis = new Uint8Array(W * Hh), q = [];
        for (let k = 0; k < W * Hh; k++) if (!a[k * 4 + 3]) { const x = k % W, y = (k / W) | 0;
          for (const n of [x > 0 ? k - 1 : -1, x < W - 1 ? k + 1 : -1, y > 0 ? k - W : -1, y < Hh - 1 ? k + W : -1]) if (n >= 0 && a[n * 4 + 3] && !vis[n] && light(n * 4)) { vis[n] = 1; q.push(n); } }
        while (q.length) { const k = q.pop(), x = k % W, y = (k / W) | 0;
          for (const n of [x > 0 ? k - 1 : -1, x < W - 1 ? k + 1 : -1, y > 0 ? k - W : -1, y < Hh - 1 ? k + W : -1]) if (n >= 0 && a[n * 4 + 3] && !vis[n] && light(n * 4)) { vis[n] = 1; q.push(n); } }
        for (let k = 0; k < W * Hh; k++) if (vis[k]) { const i = k * 4, al = Math.max(255 - a[i], 255 - a[i + 1], 255 - a[i + 2]) / 255;
          if (al < .06) { a[i + 3] = 0; continue; }
          for (let c = 0; c < 3; c++) a[i + c] = Math.max(0, Math.round(255 - (255 - a[i + c]) / al));
          a[i + 3] = Math.round(255 * Math.min(1, al * 1.15)); } }
      // bolsões de branco presos (entre braço e corpo), só se forem grandes
      { const vis = new Uint8Array(W * Hh);
        for (let k = 0; k < W * Hh; k++) { if (vis[k] || !a[k * 4 + 3] || !bg(k * 4)) continue; const q = [k], comp = []; vis[k] = 1;
          while (q.length) { const m = q.pop(); comp.push(m); const x = m % W, y = (m / W) | 0;
            for (const n of [x > 0 ? m - 1 : -1, x < W - 1 ? m + 1 : -1, y > 0 ? m - W : -1, y < Hh - 1 ? m + W : -1]) if (n >= 0 && !vis[n] && a[n * 4 + 3] && bg(n * 4)) { vis[n] = 1; q.push(n); } }
          if (comp.length > 60) comp.forEach(m => a[m * 4 + 3] = 0); } }
      // 2) linha de chão (detectada antes de apagar o fundo): trecho não branco contínuo e longo na metade de baixo.
      //    Só apaga onde é fino (vazio 3 px acima ou abaixo), pra não cortar os pés.
      for (const y of lineRows) for (let x = 0; x < W; x++) { const i = (y * W + x) * 4; if (!a[i + 3]) continue;
        const up = y > 4 && a[((y - 4) * W + x) * 4 + 3] && !lineRows.includes(y - 4), dn = y < Hh - 4 && a[((y + 4) * W + x) * 4 + 3] && !lineRows.includes(y + 4);
        if (!(up && dn)) a[i + 3] = 0; }
      // 3) halo claro de jpeg encostado no fundo
      for (let pass = 0; pass < 2; pass++) { const kill = []; for (let k = 0; k < W * Hh; k++) { if (!a[k * 4 + 3]) continue; const x = k % W, y = (k / W) | 0;
          if ([x > 0 ? k - 1 : -1, x < W - 1 ? k + 1 : -1, k - W, k + W].some(n => n >= 0 && n < W * Hh && !a[n * 4 + 3]) && lum(k * 4) > 185 && sat(k * 4) < 40) kill.push(k); } kill.forEach(k => a[k * 4 + 3] = 0); }
      // pontinhos soltos (ruído de jpeg)
      { const lab = new Int32Array(W * Hh).fill(-1), sz = [];
        for (let k = 0; k < W * Hh; k++) { if (!a[k * 4 + 3] || lab[k] >= 0) continue; const idn = sz.length; let n = 0; const q = [k]; lab[k] = idn;
          while (q.length) { const m = q.pop(); n++; const x = m % W, y = (m / W) | 0; for (const nn of [x > 0 ? m - 1 : -1, x < W - 1 ? m + 1 : -1, y > 0 ? m - W : -1, y < Hh - 1 ? m + W : -1]) if (nn >= 0 && a[nn * 4 + 3] && lab[nn] < 0) { lab[nn] = idn; q.push(nn); } }
          sz.push(n); }
        for (let k = 0; k < W * Hh; k++) if (a[k * 4 + 3] && sz[lab[k]] < 25) a[k * 4 + 3] = 0; }
      g.putImageData(d, 0, 0);
      // 4) separa os quadros pelas colunas vazias
      const colN = new Int32Array(W); for (let x = 0; x < W; x++) for (let y = 0; y < Hh; y++) if (a[(y * W + x) * 4 + 3]) colN[x]++;
      let segs = [], s0 = -1;
      for (let x = 0; x <= W; x++) { const on = x < W && colN[x] > 0; if (on && s0 < 0) s0 = x; if (!on && s0 >= 0) { segs.push([s0, x - 1]); s0 = -1; } }
      // junta pedaços pequenos (efeitos, faíscas) ao quadro vizinho mais perto
      const mass = ([x0, x1]) => { let n = 0; for (let x = x0; x <= x1; x++) n += colN[x]; return n; };
      const big = Math.max(...segs.map(mass));
      let changed = true;
      while (changed) { changed = false;
        for (let i = 0; i < segs.length; i++) if (mass(segs[i]) < big * .12 && segs.length > 1) {
          const L = i > 0 ? segs[i][0] - segs[i - 1][1] : 1e9, R = i < segs.length - 1 ? segs[i + 1][0] - segs[i][1] : 1e9;
          const j = L <= R ? i - 1 : i + 1; const m = [Math.min(segs[i][0], segs[j][0]), Math.max(segs[i][1], segs[j][1])];
          segs.splice(Math.min(i, j), 2, m); changed = true; break; } }
      if (single) segs = [[segs[0][0], segs[segs.length - 1][1]]];
      // quadros encostados (espada de um tocando o outro): divide pelo número esperado de quadros,
      // cortando cada fronteira na coluna mais vazia perto da posição esperada
      else if (N && segs.length !== N) {
        const X0 = segs[0][0], X1 = segs[segs.length - 1][1], fw = (X1 - X0 + 1) / N, cuts = [X0];
        for (let i = 1; i < N; i++) { const e = Math.round(X0 + fw * i), r = Math.round(fw * .18); let best = e;
          for (let x = e - r; x <= e + r; x++) if (colN[x] < colN[best]) best = x; cuts.push(best); }
        cuts.push(X1 + 1); segs = [];
        for (let i = 0; i < N; i++) { let a0 = cuts[i], a1 = cuts[i + 1] - 1; while (a0 < a1 && !colN[a0]) a0++; while (a1 > a0 && !colN[a1]) a1--; segs.push([a0, a1]); }
      }
      // 4b) cada peça conectada (personagem com a arma, faísca, drone) vai inteira pro quadro onde está o centro dela.
      //     Assim uma garra ou espada que invade o espaço do vizinho continua no quadro certo.
      const nz = segs.length, zoneOf = x => { let best = 0, bd = 1e9; segs.forEach(([x0, x1], i) => { const dd = x < x0 ? x0 - x : x > x1 ? x - x1 : 0; if (dd < bd) { bd = dd; best = i; } }); return best; };
      const zw = segs.reduce((m, [x0, x1]) => m + x1 - x0 + 1, 0) / nz;
      const lab = new Int32Array(W * Hh).fill(-1), frameOf = [], comps = [];
      for (let k = 0; k < W * Hh; k++) { if (!a[k * 4 + 3] || lab[k] >= 0) continue; const id = frameOf.length; const q = [k]; lab[k] = id; let n = 0, sx = 0, mnx = W, mxx = 0;
        while (q.length) { const m = q.pop(), x = m % W, y = (m / W) | 0; n++; sx += x; mnx = Math.min(mnx, x); mxx = Math.max(mxx, x);
          for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) { const nx = x + dx, ny = y + dy; if (nx < 0 || ny < 0 || nx >= W || ny >= Hh) continue; const nn = ny * W + nx; if (a[nn * 4 + 3] && lab[nn] < 0) { lab[nn] = id; q.push(nn); } } }
        // peça larga demais = personagens encostados: essa é dividida por coluna
        frameOf.push(mxx - mnx + 1 > zw * 1.35 && nz > 1 ? -1 : zoneOf(Math.round(sx / n))); comps.push({id, n, cx: sx / n, wide: mxx - mnx + 1 > zw * 1.35}); }
      // âncoras = os N corpos (maiores peças). Peça solta (golpe, faísca, drone) vai pro corpo mais perto,
      // preferindo o da esquerda: todo mundo olha pra direita, então efeito solto quase sempre é do quadro à esquerda.
      const anchors = comps.filter(c => !c.wide).sort((p, q) => q.n - p.n).slice(0, nz);
      if (nz > 1 && anchors.length === nz && anchors[nz - 1].n > anchors[0].n * .3) {
        anchors.sort((p, q) => p.cx - q.cx);
        const isAnchor = new Set(anchors.map(c => c.id));
        for (const c of comps) { if (c.wide) continue;
          if (isAnchor.has(c.id)) { frameOf[c.id] = anchors.findIndex(x => x.id === c.id); continue; }
          let best = 0, bd = 1e9; anchors.forEach((an, i) => { const d = c.cx >= an.cx ? c.cx - an.cx : (an.cx - c.cx) * 2.2; if (d < bd) { bd = d; best = i; } });
          frameOf[c.id] = best; } }
      const pf = new Int16Array(W * Hh).fill(-1);
      for (let k = 0; k < W * Hh; k++) if (lab[k] >= 0) pf[k] = frameOf[lab[k]] >= 0 ? frameOf[lab[k]] : zoneOf(k % W);
      // 5) caixas, linha de chão comum e escala comum
      const box = segs.map(() => ({x0: W, x1: 0, y0: Hh, y1: 0}));
      for (let k = 0; k < W * Hh; k++) { const f = pf[k]; if (f < 0) continue; const x = k % W, y = (k / W) | 0, q = box[f]; q.x0 = Math.min(q.x0, x); q.x1 = Math.max(q.x1, x); q.y0 = Math.min(q.y0, y); q.y1 = Math.max(q.y1, y); }
      const ground = Math.max(...box.map(q => q.y1));
      const hs = box.map(q => ground - q.y0).sort((p, q) => p - q), k = H / hs[Math.floor(hs.length / 2)];   // altura mediana = 72 px
      return box.map((q, fi) => {
        const cw = q.x1 - q.x0 + 1, ch = ground - q.y0 + 1;
        // só os pixels deste quadro (o vizinho não vaza pra dentro)
        const m = document.createElement('canvas'); m.width = cw; m.height = ch; const mg = m.getContext('2d'), md = mg.createImageData(cw, ch);
        for (let y = q.y0; y <= Math.min(ground, Hh - 1); y++) for (let x = q.x0; x <= q.x1; x++) { const kk = y * W + x; if (pf[kk] !== fi) continue; const o = ((y - q.y0) * cw + (x - q.x0)) * 4, i = kk * 4; md.data[o] = a[i]; md.data[o + 1] = a[i + 1]; md.data[o + 2] = a[i + 2]; md.data[o + 3] = a[i + 3]; }
        mg.putImageData(md, 0, 0);
        // centro dos pés: média x dos pixels deste quadro nos 10% de baixo da própria figura
        let fs = 0, fn = 0; for (let y = q.y1 - Math.max(2, Math.round((q.y1 - q.y0) * .1)); y <= q.y1; y++) for (let x = q.x0; x <= q.x1; x++) if (pf[y * W + x] === fi) { fs += x - q.x0; fn++; }
        const tw = Math.max(1, Math.round(cw * k)), th = Math.max(1, Math.round(ch * k));
        const o = document.createElement('canvas'); o.width = tw; o.height = th; const og = o.getContext('2d'); og.imageSmoothingQuality = 'high';
        og.drawImage(m, 0, 0, cw, ch, 0, 0, tw, th);
        return [o.toDataURL('image/webp', .92), tw, th, Math.round((fn ? fs / fn : cw / 2) * k)];
      });
    }, [src, H, kind === 'corpo', {caminhada: 6, ataque: 5, defesa: 5, cura: 5, pulso: 4}[kind] || 0]);
    out[kind] = frames;
    preview.push(`<div style="margin:6px;color:#aaa;font:12px sans-serif">${kind} (${frames.length})<br>` + frames.map(([u, w, h, fx]) => `<span style="display:inline-block;position:relative;margin:2px;background:#16142c"><img src="${u}" width="${w * 2}" height="${h * 2}" style="image-rendering:pixelated;display:block"><i style="position:absolute;left:${fx * 2}px;bottom:0;width:2px;height:8px;background:#f0f"></i></span>`).join('') + '</div>');
    console.log(kind, frames.length, 'quadros', frames.map(f => f[1] + 'x' + f[2]).join(' '));
  }
  fs.writeFileSync(path.join(dir, 'frames.json'), JSON.stringify(out));
  await p.setContent(`<body style="background:#0b0a16;margin:0">${preview.join('')}</body>`); await p.waitForTimeout(300);
  await p.screenshot({path: path.join(dir, 'preview.png'), fullPage: true});
  await b.close();
})();
