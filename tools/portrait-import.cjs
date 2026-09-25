// retratos enviados pelo usuário: recorta a moldura, apaga o fundo branco (flood fill a partir das bordas)
// e compõe no fundo padrão dos cartões do jogo (gradiente + grade na cor do agente), 160x160 webp
const { chromium } = require('playwright');const fs=require('fs');
const MAP={firewall:[14,'#5ce1e6'],bulwark7:[15,'#ff6a2a'],sentinel:[16,'#5ce1e6'],valkyrie:[17,'#5ce1e6'],x18:[18,'#ff8a3a']};
(async()=>{const b=await chromium.launch();const p=await b.newPage();
const out={};
for(const [id,[n,gl]] of Object.entries(MAP)){
 const src='data:image/jpeg;base64,'+fs.readFileSync(`process.argv[2] ? require('path').resolve(process.argv[2], n + '.jpg') : '../images/' + n + '.jpg'`).toString('base64');
 out[id]=await p.evaluate(async([src,gl])=>{
  const im=new Image(); im.src=src; await im.decode();
  const W=im.width,H=im.height,c=document.createElement('canvas');c.width=W;c.height=H;const g=c.getContext('2d');g.drawImage(im,0,0);
  const d=g.getImageData(0,0,W,H),px=d.data;
  const white=i=>px[i]>222&&px[i+1]>222&&px[i+2]>222&&Math.max(px[i],px[i+1],px[i+2])-Math.min(px[i],px[i+1],px[i+2])<30;
  // área interna da moldura: da linha do meio, anda do centro pra fora até achar a moldura escura depois do branco
  const lum=(x,y)=>{const i=(y*W+x)*4;return (px[i]+px[i+1]+px[i+2])/3};
  // moldura: vindo de fora, pula o branco externo (se houver), depois a linha/borda escura, e para no branco de dentro
  // moldura dupla: se outra linha escura vem logo depois (até 10% da imagem), pula ela também
  const inward=(get,n)=>{let k=0;while(k<n/3&&get(k)>225)k++;while(k<n/3&&get(k)<=225)k++;
    for(let r=0;r<2;r++){let j=k;while(j<k+n*.1&&get(j)>225)j++;if(j>=k+n*.1)break;k=j;while(k<n/3&&get(k)<=225)k++;}return k;};
  const edge=(dx,dy)=>dx<0?Math.min(inward(k=>lum(k,H>>1),W),inward(k=>lum(k,Math.round(H*.2)),W)):Math.min(...[.15,.5,.85].map(f=>inward(k=>lum(Math.round(W*f),k),H)));   // topo: moldura pode ter recorte no meio
  const L=edge(-1,0)+4,T=edge(0,-1)+4;
  // direita e baixo medidos de verdade; se o personagem encosta na moldura (medida falha), espelha o lado oposto
  const rr=inward(k=>lum(W-1-k,H>>1),W), bb=Math.min(...[.15,.85].map(f=>inward(k=>lum(Math.round(W*f),H-1-k),H)));
  const R=rr<W/3-1?W-1-rr-4:W-1-L, B=bb<H/3-1?H-1-bb-4:H-1-T;   // moldura com a mesma espessura dos dois lados
  // flood fill do branco a partir das bordas da área interna
  const seen=new Uint8Array(W*H),st=[];
  // não passa a menos de 3 px do desenho (frestas no contorno não deixam o fundo entrar no cabelo/armadura brancos)
  const nearInk=new Uint8Array(W*H);
  for(let y=T;y<=B;y++)for(let x=L;x<=R;x++)if(!white((y*W+x)*4))for(let dy=-3;dy<=3;dy++)for(let dx=-3;dx<=3;dx++){const nx=x+dx,ny=y+dy;if(nx>=0&&ny>=0&&nx<W&&ny<H)nearInk[ny*W+nx]=1;}
  const push=(x,y)=>{if(x<L||x>R||y<T||y>B)return;const k=y*W+x;if(seen[k])return;if(!white(k*4)||nearInk[k])return;seen[k]=1;st.push(k)};
    // cada região branca encostada na borda é medida: só sai se for grande (o fundo) ou estiver num canto.
  // Branco pequeno encostado na borda é desenho (cabelo branco que sai da moldura, por exemplo).
  const area=(R-L+1)*(B-T+1), near=(x,y)=>Math.min(x-L,R-x)<60&&Math.min(y-T,B-y)<60;
  const tryRegion=(x0,y0)=>{const k0=y0*W+x0;if(seen[k0]||!white(k0*4))return;const reg=[];st.push(k0);seen[k0]=1;let corner=false;
    while(st.length){const k=st.pop(),x=k%W,y=(k/W)|0;reg.push(k);if(near(x,y))corner=true;push(x+1,y);push(x-1,y);push(x,y+1);push(x,y-1)}
    if(!(reg.length>area*.015||corner))reg.forEach(k=>seen[k]=2);};
  for(let x=L;x<=R;x++){tryRegion(x,T);tryRegion(x,B)} for(let y=T;y<=B;y++){tryRegion(L,y);tryRegion(R,y)}
  for(let k=0;k<W*H;k++)if(seen[k]===2)seen[k]=0;
  // vãos internos (entre as pontas de um cachecol, braço e corpo): branco liso e grande é fundo; branco com sombra é desenho
  {const lab=new Uint8Array(W*H);
   for(let y=T;y<=B;y++)for(let x=L;x<=R;x++){const k0=y*W+x;if(seen[k0]||lab[k0]||!white(k0*4)||nearInk[k0])continue;
     const q=[k0],reg=[];lab[k0]=1;let sm=0,sq=0;
     while(q.length){const k=q.pop();reg.push(k);const l=lum(k%W,(k/W)|0);sm+=l;sq+=l*l;const x2=k%W,y2=(k/W)|0;
       for(const n of [k-1,k+1,k-W,k+W]){const nx=n%W,ny=(n/W)|0;if(nx<L||nx>R||ny<T||ny>B)continue;if(!lab[n]&&!seen[n]&&white(n*4)&&!nearInk[n]){lab[n]=1;q.push(n)}}}
     const m=sm/reg.length,sd=Math.sqrt(Math.max(0,sq/reg.length-m*m));
     if(reg.length>area*.003&&m>242&&sd<4)reg.forEach(k=>seen[k]=1);}}
  // volta os 3 px até o contorno
  for(let step=0;step<3;step++){const add=[];for(let y=T;y<=B;y++)for(let x=L;x<=R;x++){const k=y*W+x;if(seen[k]||!white(k*4))continue;if(seen[k-1]===1||seen[k+1]===1||seen[k-W]===1||seen[k+W]===1)add.push(k)}add.forEach(k=>seen[k]=1)}
  // halo claro do jpeg encostado no fundo também sai
  for(let pass=0;pass<2;pass++){const add=[];for(let y=T;y<=B;y++)for(let x=L;x<=R;x++){const k=y*W+x;if(seen[k])continue;const i=k*4;
    if((px[i]+px[i+1]+px[i+2])/3>170&&(seen[k-1]||seen[k+1]||seen[k-W]||seen[k+W]))add.push(k)} add.forEach(k=>seen[k]=1)}
  for(let k=0;k<W*H;k++) if(seen[k]) px[k*4+3]=0;
  g.putImageData(d,0,0);
  // compõe 160x160
  const S=160,o=document.createElement('canvas');o.width=o.height=S;const q=o.getContext('2d');
  const mix=(a,b,t)=>{const A=parseInt(a.slice(1),16),Bb=parseInt(b.slice(1),16);const ch=s=>Math.round(((A>>s)&255)*(1-t)+((Bb>>s)&255)*t);return `rgb(${ch(16)},${ch(8)},${ch(0)})`};
  const bg=q.createRadialGradient(80,62,8,80,80,115);bg.addColorStop(0,mix(gl,'#0b0a18',.45));bg.addColorStop(.55,mix(gl,'#0b0a18',.82));bg.addColorStop(1,'#07060f');
  q.fillStyle=bg;q.fillRect(0,0,S,S);
  q.globalAlpha=.12;q.fillStyle=gl;for(let y=0;y<S;y+=10)for(let x=(y/10%2)*10;x<S;x+=20)q.fillRect(x,y,1,1);
  q.globalAlpha=.18;q.strokeStyle=gl;q.lineWidth=1;q.beginPath();q.arc(80,56,48,0,Math.PI*2);q.stroke();
  q.globalAlpha=1;q.imageSmoothingEnabled=true;q.imageSmoothingQuality='high';
  q.drawImage(c,L,T,R-L,B-T,0,0,S,S);
  return {url:o.toDataURL('image/webp',.9),crop:[L,T,R,B,W,H]};
 },[src,gl]);
 console.log(id,JSON.stringify(out[id].crop),out[id].url.length);
 fs.writeFileSync(`pnew_${id}.webp`,Buffer.from(out[id].url.split(',')[1],'base64'));
}
await p.setContent('<body style="background:#1a1830;display:flex;gap:10px;padding:10px">'+Object.entries(out).map(([k,v])=>`<div style="color:#ccc;font:12px monospace"><img src="${v.url}" width="160"><br>${k}</div>`).join('')+'</body>');
await p.waitForTimeout(300);await p.screenshot({path:'pnew.png'});await b.close();})();
