# NESEL içerik ve teknik inceleme — 17 Eylül 2026

Bu çalışma Google'ın ret gerekçesini kesin olarak teşhis etmez ve AdSense onayı garantisi değildir. Ana sayfa, sekiz araç/rehber, hakkımızda, iletişim, gizlilik, çerez ve kullanım şartları sayfaları incelendi. Mevcut açıklamalar korunarak aşağıdaki düzeltmeler yapıldı.

## Uygulanan değişiklikler

- Elektrik: direnç hesabında akım değeri yerine gerçek mm² kesiti kullanılıyor. Sabit çarpanların model varsayımı olduğu açıklandı; fatura örneği eklendi.
- Vergi: sıfır/negatif matrah koruması, sağlık primi indiriminin aylık brüt ücret ve yıllık sınırı; kıdem açıklaması ve varsayılan yedek değeri ikinci yarı 2026 tavanıyla eşitlendi. SGK hakkını yetersiz tarih/prim kuralıyla otomatik belirlemek yerine belge seçimi eklendi. İhbar için bildirim süresi seçimi eklendi. İzin/ihbar için yanıltıcı sabit %15 net hesap yerine brüt tutarlar gösteriliyor.
- Döviz: referans kur ile işlem kuru ayrıldı; formül ve örnek eklendi. Veri hatası ve zaman aşımı artık görünür; sonsuz yüklenme durumu engellendi.
- Araçlar: dayanağı gösterilmeyen satış liderliği iddiası kaldırıldı; model kartları tarihli örnekler olarak tanımlandı. Gövde/segment açıklaması düzeltildi. Veri hatası görünür hale getirildi.
- Platformlar: tarihsiz mağaza fiyatları ve kesin paylaşım fiyatları yerine karşılaştırma yöntemi, varsayımsal örnekler ve resmî bağlantılar eklendi. Harici tablo metinleri HTML olarak yürütülmüyor.
- Ankara: bütün çevre rotalarını 40–100 km sayan ifade, doğrulanmamış hayvanat bahçesi ziyareti ve kesintisiz erişim gibi ifadeler düzeltildi; rota planlama ve kurum bağlantıları eklendi.
- Gıdalar: kaynak URL'lerindeki noktalı virgüller temizlendi; adaçayı için doğrudan NCCIH kaynağı bağlandı. Genel besin veritabanı ile tedavi kanıtı ayrıldı. Serbest girişin HTML olarak işlenmesi engellendi.
- Oyunlar: doğru başlangıç noktasının her hamle sırasını geçerli kılmadığı açıklandı. Sekiz grafın bağlantılı ve Euler yolu koşuluna uygun olduğu test edildi.
- Yayıncı ve iletişim: kullanıcı talebiyle yalnızca NESEL adı; aktif e-postanın Gmail yönlendirmesi açıklandı. Tam anonim analitik ve ziyaretle rıza varsayımı ifadeleri düzeltildi.
- Gezinti: eksik ana başlıklar, mobil menünün .html.html sorunu, platform sayfasında sabit başlık yüksekliği; görünür kaynak bağlantıları ve klavye odağı iyileştirildi.
- Boş manuel reklam alanları kaldırıldı. AdSense hesap doğrulama etiketi, yükleyici ve ads.txt korundu. Tüm dosyaları yanlışlıkla HTML olarak sunan _headers kuralı kaldırıldı; MIME türleri sunucuya bırakıldı. Kanonik URL ve site haritası mevcut canlı sitedeki uzantısız adreslerle eşitlendi.

## Doğrulama

`node tests/verify-site.cjs` ve `node tests/data-loading.cjs`

14 tam HTML sayfası, JavaScript sözdizimi, yerel içerik bağlantıları, yedi vergi sınır örneği, iki kablo hesabı, sekiz bulmaca grafı ve 105 gıda kaydının kaynak biçimi kontrol edilir. Tarayıcıda sıfır ücret sonucu, gıda seçimi/serbest giriş, mobil menü ve boş reklam alanlarının kalkması ayrıca kontrol edildi.

## Yayıncının ayrıca doğrulaması gerekenler

- AdSense Gizlilik ve mesajlaşma ayarlarının durumu kaynak kodundan doğrulanamaz. AEA/Birleşik Krallık/İsviçre kullanıcılarına kişiselleştirilmiş reklamlar için Google sertifikalı CMP koşullarını kontrol edin. Çerez metni tek başına CMP değildir.
- Gıda veritabanındaki tüm sağlık etkileri için tek tek klinik kaynak doğrulaması tamamlanmış değildir. Genel kurum ana sayfaları tekil iddiaları doğrulamaz. Bu çalışma bunları klinik olarak onaylanmış bilgiye dönüştürmez.
- Harici Google Apps Script fiyat listelerinin sahibi, güncelleme tarihleri ve bütün fiyatların doğruluğu ayrıca takip edilmelidir. Bu çalışma fiyat veri kaynağını değiştirmedi.
- Görsellerin kullanım izinleri ve varsa kişisel uzmanlık/deneyim iddiaları yayıncı tarafından doğrulanmalıdır; hayalî yazar veya uzman eklenmedi.
- Yeniden başvuru, değişiklikler canlı sitede görüldükten ve AdSense hesabındaki açık gereklilikler kontrol edildikten sonra yapılmalıdır.

## Başlıca resmî kaynaklar

- https://support.google.com/adsense/answer/7299563?hl=tr
- https://support.google.com/adsense/answer/13554116?hl=tr
- https://support.google.com/analytics/answer/11593727?hl=en
- https://intvrg.gib.gov.tr/hazirbeyan/assets/pdf/DUYURU_UNIVERSAL_2026_2026_Ucret_Geliri.pdf
- https://gib.gov.tr/mevzuat/kanun/433/ozelge/38652
- https://www.csgb.gov.tr/yayinlar/calisma-hayati-istatistikleri-e-bulteni/temmuz-2026/ucret-ve-sendikal-istatistikler.html
- https://tr.prysmian.com/tr/medya/teknik-makaleler/orta-gerilim-kablo-akim-tasima-kapasite-hesabi
- https://www.nccih.nih.gov/health/sage
- https://whc.unesco.org/en/list/1669/
