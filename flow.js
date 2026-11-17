/* Flow backgrounds: a soft green wave that the mouse pushes around like wet
   paint, then slowly settles. Drawn live with WebGL, no image files.
   Two places use it: the home hero (top of the page) and the footer wordmark
   (bottom of every page). If WebGL2 is missing, nothing is added and the page
   looks the way it did before. */
(function(){
const still=matchMedia('(prefers-reduced-motion: reduce)').matches;
const root=document.documentElement;

const VS=`#version 300 es
in vec2 p;out vec2 vUv;
void main(){vUv=p*.5+.5;gl_Position=vec4(p,0.,1.);}`;

/* The "paint" memory: a small texture that remembers which way the mouse
   pushed each spot. It drifts a little and fades back to nothing.
   .5  = how fast it settles (lower is slower)
   .05 = brush size
   The four-neighbour average keeps the pushed edge soft; without it the
   front of a fast stroke shows as a jagged staircase. */
const FLOW=`#version 300 es
precision highp float;
uniform sampler2D uPrev;uniform vec2 uMouse,uVel;uniform float uAspect,uDt,uPush;
in vec2 vUv;out vec4 o;
void main(){
vec2 v=texture(uPrev,vUv).xy;
vec2 q=vUv-vec2(v.x/uAspect,v.y)*uDt*.3,px=1./vec2(textureSize(uPrev,0));
v=mix(texture(uPrev,q).xy,(texture(uPrev,q+vec2(px.x,0.)).xy+texture(uPrev,q-vec2(px.x,0.)).xy+texture(uPrev,q+vec2(0.,px.y)).xy+texture(uPrev,q-vec2(0.,px.y)).xy)*.25,.22);
v*=exp(-uDt*.5);
vec2 d=vUv-uMouse;d.x*=uAspect;
float f=exp(-dot(d,d)/.05);
v+=(uVel-v)*f*uPush;
o=vec4(v,0.,1.);}`;

/* The picture: a glowing ridge, bright green at the edge, deeper green below,
   black everywhere else.
   uShape = (ridge height at the low end, how much it rises, 1 to mirror it,
             1 to fade to black at the bottom)
   .3 = how far the paint moves when pushed */
const DRAW=`#version 300 es
precision highp float;
uniform sampler2D uFlow;uniform float uAspect,uTime,uDepth;uniform vec4 uShape;
in vec2 vUv;out vec4 o;
const vec3 BG=vec3(.0275,.0471,.0196);
const vec3 DEEP=vec3(.105,.175,.065);
const vec3 MID=vec3(.33,.47,.21);
const vec3 ACC=vec3(.812,.910,.663);
float h(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
float n(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);
return mix(mix(h(i),h(i+vec2(1,0)),f.x),mix(h(i+vec2(0,1)),h(i+vec2(1,1)),f.x),f.y);}
void main(){
vec2 fl=texture(uFlow,vUv).xy;
vec2 uv=vUv-vec2(fl.x/uAspect,fl.y)*.3;
float t=uTime;
float x=mix(uv.x,1.-uv.x,uShape.z);
float w=n(vec2(x*1.6+t*.03,uv.y*1.6-t*.02))-.5;
float ridge=uShape.x+uShape.y*smoothstep(.12,1.02,x)+.045*sin(x*4.6+t*.22)+.025*sin(x*9.-t*.17)+w*.1;
float d=ridge-uv.y;
vec3 c;
if(d<0.){float g=exp(d*13.);c=mix(BG,ACC*.92,g*g);}
else{d*=uDepth;c=mix(ACC*.92,MID,smoothstep(0.,.11,d));
c=mix(c,DEEP,smoothstep(.05,.27,d));
c=mix(c,BG,smoothstep(.2,.56,d));}
float edge=mix(1.,smoothstep(0.,.26,vUv.y),uShape.w)*smoothstep(1.,.84,vUv.y);
c=mix(BG,c,edge);
float lum=dot(c,vec3(.3,.6,.1));
c+=(h(gl_FragCoord.xy)-.5)*(.03+lum*.13)*edge;
o=vec4(c,1.);}`;

/* o.place() returns {top,height} in page pixels; o.shape and o.depth feed DRAW. */
function make(o){
const cv=document.createElement('canvas');
cv.className='flowbg';cv.setAttribute('aria-hidden','true');
const gl=cv.getContext('webgl2',{antialias:false,alpha:false,powerPreference:'low-power'});
if(!gl)return false;
if(!gl.getExtension('EXT_color_buffer_float')&&!gl.getExtension('EXT_color_buffer_half_float'))return false;

function sh(type,src){const s=gl.createShader(type);gl.shaderSource(s,src);gl.compileShader(s);
if(!gl.getShaderParameter(s,gl.COMPILE_STATUS)){console.warn('flow.js',gl.getShaderInfoLog(s));return null}return s}
function prog(fs){const a=sh(gl.VERTEX_SHADER,VS),b=sh(gl.FRAGMENT_SHADER,fs);if(!a||!b)return null;
const p=gl.createProgram();gl.attachShader(p,a);gl.attachShader(p,b);gl.bindAttribLocation(p,0,'p');gl.linkProgram(p);
if(!gl.getProgramParameter(p,gl.LINK_STATUS))return null;
const u={};const k=gl.getProgramParameter(p,gl.ACTIVE_UNIFORMS);
for(let i=0;i<k;i++){const nm=gl.getActiveUniform(p,i).name;u[nm]=gl.getUniformLocation(p,nm)}
return{p,u}}
const pf=prog(FLOW),pd=prog(DRAW);
if(!pf||!pd)return false;

gl.bindBuffer(gl.ARRAY_BUFFER,gl.createBuffer());
gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,3,-1,-1,3]),gl.STATIC_DRAW);
gl.enableVertexAttribArray(0);gl.vertexAttribPointer(0,2,gl.FLOAT,false,0,0);

const FW=256;let FH=0,aspect=2,tg=[];
function target(w,hh){const tex=gl.createTexture();gl.bindTexture(gl.TEXTURE_2D,tex);
gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA16F,w,hh,0,gl.RGBA,gl.HALF_FLOAT,null);
gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.LINEAR);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.LINEAR);
gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE);
const fb=gl.createFramebuffer();gl.bindFramebuffer(gl.FRAMEBUFFER,fb);
gl.framebufferTexture2D(gl.FRAMEBUFFER,gl.COLOR_ATTACHMENT0,gl.TEXTURE_2D,tex,0);
const ok=gl.checkFramebufferStatus(gl.FRAMEBUFFER)===gl.FRAMEBUFFER_COMPLETE;
gl.clearColor(0,0,0,1);gl.clear(gl.COLOR_BUFFER_BIT);
return ok?{tex,fb}:null}
function makeTargets(){tg.forEach(t=>{if(t){gl.deleteTexture(t.tex);gl.deleteFramebuffer(t.fb)}});
tg=[target(FW,FH),target(FW,FH)];return !!(tg[0]&&tg[1])}

function size(){const b=o.place();
const w=root.clientWidth,top=Math.round(b.top),hh=Math.round(b.height);
if(!w||!(hh>0))return tg.length>0;
cv.style.top=top+'px';cv.style.height=hh+'px';
const dpr=Math.min(devicePixelRatio||1,1.5);
const W=Math.round(w*dpr),H=Math.round(hh*dpr);
if(cv.width!==W||cv.height!==H){cv.width=W;cv.height=H}
aspect=w/hh;
const nh=Math.max(96,Math.round(FW/aspect));
if(nh!==FH||!tg.length){FH=nh;if(!makeTargets())return false}
return true}

document.body.prepend(cv);
if(!size()||!tg.length){cv.remove();return false}

let mx=.5,my=.5,vx=0,vy=0,tx=0,ty=0,have=false,lastMove=0;
if(!still)addEventListener('pointermove',e=>{const r=cv.getBoundingClientRect();
const x=(e.clientX-r.left)/r.width,y=1-(e.clientY-r.top)/r.height,now=performance.now();
if(have){const dt=Math.max((now-lastMove)/1000,.008);
tx=(x-mx)*aspect/dt;ty=(y-my)/dt;
const m=Math.hypot(tx,ty),cap=3;if(m>cap){tx*=cap/m;ty*=cap/m}}
mx=x;my=y;have=true;lastMove=now},{passive:true});

let last=0,time=o.seed||0,run=false,vis=!document.hidden,raf=0;
function draw(){gl.useProgram(pd.p);gl.bindFramebuffer(gl.FRAMEBUFFER,null);gl.viewport(0,0,cv.width,cv.height);
gl.activeTexture(gl.TEXTURE0);gl.bindTexture(gl.TEXTURE_2D,tg[0].tex);
gl.uniform1i(pd.u.uFlow,0);gl.uniform1f(pd.u.uAspect,aspect);gl.uniform1f(pd.u.uTime,time);
gl.uniform1f(pd.u.uDepth,o.depth);gl.uniform4fv(pd.u.uShape,o.shape);
gl.drawArrays(gl.TRIANGLES,0,3)}
function frame(now){raf=0;
const dt=Math.min((now-last)/1000||.016,.034);last=now;time+=dt;
if(now-lastMove>60){tx=0;ty=0}
vx+=(tx-vx)*.35;vy+=(ty-vy)*.35;
const sp=Math.hypot(vx,vy);
gl.useProgram(pf.p);gl.viewport(0,0,FW,FH);
gl.bindFramebuffer(gl.FRAMEBUFFER,tg[1].fb);
gl.activeTexture(gl.TEXTURE0);gl.bindTexture(gl.TEXTURE_2D,tg[0].tex);
gl.uniform1i(pf.u.uPrev,0);gl.uniform2f(pf.u.uMouse,mx,my);gl.uniform2f(pf.u.uVel,vx,vy);
gl.uniform1f(pf.u.uAspect,aspect);gl.uniform1f(pf.u.uDt,dt);gl.uniform1f(pf.u.uPush,Math.min(sp*1.5,1)*.8);
gl.drawArrays(gl.TRIANGLES,0,3);
tg.reverse();
draw();
if(run&&vis&&!still)raf=requestAnimationFrame(frame)}
function kick(){if(!raf&&run&&vis&&!still){last=performance.now();raf=requestAnimationFrame(frame)}}
function resize(){if(size()){if(still||!run||!vis)draw();else kick()}}
addEventListener('resize',resize);
if(window.ResizeObserver)new ResizeObserver(resize).observe(document.body);
new IntersectionObserver(e=>{run=e[e.length-1].isIntersecting;kick()}).observe(cv);
document.addEventListener('visibilitychange',()=>{vis=!document.hidden;kick()});
draw();
return true}

/* Top wave, every page: from the very top of the page to just below the page
   header, so it has faded out before the content starts. On Home that header
   is the hero and the band ends 30px below it, before the small "Brands I've
   worked with" label. The other four pages use their own header: .glowhead on
   Work, About and Contact, the .phead block on the Ad library.
   The ridge starts low on the left, under the copy, and rises to the right.
   Work, Ads and Contact have a short header (about 207px against the hero's
   560px), so the band gets a 400px floor. Without it the band is only ~313px,
   the ridge flattens into a horizontal stripe running straight through the
   title and the copy loses contrast. Measured on Work at 1280px: 330 is a
   stripe over the copy, 470 pushes the ridge down into the first case card.
   400 keeps the rising shape, leaves the copy on dark and has faded by the
   time the card starts. */
const hero=document.querySelector('.hero2, .glowhead, .phead');
if(hero){const floor=hero.classList.contains('hero2')?0:400;
if(make({shape:[.27,.46,0,1],depth:1,place(){
return{top:0,height:Math.max(hero.getBoundingClientRect().bottom+scrollY+30,floor)}}}))root.classList.add('flowon')}

/* Footer: only the band behind the big "Miguel" wordmark, so the footer links
   and the legal line above it always stay on plain dark. Mirrored, so it
   rises to the left and does not repeat the hero. */
const word=document.querySelector('footer .fword'),foot=document.querySelector('footer');
if(word&&foot&&make({shape:[.4,.28,1,0],depth:.5,seed:40,place(){
const top=word.getBoundingClientRect().top+scrollY;
return{top,height:foot.getBoundingClientRect().bottom+scrollY-top}}}))root.classList.add('flowfoot');
})();
