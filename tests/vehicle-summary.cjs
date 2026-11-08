const fs=require('fs'),path=require('path'),vm=require('vm'),assert=require('assert/strict');
const code=fs.readFileSync(path.join(__dirname,'../inc/vehicle-summary.js'),'utf8');
async function run(data,fail=false){const nodes=Object.fromEntries(['vehicle-summary','vehicle-brand-count','vehicle-data-scope'].map(id=>[id,{textContent:'fallback'}]));await vm.runInNewContext(code,{document:{getElementById:id=>nodes[id]},fetch:async()=>{if(fail)throw Error('offline');return {ok:true,json:async()=>data}},AbortSignal});return nodes;}
(async()=>{
 const row={marka:'Hyundai',model:'i20 1.0 Jump',fiyat:100,vites:'Manuel','yakıt türü':'Benzinli','sınıf':'Hatchback'};
 const nodes=await run([row,{...row},{...row,vites:'Otomatik'},{...row,marka:'Omoda',model:'5 Ultima'},{...row,marka:'Empty',fiyat:''}]);
 assert.equal(nodes['vehicle-brand-count'].textContent,'2 Marka');assert.match(nodes['vehicle-summary'].textContent,/3 model/);
 for(const input of [[],{},null])assert.equal((await run(input))['vehicle-brand-count'].textContent,'fallback');
 assert.equal((await run(null,true))['vehicle-brand-count'].textContent,'fallback');
 console.log('PASS: duplicates, distinct transmissions, missing prices, empty/malformed data, offline fallback.');
})().catch(e=>{console.error(e);process.exitCode=1});
