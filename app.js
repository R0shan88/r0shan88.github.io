'use strict';
let profile, activeType='all';
const $=id=>document.getElementById(id);
const escapeHtml=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const safeUrl=s=>{try{const u=new URL(s);return ['https:','http:'].includes(u.protocol)?u.href:'#';}catch{return '#';}};
const citationNumber=p=>parseInt(p.citations,10)||0;
function chooseType(type){activeType=type;document.querySelectorAll('[data-type]').forEach(b=>{b.classList.toggle('active',b.dataset.type===type);b.setAttribute('aria-pressed',b.dataset.type===type?'true':'false');});render();}
function render(){
 if(!profile)return;
 const query=$('search').value.trim().toLowerCase(),year=$('year').value,sort=$('sort').value;
 const rows=profile.publications.filter(p=>(activeType==='all'||p.type===activeType)&&(year==='all'||(p.year||'unknown')===year)&&(!query||[p.title,p.authors,p.venue,p.year,JSON.stringify(p.details||{})].join(' ').toLowerCase().includes(query)));
 rows.sort(sort==='citations'?(a,b)=>citationNumber(b)-citationNumber(a):sort==='title'?(a,b)=>a.title.localeCompare(b.title):(a,b)=>(Number(b.year)||0)-(Number(a.year)||0)||citationNumber(b)-citationNumber(a));
 $('result-count').textContent=`显示 ${rows.length} 条记录`;
 $('publication-list').innerHTML=rows.length?rows.map(p=>{
  const details=p.details||{};
  const venue=['期刊','Journal','会议','Conference','图书','Book','出版商','Publisher'].map(k=>details[k]).filter(Boolean).join(' · ')||p.venue||'来源未列出出版信息';
  const authors=escapeHtml(p.authors).replace(/\bT Wang\b|\bTao Wang\b/g,'<strong>$&</strong>');
  return `<article class="publication"><div class="pub-year">${escapeHtml(p.year||'—')}</div><div><h3><a href="${escapeHtml(safeUrl(p.scholarUrl))}" target="_blank" rel="noopener">${escapeHtml(p.title)}</a></h3><p class="authors">${authors}</p><p class="venue">${escapeHtml(venue)}</p><div class="pub-bottom"><span class="tag">${p.type==='patent'?'PATENT / 专利':p.type==='unclassified'?'待分类':'PUBLICATION'}</span>${p.citations?`<span class="cite">引用 ${escapeHtml(p.citations)}</span>`:''}<a href="${escapeHtml(safeUrl(p.scholarUrl))}" target="_blank" rel="noopener">Scholar ↗</a>${p.url?`<a href="${escapeHtml(safeUrl(p.url))}" target="_blank" rel="noopener">来源详情 ↗</a>`:''}</div></div><a class="pub-arrow" href="${escapeHtml(safeUrl(p.url||p.scholarUrl))}" target="_blank" rel="noopener" aria-label="查看 ${escapeHtml(p.title)} 的详情">↗</a></article>`;
 }).join(''):'<p class="empty">没有找到匹配的记录。试试其他关键词或年份。</p>';
}
fetch('profile.json').then(r=>{if(!r.ok)throw Error(r.status);return r.json();}).then(p=>{
 profile=p;$('record-count').textContent=p.publications.length;$('citation-count').textContent=Number(p.metrics?.citations||0).toLocaleString('en-US');$('h-index').textContent=p.metrics?.hIndex||'—';
 for(const [id,type] of [['paper-n','paper'],['patent-n','patent'],['all-n','all']])$(id).textContent=type==='all'?p.publications.length:p.publications.filter(r=>r.type===type).length;
 const years=[...new Set(p.publications.map(r=>r.year).filter(Boolean))].sort((a,b)=>b-a);years.forEach(y=>$('year').add(new Option(y,y)));if(p.publications.some(r=>!r.year))$('year').add(new Option('年份未列出','unknown'));
 render();
}).catch(()=>{$('result-count').textContent='已显示全部成果，筛选功能暂不可用';});
document.querySelectorAll('[data-type]').forEach(b=>b.addEventListener('click',()=>chooseType(b.dataset.type)));
['search','year','sort'].forEach(id=>$(id).addEventListener(id==='search'?'input':'change',render));
$('show-patents').addEventListener('click',()=>{$('search').value='';$('year').value='all';chooseType('patent');$('research').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'});});
