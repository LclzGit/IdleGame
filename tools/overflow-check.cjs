// acha textos que saem da própria caixa (botões, células, cartões) em todos os menus e idiomas
const { chromium } = require('playwright');
const path = require('path');
const URL_ = 'file://' + path.resolve(__dirname, '../prototype/index.html');
const [VW, VH] = (process.argv[3] || '1366x768').split('x').map(Number);
// uso: node tools/overflow-check.cjs [pt,en,es] [1366x768]
// ignora os contadores 0/5 da árvore, que ficam abaixo do nó de propósito
const SAVE={data:5e6,def:5000,lv:{bulwark7:{a:20,h:20},archer:{a:20,h:20}},stage:40,maxStage:45,gear:{fw:{},sc:{},pt:{}},inv:[{k:'chip',r:0,n:5},{k:'chip',r:1,n:2},...Array.from({length:24},(_,i)=>({k:'gear',cls:['fw','sc','pt'][i%3],wt:['area','single','boss'][i%3],type:['weapon','helmet','armor','boots'][i%4],t:i%6,lv:30+i,q:1,af:[],set:'rootkit',name:'Martelo de impacto Rootkit Mk'+(30+i)}))],roster:{bulwark7:1,archer:1,aura2:1},tank:'bulwark7',gunner:'archer',pity:{fw:{},sc:{}}};
(async()=>{const b=await chromium.launch();const out=[];
for (const lang of (process.argv[2]||'pt,en,es').split(',')) {
 const p=await b.newPage({viewport:{width:VW,height:VH}});const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.addInitScript(([l,s])=>{localStorage.setItem('daemonbar.cfg',JSON.stringify({lang:l}));localStorage.setItem('daemonbar.v2',JSON.stringify(s))},[lang,SAVE]);
 await p.goto(URL_);await p.waitForTimeout(1200);
 const keys=await p.evaluate(()=>[...document.querySelectorAll('#pNav [data-open]')].map(b=>b.dataset.open).concat(['cfg','readme']));
 for(const k of keys){
  await p.evaluate(k=>{const e=document.querySelector(`#pNav [data-open="${k}"]`)||document.querySelector(`[data-open="${k}"]`);e.click();},k);await p.waitForTimeout(250);
  const r=await p.evaluate(()=>{const res=[];const root=document.querySelector('#panel');
   const boxes=[...root.querySelectorAll('button,.cell,.sock,.card,.ctr,.raid,.sc,.chip,.sh,.opbox,.rd,.scan,.hr,.pd,.task,label,.fmt,.mut,.packs,.det')].filter(x=>!x.closest('.tn'));
   for(const bx of boxes){const R=bx.getBoundingClientRect(); if(!R.width) continue;
     // texto de cada descendente
     const w=document.createTreeWalker(bx,NodeFilter.SHOW_TEXT);let n;
     while(n=w.nextNode()){ if(!n.nodeValue.trim())continue; const rg=document.createRange();rg.selectNodeContents(n);
       for(const q of rg.getClientRects()){ if(q.right>R.right+1||q.left<R.left-1||q.bottom>R.bottom+1||q.top<R.top-1){res.push((bx.className||bx.tagName)+' :: '+n.nodeValue.trim().slice(0,50));break;} } }
     if(bx.scrollWidth>bx.clientWidth+2 && getComputedStyle(bx).overflowX!=='auto') res.push('scrollW '+(bx.className||bx.tagName)+' :: '+bx.textContent.trim().slice(0,50));
   }
   // painel inteiro: rolagem horizontal
   const body=document.querySelector('#pBody'); if(body.scrollWidth>body.clientWidth+2) res.push('PAINEL COM ROLAGEM HORIZONTAL');
   return [...new Set(res)];});
  r.forEach(x=>out.push(`${lang} ${k}: ${x}`));
 }
 // HUD e barra
 const h=await p.evaluate(()=>{const res=[];document.querySelectorAll('.hud button,.hud .cur,.taskbar > *').forEach(bx=>{if(bx.scrollWidth>bx.clientWidth+2)res.push('hud '+(bx.id||bx.className)+' :: '+bx.textContent.trim().slice(0,40));});return res;});
 h.forEach(x=>out.push(`${lang} ${x}`));
 if(errs.length) out.push(lang+' ERROS '+errs.join(' | '));
 await p.close();}
console.log(out.join('\n')||'nada vazando');console.log('total',out.length);await b.close();})();
