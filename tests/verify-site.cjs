const fs=require('fs'),path=require('path'),vm=require('vm'),assert=require('assert/strict');
const root=path.join(__dirname,'..');
const read=p=>fs.readFileSync(path.join(root,p),'utf8');
const pages=fs.readdirSync(root).filter(p=>p.endsWith('.html')&&p!=='footer.html');
let scripts=0;
for(const p of pages){const s=read(p);assert.equal((s.match(/<h1[\s>]/g)||[]).length,1,p+' needs one H1');for(const m of s.matchAll(/<script([^>]*)>([\s\S]*?)<\/script>/g)){if(!m[1].includes('ld+json')){new vm.Script(m[2],{filename:p});scripts++;}}for(const m of s.matchAll(/href="(\/[^"?#]*)/g)){let f=m[1].slice(1)||'index.html';if(!path.extname(f))f+='.html';if(!/\.(ico|png|jpg)$/.test(f))assert(fs.existsSync(path.join(root,f)),p+' broken '+f);}}
new vm.Script(read('inc/site-quality.js'));
const tax=read('gelirvergisi.html');
function extract(s,name){const start=s.indexOf('function '+name+'(');assert(start>=0);let at=s.indexOf('{',start),depth=1,i=at+1;for(;depth&&i<s.length;i++){if(s[i]==='{')depth++;if(s[i]==='}')depth--;}return s.slice(start,i);}
const ctx=vm.createContext({});
vm.runInContext('const dilim=[[0,190000,.15,0],[190000,400000,.20,28500],[400000,1500000,.27,70500],[1500000,5300000,.35,367500],[5300000,1e12,.40,1697500]];'+extract(tax,'gvToplam'),ctx);
for(const [input,expected] of [[0,0],[-5,0],[190000,28500],[300000,50500],[400000,70500],[1500000,367500],[5300000,1697500]])assert.equal(vm.runInContext(`gvToplam(${input})`,ctx),expected);
const elec=read('elektrik.html');
const nodes={kabtipi:{value:'Cu'},kabkesit:{value:'875',selectedOptions:[{dataset:{area:'630'}}]},kabseviye:{value:'34.5'},kabomaj:{},kabakim:{},kabakimH:{},kabguc:{}};
const ectx=vm.createContext({Math,$:id=>nodes[id],n:Number,fmt:(v,d)=>v.toFixed(d)});vm.runInContext(extract(elec,'kablohesap')+';kablohesap()',ectx);assert(nodes.kabomaj.innerHTML.startsWith('0.0283'));assert.equal(nodes.kabakim.textContent,'875.0 A');nodes.kabtipi.value='Al';vm.runInContext('kablohesap()',ectx);assert(nodes.kabomaj.innerHTML.startsWith('0.0448'));
const game=read('oyunlar.html');const shapeText=game.match(/const SHAPES=([\s\S]*?);/)[1];const shapes=vm.runInNewContext(shapeText);
for(const shape of shapes){const degree=shape.pts.map(()=>0),seen=new Set([0]);shape.edges.forEach(([a,b])=>{degree[a]++;degree[b]++;});let grew=true;while(grew){grew=false;for(const [a,b] of shape.edges){if(seen.has(a)&&!seen.has(b)){seen.add(b);grew=true;}if(seen.has(b)&&!seen.has(a)){seen.add(a);grew=true;}}}assert.equal(seen.size,shape.pts.length,shape.name+' disconnected');assert([0,2].includes(degree.filter(d=>d%2).length),shape.name+' not Eulerian');}
const db=JSON.parse(read('inc/gidalar.json'));for(const x of db.gidalar)assert(!/;\s*$/.test(x.url),x.ad+' broken source');
console.log(JSON.stringify({pages:pages.length,scriptsChecked:scripts,taxBoundaryCases:7,cableCases:2,solvablePuzzles:shapes.length,foodRecords:db.gidalar.length,result:'PASS'}));
