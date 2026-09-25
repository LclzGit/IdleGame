// Recorta poses das fichas, remove o fundo claro (flood fill a partir das bordas) e reduz pra altura alvo.
const { chromium } = require('playwright');const fs=require('fs');
const H=72; // altura em pixels de tela (36 lógicos no canvas 2x)
// w = quadros de caminhada, a = [mira, disparo]. A escala do personagem vem do 1º quadro de caminhada.
const C={
 bulwark7:['ref04.jpeg',{w:[[270,520,347,665],[385,520,470,665]],a:[[800,520,945,665]]}],
 sentinel:['ref05.jpeg',{w:[[275,545,352,645],[385,545,472,645]],a:[[280,880,475,1003,.98]]}],
 valkyrie:['ref06.jpeg',{w:[[628,403,708,494],[265,403,335,494]],a:[[338,404,470,494]]}],
 aura2:['ref07.jpeg',{w:[[628,403,708,494],[268,403,332,494]],a:[[5,712,195,835,.95]]}],
 x1:['ref08.jpeg',{w:[[636,406,708,494],[268,406,332,494]],a:[[5,712,190,835,.95]]}],
 infiltrator:['ref09.jpeg',{w:[[228,530,300,670]],a:[[180,720,310,845]]}],
 ghost:['ref10.jpeg',{w:[[230,530,305,670]],a:[[335,530,490,670],[180,720,330,845]]}],
 archer:['ref11.jpeg',{w:[[230,530,300,670],[340,530,420,670]],a:[[485,520,610,670],[185,715,315,850]]}],
 pulse:['ref12.jpeg',{w:[[20,705,185,845]],a:[[20,705,185,845],[20,895,160,1015]]}],
 blade:['ref12.jpeg',{w:[[340,530,470,670],[330,885,475,1015]],a:[[340,530,470,670]]}],
 nighthawk:['ref12.jpeg',{w:[[490,870,610,1015],[490,530,610,670]],a:[[490,530,610,670],[485,700,615,845]]}],
 lasert:['ref13.jpeg',{w:[[230,530,300,670],[190,870,300,1015]],a:[[340,530,460,670],[185,705,335,845]]}],
 tankm1:['ref14.jpeg',{w:[[318,728,462,835]],a:[[318,728,462,835],[468,722,620,835]]}],
};
(async()=>{const b=await chromium.launch();const p=await b.newPage();const out={};let sheet='';
for(const [id,[f,set]] of Object.entries(C)){const boxes=[...set.w,...set.a],nW=set.w.length;
 const src='data:image/jpeg;base64,'+fs.readFileSync(f).toString('base64');
 out[id]=await p.evaluate(async([src,boxes,H])=>{
  const im=new Image();im.src=src;await im.decode();
  const res=[];
  for(let [x0,y0,x1,y1,hn] of boxes){x0-=6;y0-=6;x1+=6;y1+=6;const T1=46;
   const w=x1-x0,h=y1-y0,c=document.createElement('canvas');c.width=w;c.height=h;const g=c.getContext('2d');g.drawImage(im,x0,y0,w,h,0,0,w,h);
   const d=g.getImageData(0,0,w,h),a=d.data;
   // fundo = as 2 cores mais comuns da borda (fundo liso + linhas da grade)
   const cnt={};const add=(x,y)=>{const i=(y*w+x)*4;const k=(a[i]>>4)+','+(a[i+1]>>4)+','+(a[i+2]>>4);cnt[k]=cnt[k]||[0,0,0,0];const c=cnt[k];c[0]++;c[1]+=a[i];c[2]+=a[i+1];c[3]+=a[i+2];};
   for(let x=0;x<w;x++){add(x,0);add(x,h-1);}for(let y=0;y<h;y++){add(0,y);add(w-1,y);}
   const pal=Object.values(cnt).sort((p,q)=>q[0]-p[0]).slice(0,3).filter((c,i,arr)=>c[0]>arr[0][0]*.08).map(c=>[c[1]/c[0],c[2]/c[0],c[3]/c[0]]);
   const near=(i,t)=>{for(const q of pal){const dr=a[i]-q[0],dg=a[i+1]-q[1],db=a[i+2]-q[2];if(dr*dr+dg*dg+db*db<t*t)return true;}return false;};
   const seen=new Uint8Array(w*h),st=[];
   for(let x=0;x<w;x++){st.push(x,(h-1)*w+x);}for(let y=0;y<h;y++){st.push(y*w,y*w+w-1);}
   while(st.length){const k=st.pop();if(seen[k])continue;seen[k]=1;const i=k*4;if(!near(i,T1))continue;a[i+3]=0;const x=k%w,y=(k/w)|0;
     if(x>0)st.push(k-1);if(x<w-1)st.push(k+1);if(y>0)st.push(k-w);if(y<h-1)st.push(k+w);}
   // fundo preso dentro (entre braço e corpo): só bolsões grandes de cor de fundo (brilho de armadura clara fica)
   {const vis=new Uint8Array(w*h);for(let k=0;k<w*h;k++){if(vis[k]||!a[k*4+3]||!near(k*4,T1*.6))continue;const q=[k],comp=[];vis[k]=1;while(q.length){const m=q.pop();comp.push(m);const x=m%w,y=(m/w)|0;for(const nn of [x>0?m-1:-1,x<w-1?m+1:-1,y>0?m-w:-1,y<h-1?m+w:-1])if(nn>=0&&!vis[nn]&&a[nn*4+3]&&near(nn*4,T1*.6)){vis[nn]=1;q.push(nn);}}if(comp.length>=25)comp.forEach(m=>a[m*4+3]=0);}}
   // linhas da grade da ficha: faixas retas de cor uniforme atravessando o recorte
   const sim=(i,j)=>Math.abs(a[i]-a[j])+Math.abs(a[i+1]-a[j+1])+Math.abs(a[i+2]-a[j+2])<40;
   const op=(x,y)=>x>=0&&y>=0&&x<w&&y<h&&a[(y*w+x)*4+3];
   // linhas finas (1-2 px) retas: vazio a 2 px de cada lado na maior parte do trecho
   for(let pass=0;pass<2;pass++){
   for(let y=0;y<h;y++){let x=0;while(x<w){if(!op(x,y)){x++;continue;}let e=x;while(e+1<w&&op(e+1,y)&&sim((y*w+x)*4,(y*w+e+1)*4))e++;const L=e-x+1;if(L>=w*.18){let thin=0;for(let z=x;z<=e;z++)if(!op(z,y-2)&&!op(z,y+2))thin++;if(thin>=L*.6)for(let z=x;z<=e;z++){a[(y*w+z)*4+3]=0;if(op(z,y+1)&&!op(z,y+2))a[((y+1)*w+z)*4+3]=0;}}x=e+1;}}
   for(let x=0;x<w;x++){let y=0;while(y<h){if(!op(x,y)){y++;continue;}let e=y;while(e+1<h&&op(x,e+1)&&sim((y*w+x)*4,((e+1)*w+x)*4))e++;const L=e-y+1;if(L>=h*.18){let thin=0;for(let z=y;z<=e;z++)if(!op(x-2,z)&&!op(x+2,z))thin++;if(thin>=L*.6)for(let z=y;z<=e;z++){a[(z*w+x)*4+3]=0;if(op(x+1,z)&&!op(x+2,z))a[(z*w+x+1)*4+3]=0;}}y=e+1;}}
   }
   for(let y=0;y<h;y++){let x=0;while(x<w){if(!a[(y*w+x)*4+3]){x++;continue;}let e=x;while(e+1<w&&a[(y*w+e+1)*4+3]&&sim((y*w+x)*4,(y*w+e+1)*4))e++;if(e-x+1>=w*.55)for(let z=x;z<=e;z++)a[(y*w+z)*4+3]=0;x=e+1;}}
   for(let x=0;x<w;x++){let y=0;while(y<h){if(!a[(y*w+x)*4+3]){y++;continue;}let e=y;while(e+1<h&&a[((e+1)*w+x)*4+3]&&sim((y*w+x)*4,((e+1)*w+x)*4))e++;if(e-y+1>=h*.55)for(let z=y;z<=e;z++)a[(z*w+x)*4+3]=0;y=e+1;}}
   // halo claro na borda
   for(let pass=0;pass<2;pass++){const kill=[];for(let k=0;k<w*h;k++){if(!a[k*4+3])continue;const x=k%w,y=(k/w)|0;const nb=[k-1,k+1,k-w,k+w].some(n=>n>=0&&n<w*h&&!a[n*4+3]);if(nb&&near(k*4,T1*1.6))kill.push(k);}kill.forEach(k=>a[k*4+3]=0);}
   // mantém só a maior mancha (o personagem) e o que estiver colado nela
   const lab=new Int32Array(w*h).fill(-1),sizes=[];
   for(let k=0;k<w*h;k++){if(!a[k*4+3]||lab[k]>=0)continue;const id=sizes.length;let n=0;const q=[k];lab[k]=id;while(q.length){const m=q.pop();n++;const x=m%w,y=(m/w)|0;for(const nn of [x>0?m-1:-1,x<w-1?m+1:-1,y>0?m-w:-1,y<h-1?m+w:-1,(x>0&&y>0)?m-w-1:-1,(x<w-1&&y>0)?m-w+1:-1,(x>0&&y<h-1)?m+w-1:-1,(x<w-1&&y<h-1)?m+w+1:-1])if(nn>=0&&a[nn*4+3]&&lab[nn]<0){lab[nn]=id;q.push(nn);}}sizes.push(n);}
   const big=sizes.indexOf(Math.max(...sizes));
   for(let k=0;k<w*h;k++)if(a[k*4+3]&&sizes[lab[k]]<sizes[big]*.04)a[k*4+3]=0;
   g.putImageData(d,0,0);
   // recorta a caixa útil
   let mx=w,my=h,Mx=0,My=0;for(let k=0;k<w*h;k++)if(a[k*4+3]){const x=k%w,y=(k/w)|0;mx=Math.min(mx,x);my=Math.min(my,y);Mx=Math.max(Mx,x);My=Math.max(My,y);}
   const cw=Mx-mx+1,ch=My-my+1;
   // centro dos pés: média x dos pixels opacos nos 12% de baixo
   let fs=0,fn=0;for(let y=My-Math.max(2,Math.round(ch*.12));y<=My;y++)for(let x=mx;x<=Mx;x++)if(a[(y*w+x)*4+3]){fs+=x-mx;fn++;}
   res.push({c,mx,my,cw,ch,fx:fn?fs/fn:cw/2,hn});
  }
  const sc=H/res[0].ch;
  return res.map(r=>{const k=r.hn?H*r.hn/r.ch:sc;const tw=Math.max(1,Math.round(r.cw*k)),th=Math.max(1,Math.round(r.ch*k));const o=document.createElement('canvas');o.width=tw;o.height=th;const og=o.getContext('2d');og.imageSmoothingQuality='high';og.drawImage(r.c,r.mx,r.my,r.cw,r.ch,0,0,tw,th);return {u:o.toDataURL('image/webp',.9),w:tw,h:th,fx:Math.round(r.fx*k)};});
  },[src,boxes,H]);
 const fr=out[id]; out[id]={w:fr.slice(0,nW),a:fr.slice(nW)};

 sheet+=`<div style="display:inline-block;margin:4px;color:#aaa;font:11px sans-serif">${id}<br>${[...out[id].w,...out[id].a].map(r=>`<img src="${r.u}" style="background:#0e0c1d;image-rendering:pixelated" width="${r.w*2}" height="${r.h*2}">`).join('')}</div>`;
}
fs.writeFileSync('../sprites.js','\n// ---------- sprites de batalha recortados das fichas: w = caminhada, a = [mira, disparo]; [imagem, largura, altura, x dos pés] ----------\nconst SHEET_SPR = '+JSON.stringify(Object.fromEntries(Object.entries(out).map(([k,v])=>[k,{w:v.w.map(r=>[r.u,r.w,r.h,r.fx]),a:v.a.map(r=>[r.u,r.w,r.h,r.fx])}])))+';\n');
await p.setViewportSize({width:1400,height:900});await p.setContent('<body style="background:#222;margin:0">'+sheet+'</body>');await p.waitForTimeout(400);await p.screenshot({path:'../sprsheet.png',fullPage:true});
await b.close();})();
