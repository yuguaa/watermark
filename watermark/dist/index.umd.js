(function(m,h){typeof exports=="object"&&typeof module<"u"?module.exports=h():typeof define=="function"&&define.amd?define(h):(m=typeof globalThis<"u"?globalThis:m||self,m.Watermark=h())})(this,function(){"use strict";var at=Object.defineProperty;var st=(m,h,M)=>h in m?at(m,h,{enumerable:!0,configurable:!0,writable:!0,value:M}):m[h]=M;var _=(m,h,M)=>st(m,typeof h!="symbol"?h+"":h,M);function m(i){return i.replace(/([A-Z])/g,"-$1").toLowerCase()}function h(i){return Object.keys(i).map(t=>`${m(t)}: ${i[t]};`).join(" ")}function M(){return window.devicePixelRatio||1}function z(i,t){for(let e in t)t[e]instanceof Object&&e in i&&Object.assign(t[e],z(i[e],t[e]));return Object.assign(i||{},t),i}function B(i){return/[\u4e00-\u9fa5]/.test(i)}const Y=i=>B(i)?4:3;function q(i){return B(i)?4:2}function C(i,t,e=1,n=!1){const a=document.createElement("canvas"),l=a.getContext("2d"),s=i*e,o=t*e;return a.setAttribute("width",`${s}px`),a.setAttribute("height",`${o}px`),n&&(l.fillStyle=`rgba(${Math.ceil(Math.random()*255)}, ${Math.ceil(Math.random()*255)}, ${Math.ceil(Math.random()*255)}, ${Math.random()})`,l.fillRect(0,0,a.width,a.height)),l.save(),[l,a,s,o]}function Z(i,t,e,n,a,l,s,o,p,g=!1){const[c,f,r,W]=C(n,a,e,g);if(i instanceof HTMLImageElement)c.drawImage(i,0,0,r,W);else{const{color:d,fontSize:u,fontStyle:x,fontWeight:k,fontFamily:nt,textAlign:ot}=l,K=Number(u)*e;c.font=`${x} normal ${k} ${K}px/${a}px ${nt}`,c.fillStyle=d,c.textAlign=ot,c.textBaseline="top";const j=Array.isArray(i)?i:[i];j==null||j.forEach((U,it)=>{c.fillText(U??"",r/2,it*(K+Y()*e)+q(U))})}const b=Math.PI/180*Number(t),N=Math.max(n,a),[I,J,v]=C(N,N,e,g);I.translate(v/2,v/2),I.rotate(b),r>0&&W>0&&I.drawImage(f,-r/2,-W/2);function Q(d,u){const x=d*Math.cos(b)-u*Math.sin(b),k=d*Math.sin(b)+u*Math.cos(b);return[x,k]}let A=0,L=0,$=0,O=0;const T=r/2,E=W/2;[[0-T,0-E],[0+T,0-E],[0+T,0+E],[0-T,0+E]].forEach(([d,u])=>{const[x,k]=Q(d,u);A=Math.min(A,x),L=Math.max(L,x),$=Math.min($,k),O=Math.max(O,k)});const V=A+v/2,tt=$+v/2,w=L-A,y=O-$,R=s*e,F=o*e,X=(w+R)*2,D=y+F,[G,et]=C(X,D,void 0,g);function P(d=0,u=0){G.globalAlpha=p,G.drawImage(J,V,tt,w,y,d,u,w,y)}return P(),P(w+R,-y/2-F/2),P(w+R,+y/2+F/2),[et.toDataURL(),X/e,D/e]}const S=class S{constructor(t){if(this.options=z({...S.DEFAULT_WATERMARK_OPTIONS},t),!this.options.container)throw new Error("container is required");if(!this.options.container instanceof HTMLElement)throw new Error("container must be a HTMLElement");this.options.container.style.position="relative",this.markStyle=this.getMarkStyle(),this.watermarkMap=new Map,this.renderWatermark()}getMarkStyle(){const{zIndex:t,gap:e,offset:n}=this.options,[a,l]=e,s=a/2,o=l/2,p=(n==null?void 0:n[0])??s,g=(n==null?void 0:n[1])??o;let c=p-s,f=g-o;const r={zIndex:t,position:"absolute",left:0,top:0,width:"100%",height:"100%",pointerEvents:"none",backgroundRepeat:"repeat",backgroundPosition:`${c>0?c:0}px ${f>0?f:0}px`};return c>0&&(r.left=`${c}px`,r.width=`calc(100% - ${c}px)`),f>0&&(r.top=`${f}px`,r.height=`calc(100% - ${f}px)`),r}getMarkSize(t){const{image:e,content:n,font:a={},width:l,height:s}=this.options;let o=120,p=64;if(!e&&t.measureText){t.font=`${Number(a.fontSize||16)}px ${a.fontFamily||"Microsoft YaHei"}`;const g=Array.isArray(n)?n:[n],c=g.map(f=>{const r=t.measureText(f);return[r.width,r.fontBoundingBoxAscent+r.fontBoundingBoxDescent+r.ideographicBaseline]});o=Math.ceil(Math.max(...c.map(f=>f[0]))),p=Math.floor(Math.max(...c.map(f=>f[1])))*g.length+(g.length-1)*Y()}return[l??o,s??p]}appendWatermark(t,e,n){if(n){const a=h({...this.markStyle,backgroundImage:`url('${t}')`,backgroundSize:`${Math.floor(e)}px`,visibility:"visible !important"});if(!this.watermarkMap.get(n)){const s=document.createElement("div");this.watermarkMap.set(n,s);const o=globalThis.MutationObserver||globalThis.WebKitMutationObserver;if(o){let p=new o(()=>{(!n.contains(this.watermarkMap.get(n))||s.getAttribute("style")!==a)&&(this.removeWatermark(n),this.watermarkMap.delete(n),p.disconnect(),p=null,this.renderWatermark())});p.observe(n,{attributes:!0,subtree:!0,childList:!0})}}const l=this.watermarkMap.get(n);l.setAttribute("style",a),n.append(l)}}removeWatermark(t){const e=this.watermarkMap.get(t);e&&t&&t.contains(e)&&t.removeChild(e),this.watermarkMap.delete(t)}renderWatermark(){const e=document.createElement("canvas").getContext("2d");if(e){const n=M(),[a,l]=this.getMarkSize(e),s=o=>{const[p,g]=Z(o,this.options.rotate,n,o.width||a,o.height||l,{color:this.options.font.color,fontSize:this.options.font.fontSize,fontStyle:this.options.font.fontStyle,fontWeight:this.options.font.fontWeight,fontFamily:this.options.font.fontFamily,textAlign:this.options.font.textAlign},this.options.gap[0],this.options.gap[1],this.options.globalAlpha,this.options.isDebug);this.appendWatermark(p,g,this.options.container)};if(this.options.image){const o=new Image;o.onload=()=>{s(o)},o.onerror=()=>{s(this.options.content)},o.crossOrigin="anonymous",o.referrerPolicy="no-referrer",o.src=this.options.image}else s(this.options.content)}}updateWatermark(t){this.options=z({...this.options},t),this.markStyle=this.getMarkStyle(),this.renderWatermark()}};_(S,"DEFAULT_WATERMARK_OPTIONS",{zIndex:9,content:["菠萝吹雪"],gap:[100,100],offset:[0,0],rotate:-22,globalAlpha:.15,isDebug:!1,font:{color:"#333",fontSize:16,fontStyle:"normal",fontWeight:"normal",fontFamily:"sans-serif",textAlign:"center"}});let H=S;return H});
