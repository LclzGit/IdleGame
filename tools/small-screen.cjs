const { chromium } = require('playwright');
const { useRealFonts, fontsReady } = require('./test-fonts.cjs');
const it=(cls,type,t,extra={})=>({k:'gear',cls,type,t,lv:90,q:1,af:Array.from({length:[0,1,1,2,3,3][t]},()=>({k:'gold',v:3})),set:'rootkit',name:'X Mk90',...extra});
const gear={fw:{weapon:it('fw','weapon',5,{m:'sword'}),shield:it('fw','shield',2),helmet:it('fw','helmet',2),armor:it('fw','armor',2),boots:it('fw','boots',2)},sc:{},pt:{}};
const inv=[{k:'chip',r:0,n:7},{k:'chip',r:1,n:2},{k:'chip',r:0,n:4,b:1},{k:'chip',r:1,n:8,b:1},...Array.from({length:23},(_,i)=>it(['fw','sc','pt'][i%3],['weapon','helmet','armor','boots','ai','driver','token','vaccine'][i%8],i%6,{wt:['area','single','boss'][i%3],ai:'claudio',vs:'worm'}))];
const SAVE={data:471e3,def:19e3,lv:{kg:{a:41,h:40}},stage:60,maxStage:62,gear,inv,roster:{bulwark7:1,archer:1,aura2:1},tank:'bulwark7',gunner:'archer',pity:{fw:{},sc:{}}};
(async()=>{const b=await chromium.launch();
for (const [w,h] of [[752,775],[1366,768],[600,560]]) {
 const p=await b.newPage({viewport:{width:w,height:h}});await useRealFonts(p);const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.addInitScript(s=>localStorage.setItem('daemonbar.v2',JSON.stringify(s)),SAVE);
 await p.goto('file://'+require('path').resolve(__dirname,'../prototype/index.html'));await p.waitForTimeout(1200);
 await p.evaluate(()=>document.querySelector('[data-open="agent"]').click());await p.waitForTimeout(400);
 await p.screenshot({path:require('path').resolve(__dirname,`../small_${w}.png`)});
 const nav=await p.evaluate(()=>{const n=document.querySelector('#pNav');const r=n.getBoundingClientRect();return {vis:getComputedStyle(n).display!=='none'&&r.width>0, items:[...n.children].filter(b=>{const q=b.getBoundingClientRect();return q.width>0}).length, scroll:n.scrollHeight>n.clientHeight}});
 console.log(w,h,JSON.stringify(nav),errs.join('|')||'ok');await p.close();}
await b.close();})();
