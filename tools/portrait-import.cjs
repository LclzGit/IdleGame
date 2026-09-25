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
  const edge=(dx,dy)=>{let x=W>>1,y=Math.round(H*.12);if(dy){x=Math.round(W*.12);y=H>>1}
    // procura o primeiro pixel branco perto da borda, vindo de fora
    if(dx<0){for(let k=0;k<W/3;k++) if(lum(k,H>>1)>225||lum(k,Math.round(H*.2))>225) return k;}
    if(dx>0){for(let k=W-1;k>W*2/3;k--) if(lum(k,H>>1)>225||lum(k,Math.round(H*.2))>225) return k;}
    if(dy<0){for(let k=0;k<H/3;k++) if(lum(W>>1,k)>225||lum(Math.round(W*.15),k)>225) return k;}
    if(dy>0){for(let k=H-1;k>H*2/3;k--) if(lum(Math.round(W*.15),k)>225||lum(Math.round(W*.85),k)>225||lum(W>>1,k)>225) return k;}
    return 0;};
  const L=edge(-1,0)+4,T=edge(0,-1)+4,R=W-1-L,B=H-1-T;   // moldura com a mesma espessura dos dois lados
  // flood fill do branco a partir das bordas da área interna
  const seen=new Uint8Array(W*H),st=[];
  const push=(x,y)=>{if(x<L||x>R||y<T||y>B)return;const k=y*W+x;if(seen[k])return;if(!white(k*4))return;seen[k]=1;st.push(k)};
  for(let x=L;x<=R;x++){push(x,T);push(x,B)} for(let y=T;y<=B;y++){push(L,y);push(R,y)}
  while(st.length){const k=st.pop(),x=k%W,y=(k/W)|0;push(x+1,y);push(x-1,y);push(x,y+1);push(x,y-1)}
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
