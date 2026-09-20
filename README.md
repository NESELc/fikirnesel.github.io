# fikirnesel.github.io
## Ortak üst menü
Masaüstü bağlantıları ve mobil açılır menü, `inc/site-quality.js` dosyasındaki `navigation` listesinden oluşturulur.
Yeni bir bölüm eklemek için bu listeye `{href:'/yeni-bolum.html',label:'Yeni Bölüm'}` kaydı ekleyin. Sıralamayı da aynı listeden değiştirin.
Mevcut üst menülü sayfalar ortak dosyayı zaten yükler; menü güncellemeleri için HTML dosyalarını tek tek düzenlemek gerekmez.
Yeni sayfaları mevcut sayfa şablonundan oluşturun; `#ustBar`, `#menu`, `#mselect` ve `<script defer src="/inc/site-quality.js"></script>` bağlantısını koruyun.
Etkin bölüm hem `.html` hem uzantısız adreslerde belirlenir. Sorgu parametreleri ve sayfa içi bağlantılar seçimi etkilemez.
Makale sayfalarında `nav[aria-label="İçerik yolu"]` içindeki Yazılarım bağlantısı üst bölümü belirler; her yeni makale için menü listesine kayıt eklemeyin.
Mevcut HTML menüleri JavaScript yüklenemediğinde yedek olarak kalır; bu yedekler yeni menü kayıtlarını otomatik alamaz.
Üst menüsü bulunmayan bağımsız politika ve iletişim sayfalarının düzeni değiştirilmez.
