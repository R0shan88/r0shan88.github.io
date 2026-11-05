'use strict';
function contentFragments(c){
 const p=c.profile||{},s=c.site||{},contact=c.contact||{},interests=Array.isArray(c.interests)?c.interests:[];
 const e=escapeHtml,link=(u,t,cls='')=>external(u,e(t),cls);
 const scholar=contact.scholarUrl?link(contact.scholarUrl,'Google Scholar ↗','scholar-nav'):'';
 const intro=String(c.about||'').trim().split(/\n\s*\n/).filter(Boolean).map(t=>`<p class="intro">${e(t).replace(/\n/g,'<br>')}</p>`).join('');
 const journey=(items,label)=>!Array.isArray(items)||!items.length?'':`<article><span class="mini-label">${label}</span>${items.filter(x=>x.hidden!==true).map(x=>`<div class="timeline"><span class="timeline-dot"></span>${x.date?`<small>${e(x.date)}</small>`:''}<h3>${e(x.title||'')}</h3>${x.subtitle?`<p>${e(x.subtitle)}</p>`:''}${x.description?`<p>${e(x.description).replace(/\n/g,'<br>')}</p>`:''}</div>`).join('')}</article>`;
 const work=journey(c.experience,'01 / 工作经历'),education=journey(c.education,'02 / 教育经历');
 return {
 header:`<a class="brand" href="#about"><span class="brand-mark">TW<span>↗</span></span><span>${e(p.nameEn||p.name||'')}<span class="brand-sub">个人学术主页</span></span></a><nav aria-label="主导航"><a href="#about">关于</a><a href="#experience">经历</a><a href="#research">研究成果</a><a href="#patents">专利</a></nav>${scholar}`,
 hero:`<div class="hero-copy">${s.eyebrow?`<p class="eyebrow"><span class="dot"></span>${e(s.eyebrow)}</p>`:''}<h1>${e(p.name||'')}<span>${e(p.nameEn||'')}<span class="name-dot">.</span></span></h1>${p.affiliation?`<p class="affiliation">${e(p.affiliation)}</p>`:''}${intro}<div class="hero-actions"><a class="button" href="#research">浏览研究成果 <span>↓</span></a>${contact.scholarUrl?link(contact.scholarUrl,'学术档案 ↗','text-link'):''}${contact.githubUrl?link(contact.githubUrl,'GitHub ↗','text-link'):''}</div></div>${interests.length?`<aside class="research-note"><span class="note-top">RESEARCH INTERESTS <span>01—${String(interests.length).padStart(2,'0')}</span></span><ol>${interests.map((x,i)=>`<li><span>${String(i+1).padStart(2,'0')}</span><div>${e(x.name||'')}<small>${e(x.translation||'')}</small></div><b>↗</b></li>`).join('')}</ol>${s.interestNote?`<p>${e(s.interestNote)}</p>`:''}</aside>`:''}`,
 experience:work||education?`<div class="section-heading"><div><p class="eyebrow">THE JOURNEY</p><h2>工作与教育经历<span>Experience & Education</span></h2></div></div><div class="journey-grid">${work}${education}</div>`:'',
 banner:`<div><p class="eyebrow">IDEAS INTO INVENTIONS</p><h2>${e(s.patentTitle||'专利成果')}</h2><p>${e(s.patentDescription||'')}</p></div><button class="button" id="show-patents">查看专利记录 <span>↗</span></button>`,
 closing:s.closingTitle?`<p class="eyebrow">A CONTINUING JOURNEY</p><h2>${e(s.closingTitle)}</h2>${contact.scholarUrl?link(contact.scholarUrl,'在 Google Scholar 查看最新动态 ↗','text-link'):''}`:'',
 footer:`<a href="#about">${e(p.name||'')} <span>/ ${e(p.nameEn||'')}</span></a><p>${e(s.footerNote||'')}</p><a href="#about">返回顶部 ↑</a>`,
 researchDescription:e(s.researchDescription||'')
 };
}
function applyContent(c){
 const f=contentFragments(c);
 for(const [id,key] of [['site-header','header'],['about','hero'],['experience','experience'],['patents','banner'],['site-closing','closing'],['site-footer','footer'],['research-description','researchDescription']]){
  const n=document.getElementById(id);if(n){n.innerHTML=f[key];if(['experience','closing'].includes(key))n.hidden=!f[key];}
 }
 if(c.profile)document.title=[c.profile.name,c.profile.nameEn,'个人主页'].filter(Boolean).join(' · ');
 const b=document.getElementById('show-patents');if(b)b.addEventListener('click',()=>{document.getElementById('search').value='';document.getElementById('year').value='all';document.getElementById('patent-status').value='all';chooseType('patent');document.getElementById('research').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'});});
}
