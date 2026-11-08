(async function updateVehicleSummary(){
  const url="https://script.google.com/macros/s/AKfycbzWRkuSxydLo2rGWtI13m6FtURNWuOHD547EKMqZTUc-ZQ7AAM6_MixK_NEL1l68d5R/exec";
  try {
    const response=await fetch(url,{signal:AbortSignal.timeout(15000)});
    if(!response.ok) return;
    const data=await response.json();
    if(!Array.isArray(data)) return;
    const normalize=value=>String(value??"").trim().toLocaleLowerCase("tr-TR").replace(/\s+/g," ");
    const rows=data.filter(row=>row&&normalize(row.marka)&&normalize(row.model)&&Number.isFinite(Number(row.fiyat))&&Number(row.fiyat)>0);
    if(!rows.length) return;
    const brands=new Set(rows.map(row=>normalize(row.marka))).size;
    // Aynı adın manuel/otomatik veya farklı yakıtlı versiyonlarını koru.
    const models=new Set(rows.map(row=>JSON.stringify([row.marka,row.model,row["sınıf"],row["yakıt türü"],row.vites].map(normalize)))).size;
    const count=value=>value.toLocaleString("tr-TR");
    const set=(id,text)=>{const element=document.getElementById(id);if(element) element.textContent=text;};
    set("vehicle-summary",`${count(brands)} marka, ${count(models)} model/versiyonun güncel liste ve kampanya fiyatları`);
    set("vehicle-brand-count",`${count(brands)} Marka`);
    set("vehicle-data-scope",`${count(brands)} marka ve ${count(models)} model/versiyona ait fiyatları takip ettiğimiz fiyat tablosundan güncelliyoruz.`);
  } catch {
    // Bağlantı kesilirse sayfadaki sayısız genel açıklamalar görünür kalır.
  }
})();
