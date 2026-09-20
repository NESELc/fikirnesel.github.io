(() => {
 // Ana menü için tek kaynak: bölüm eklemek, kaldırmak veya sıralamak için yalnızca bu listeyi düzenleyin.
 const navigation=[
  {href:'/sifiraraclar.html',label:'Sıfır Araçlar'},
  {href:'/platformucretleri.html',label:'Platform Ücretleri'},
  {href:'/doviz.html',label:'Döviz Çevirici'},
  {href:'/gelirvergisi.html',label:'Gelir Vergisi'},
  {href:'/ankara.html',label:'Ankara'},
  {href:'/elektrik.html',label:'Elektrik'},
  {href:'/oyunlar.html',label:'Oyunlar'},
  {href:'/gidalar.html',label:'Gıdalar'},
  {href:'/yazilarim.html',label:'Yazılarım'}
 ];
 const normalize=path=>path.replace(/\/+$/,'').replace(/\.html$/,'').replace(/^\/index$/,'')||'/';
 function initialize(){
  const header=document.getElementById('ustBar');
  if(!header)return;
  const desktop=header.querySelector('#menu'),mobile=header.querySelector('#mselect');
  const current=normalize(location.pathname);
  const direct=navigation.find(item=>normalize(item.href)===current);
  // Yeni makaleler mevcut içerik yolu üzerinden tanınır; her makale için bu dosyaya kayıt gerekmez.
  const parents=Array.from(document.querySelectorAll('nav[aria-label="İçerik yolu"] a[href]'));
  const section=direct||navigation.find(item=>parents.some(link=>normalize(new URL(link.href,location.href).pathname)===normalize(item.href)));
  if(desktop){
   const links=navigation.map(item=>{
    const link=document.createElement('a');link.href=item.href;link.textContent=item.label;
    if(item===section)link.classList.add('active');
    if(item===direct)link.setAttribute('aria-current','page');
    return link;
   });
   desktop.replaceChildren(...links);desktop.setAttribute('aria-label','Ana Menü');
  }
  if(mobile){
   const placeholder=document.createElement('option');placeholder.value='';placeholder.textContent='Menüden Seçin...';
   const options=navigation.map(item=>{
    const option=document.createElement('option');option.value=item.href;option.textContent=item.label;return option;
   });
   mobile.replaceChildren(placeholder,...options);mobile.value=section?section.href:'';
   mobile.onchange=()=>{if(navigation.some(item=>item.href===mobile.value))location.href=mobile.value;};
  }
  const resize=()=>document.documentElement.style.setProperty('--ustH',header.offsetHeight+'px');
  resize();window.addEventListener('resize',resize);
  if(window.ResizeObserver)new ResizeObserver(resize).observe(header);
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',initialize,{once:true});else initialize();
})();
