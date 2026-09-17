const fs=require('fs'),path=require('path'),vm=require('vm'),assert=require('assert/strict');
const root=path.join(__dirname,'..');
const source=(page,needle)=>[...fs.readFileSync(path.join(root,page),'utf8').matchAll(/<script[^>]*>([\s\S]*?)<\/script>/g)].map(m=>m[1]).find(s=>s.includes(needle));
const flush=()=>new Promise(resolve=>setImmediate(resolve));
function environment(fetch){const elements={};const el=id=>elements[id]||(elements[id]={value:'',style:{},offsetHeight:64,textContent:'',innerHTML:'',addEventListener(){},appendChild(){}});el('amount').value='90';el('fromCurrency').value='EUR';el('toCurrency').value='TRY';const document={getElementById:el,documentElement:{style:{setProperty(){}}},createElement:()=>({})};const window={addEventListener(){}};return {elements,context:vm.createContext({document,window,location:{pathname:'/doviz'},fetch,AbortSignal,console})};}
(async()=>{
 const rateScript=source('doviz.html','function fetchRates');
 const failed=environment(async()=>{throw Error('network down')});vm.runInContext(rateScript,failed.context);await flush();assert.match(failed.elements.result.textContent,/alınamadı/);assert.match(failed.elements.kurBody.innerHTML,/kullanılamıyor/);
 const success=environment(async()=>({ok:true,json:async()=>({rates:{USD:1,EUR:0.9,TRY:40},time_last_updated:1789600000})}));vm.runInContext(rateScript,success.context);await flush();assert.match(success.elements.result.innerHTML,/4[.,]000/);
 const invalid=environment(async()=>({ok:true,json:async()=>({})}));vm.runInContext(rateScript,invalid.context);await flush();assert.match(invalid.elements.result.textContent,/alınamadı/);
 const platform=source('platformucretleri.html','const URL=');
 const safe=environment(async()=>({ok:true,json:async()=>[{Servis:'<img src=x onerror=alert(1)>',Plan:'A',Fiyat:'100',Not:'"test"'}]}));vm.runInContext(platform,safe.context);await flush();assert.match(safe.elements['abonelik-tablo'].innerHTML,/&lt;img/);assert(!safe.elements['abonelik-tablo'].innerHTML.includes('<img'));
 const empty=environment(async()=>({ok:true,json:async()=>[]}));vm.runInContext(platform,empty.context);await flush();assert.match(empty.elements['abonelik-tablo'].innerHTML,/ulaşılamıyor/);
 console.log('PASS: reference conversion, failed/malformed rates, escaped remote table, empty-table error');
})().catch(e=>{console.error(e);process.exitCode=1;});
