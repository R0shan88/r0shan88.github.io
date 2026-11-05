'use strict';
let profile,activeType='all';
const $=id=>document.getElementById(id);
const visibleRecords=()=>profile.publications.filter(p=>p.type!=='patent'||p.status!=='excluded');
function chooseType(type){activeType=type;document.querySelectorAll('[data-type]').forEach(b=>{b.classList.toggle('active',b.dataset.type===type);b.setAttribute('aria-pressed',b.dataset.type===type?'true':'false');});render();}
function render(){
 if(!profile)return;
 const query=$('search').value.trim().toLowerCase(),year=$('year').value,sort=$('sort').value,status=$('patent-status').value;
 const rows=visibleRecords().filter(p=>(activeType==='all'||p.type===activeType)&&(year==='all'||(p.year||'unknown')===year)&&(p.type!=='patent'||status==='all'||p.status===status)&&(!query||JSON.stringify(p).toLowerCase().includes(query)));
 rows.sort(sort==='citations'?(a,b)=>citationNumber(b)-citationNumber(a)||dateOrder(a,b):sort==='title'?(a,b)=>a.title.localeCompare(b.title):dateOrder);
 $('result-count').textContent=`显示 ${rows.length} 条记录`;
 $('publication-list').innerHTML=rows.length?rows.map(recordMarkup).join(''):'<p class="empty">没有找到匹配的记录。试试其他关键词、状态或年份。</p>';
 $('patent-status-wrap').hidden=activeType==='paper';
}
const readJson=async (path,optional=false)=>{const r=await fetch(path);if(optional&&r.status===404)return null;if(!r.ok)throw Error(path+': '+r.status);return r.json();};
async function loadContent(){
 const names=['profile','experience','education','interests','contact','site'];
 const values=await Promise.all(names.map(name=>readJson('content/'+name+'.json',true)));
 const about=await fetch('content/about.md');if(!about.ok&&about.status!==404)throw Error('Cannot load biography');
 const c=Object.fromEntries(names.map((name,i)=>[name,values[i]]));c.about=about.status===404?'':await about.text();applyContent(c);
}
async function loadRecords(){
 const [metadata,patentIndex,paperIndex]=await Promise.all([readJson('profile.json',true),readJson('patents/index.json',true),readJson('publications/index.json',true)]);
 const p=metadata||{};
 const index=patentIndex||{files:[]};
 if(!Array.isArray(index.files)||!index.files.every(f=>/^patents\/family-\d+\.json$/.test(f)))throw Error('Invalid patent index');
 const patents=(await Promise.all(index.files.map(f=>readJson(f,true)))).filter(Boolean);
 const paperFiles=paperIndex?.files||[];
 if(!paperFiles.every(f=>/^publications\/paper-\d+\.json$/.test(f)))throw Error('Invalid paper index');
 const papers=(await Promise.all(paperFiles.map(f=>readJson(f,true)))).filter(Boolean).filter(p=>p.hidden!==true);
 if(patents.some(p=>!p.id||!Array.isArray(p.members)||typeof p.title!=='string'))throw Error('Invalid patent data');
 p.publications=[...papers,...patents];profile=p;
 if(!p.metrics){const n=$('scholar-metrics');if(n)n.hidden=true;}
 const rows=visibleRecords();$('record-count').textContent=rows.length;$('citation-count').textContent=Number(p.metrics?.citations||0).toLocaleString('en-US');$('h-index').textContent=p.metrics?.hIndex||'—';
 for(const [id,type] of [['paper-n','paper'],['patent-n','patent'],['all-n','all']])$(id).textContent=type==='all'?rows.length:rows.filter(r=>r.type===type).length;
 const years=[...new Set(rows.map(r=>r.year).filter(Boolean))].sort((a,b)=>b-a);years.forEach(y=>$('year').add(new Option(y,y)));if(rows.some(r=>!r.year))$('year').add(new Option('年份未列出','unknown'));
 render();
}
loadRecords().catch(()=>{$('result-count').textContent='已显示核验快照，筛选功能暂不可用';});
loadContent().catch(()=>{});
document.querySelectorAll('[data-type]').forEach(b=>b.addEventListener('click',()=>chooseType(b.dataset.type)));
['search','year','sort','patent-status'].forEach(id=>$(id).addEventListener(id==='search'?'input':'change',render));
$('show-patents').addEventListener('click',()=>{$('search').value='';$('year').value='all';$('patent-status').value='all';chooseType('patent');$('research').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'});});
