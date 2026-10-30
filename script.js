document.querySelectorAll('nav a[href]').forEach(a=>{if(a.getAttribute('href')===location.pathname.split('/').pop()||(a.getAttribute('href')==='index.html'&&!location.pathname.split('/').pop()))a.setAttribute('aria-current','page')});
const io=new IntersectionObserver(e=>e.forEach(x=>{if(x.isIntersecting){x.target.classList.add('in');io.unobserve(x.target)}}),{threshold:.4});
document.querySelectorAll('.bars').forEach(b=>io.observe(b));

const lb=document.getElementById('lb');
if(lb){document.querySelectorAll('.chips button').forEach(c=>c.addEventListener('click',()=>{document.querySelectorAll('.chips button').forEach(x=>x.setAttribute('aria-pressed',x===c));
document.querySelectorAll('.grid button').forEach(b=>b.hidden=c.dataset.f!=='all'&&b.dataset.b!==c.dataset.f)}));
document.querySelectorAll('.grid button').forEach(b=>b.addEventListener('click',()=>{const i=b.querySelector('img');lb.firstElementChild.src=i.src;lb.firstElementChild.alt=i.alt;lb.hidden=false}));
lb.addEventListener('click',()=>lb.hidden=true);addEventListener('keydown',e=>{if(e.key==='Escape')lb.hidden=true})}

const pr=document.querySelector('.pg');
if(pr&&!matchMedia('(prefers-reduced-motion: reduce)').matches){const bs=pr.querySelectorAll('b[data-n]'),fmt=(b,v)=>b.textContent=(b.dataset.pre||'')+v+(b.dataset.suf||'');bs.forEach(b=>fmt(b,0));
new IntersectionObserver((e,o)=>{if(e[0].isIntersecting){o.disconnect();const t0=performance.now();(function f(t){const p=Math.min((t-t0)/1300,1),k=1-Math.pow(1-p,3);bs.forEach(b=>fmt(b,Math.round(+b.dataset.n*k)));if(p<1)requestAnimationFrame(f)})(t0)}},{threshold:.4}).observe(pr)}

const io2=new IntersectionObserver(e=>e.forEach(x=>{if(x.isIntersecting){x.target.classList.add('in');io2.unobserve(x.target)}}),{threshold:.08});
document.querySelectorAll('.case,.panel,.flow').forEach(c=>io2.observe(c));

const ftabs=document.querySelector('.ftabs');
if(ftabs){const track=document.querySelector('.svctrack');
const panels=document.querySelectorAll('.svcpanel');
const shut=()=>document.querySelectorAll('.fnode.is-open').forEach(o=>{o.classList.remove('is-open');o.setAttribute('aria-expanded','false')});
const show=k=>{shut();track.dataset.active=k;
ftabs.querySelectorAll('button').forEach(x=>x.setAttribute('aria-pressed',x.dataset.flow===k));
panels.forEach(p=>{const on=p.dataset.flow===k;p.inert=!on;p.setAttribute('aria-hidden',String(!on));if(on)p.querySelector('.flow').classList.add('in')})};
ftabs.querySelectorAll('button').forEach(t=>t.addEventListener('click',()=>show(t.dataset.flow)));
show('gen');
document.querySelectorAll('.fnode').forEach(n=>n.addEventListener('click',()=>{const was=n.classList.contains('is-open');shut();
if(!was){n.classList.add('is-open');n.setAttribute('aria-expanded','true')}}));
addEventListener('click',e=>{if(!e.target.closest('.fnode'))shut()});
addEventListener('keydown',e=>{if(e.key==='Escape')shut()})}


document.querySelectorAll('.more').forEach(m=>{const b=m.querySelector('.more-btn'),card=m.closest('.case');
const set=o=>{m.classList.toggle('is-open',o);b.setAttribute('aria-expanded',o)};
b.addEventListener('click',()=>set(!m.classList.contains('is-open')));
new IntersectionObserver(e=>{if(e[0].isIntersecting||!m.classList.contains('is-open'))return;
if(card.getBoundingClientRect().bottom<0){const h0=card.offsetHeight;m.classList.add('instant');set(false);scrollBy(0,card.offsetHeight-h0);requestAnimationFrame(()=>requestAnimationFrame(()=>m.classList.remove('instant')))}else set(false)},{threshold:0}).observe(card)});
