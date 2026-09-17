(() => {
 const header=document.getElementById('ustBar');
 const resize=()=>{if(header)document.documentElement.style.setProperty('--ustH',header.offsetHeight+'px');};
 resize();window.addEventListener('resize',resize);if(header&&window.ResizeObserver)new ResizeObserver(resize).observe(header);
 const menu=document.getElementById('mselect');if(menu){const current=location.pathname.replace(/\.html$/,'').replace(/\/$/,'');const option=Array.from(menu.options).find(o=>o.value.replace(/\.html$/,'')===current);if(option)menu.value=option.value;}
})();
