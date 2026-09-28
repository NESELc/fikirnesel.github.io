const fs=require('fs'),path=require('path'),vm=require('vm'),assert=require('assert/strict');
const root=path.join(__dirname,'..'),data=JSON.parse(fs.readFileSync(path.join(root,'inc/gidalar.json'),'utf8'));
const html=fs.readFileSync(path.join(root,'gidalar.html'),'utf8');
const script=[...html.matchAll(/<script[^>]*>([\s\S]*?)<\/script>/g)].map(m=>m[1]).find(s=>s.includes('function dbNormalize'));
const nodes={},el=id=>nodes[id]||(nodes[id]={value:'',innerHTML:'',textContent:'',offsetHeight:64,add(){},addEventListener(){}});
const context=vm.createContext({URL,console,Option:function(t,v){this.text=t;this.value=v},fetch:async()=>({ok:true,json:async()=>data}),
 document:{getElementById:el,documentElement:{style:{setProperty(){}}}},window:{addEventListener(){}},location:{pathname:'/gidalar.html'}});
(async()=>{
 vm.runInContext(script,context);await new Promise(r=>setImmediate(r));
 const verified=data.karisimlar.filter(m=>m.dogrulama==='dogrulandi');assert.equal(verified.length,5);
 assert.equal(new Set(data.karisimlar.map(m=>m.id)).size,data.karisimlar.length);
 for(const m of verified){
  for(const key of ['kaynak','url','kaynak_bolumu','kapsam','hazirlama','dikkat','kontrol_tarihi'])assert(m[key],m.id+' '+key);
  assert(new URL(m.url).hostname.endsWith('.nhs.uk'));assert(m.gidalar.every(id=>data.gidalar.some(f=>f.id===id)));
 }
 for(const c of data.sikayetler){
  assert(c.karisim_incelemesi?.url,c.id);el('complaint').value=c.id;vm.runInContext('render()',context);
  const current=verified.filter(m=>m.sikayet_id===c.id),view=el('mixSuggestions').innerHTML;
  if(current.length){assert(view.includes('Bu kaydı incele'));vm.runInContext('selectMix(0)',context);assert(el('mix').innerHTML.includes(current[0].url));}
  else{assert(view.includes('Resmî kaynakla doğrulanmış karışım henüz yok'));assert(!view.includes('onclick='));}
  for(const id of ['food1','food2','food3'])el(id).value='';
 }
 el('complaint').value='';el('manual').value='gaz';vm.runInContext('render()',context);assert(el('mixSuggestions').innerHTML.includes('IBS'));
 vm.runInContext('clearAll()',context);assert.equal(el('mixSuggestions').innerHTML,'');
 assert.equal(vm.runInContext('safeSource("javascript:alert(1)")',context),false);
 console.log('PASS: 23 complaint states, verified-only suggestions, source metadata, selection, manual lookup, reset and URL safety');
})().catch(e=>{console.error(e);process.exitCode=1});
