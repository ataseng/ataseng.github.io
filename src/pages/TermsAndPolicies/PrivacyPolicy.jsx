import { Link } from "react-router-dom";
import "./TermsAndPolicies.css";

const PrivacyPolicy = () => {
    return (
        <section>
            <div className="section-content vertical-content terms-and-policies-section">
                <h2 className="lined-title">GİZLİLİK POLİTİKASI</h2>
                <p className="muted">Yürürlük: <strong>25.08.2025</strong> · Son güncelleme: <strong>25.08.2025</strong></p>
                <section id="icindekiler">
                    <nav className="privacy-policy-nav" aria-label="İçindekiler">
                        <h3>İçindekiler</h3>
                        <a href="#veri_sorumlusu">1. Veri Sorumlusu</a>
                        <a href="#toplanan_veriler">2. Toplanan Verileri</a>
                        <a href="#veri_isleme_amaclari">3. Veri İşleme Amaçları</a>
                        <a href="#hukuki_sebepler">4. Hukuki Sebepler</a>
                        <a href="#veri_saklama_sureleri">5. Verilerin Saklama Süreleri</a>
                        <a href="#aktarim_ve_paylasim">6. Aktarım ve Paylaşım</a>
                        <a href="#haklariniz">7. Haklarınız</a>
                        <a href="#cerezler_ve_benzeri_teknolojiler">8. Çerezler ve Benzeri Teknolojiler</a>
                        <a href="#guvenlik">9. Güvenlik</a>
                        <a href="#degisiklikler">10. Değişiklikler</a>
                    </nav>
                </section>

                <section id="veri_sorumlusu">
                    <h3>1. Veri Sorumlusu</h3>
                    {/* <p>Bu web sitesi üzerinden toplanan kişisel veriler, ATASENG (Atatürk Üniversitesi Yazılım Mühendisliği Kulübü) tarafından 6698 sayılı Kişisel Verilerin Korunması Kanunu (KVKK) ve Avrupa Birliği Genel Veri Koruma Tüzüğü (GDPR) kapsamında işlenmektedir.</p> */}
                    <p>
                        <strong>Atatürk Üniversitesi - Yazılım Mühendisliği - ATASENG (Atatürk Üniversitesi Yazılım Mühendisliği Kulübü)</strong>
                        <br />
                        İletişim: <a href="mailto:destek@ataseng.com">destek@ataseng.com</a>
                        <br />
                        Adres: Atatürk Üniversites, Mühendislik Fakültesi, Yazılım Mühendisliği
                    </p>
                </section>

                <section id="toplanan_veriler">
                    <h3>2. Toplanan Veriler</h3>
                    {/* <p>
                        İletişim formu aracılığıyla tarafımıza ilettiğiniz:
                        <ul>
                            <li>Ad ve Soyad</li>
                            <li>E-posta adresi</li>
                            <li>Mesaj içeriği</li>
                            <li>IP adresi</li>
                            <li>Mesajın gönderim tarihi ve saati</li>
                        </ul>
                        kişisel verileriniz kapsamında işlenmektedir.
                    </p> */}
                    <ul>
                        <li><strong>Üyelik:</strong> Ad-soyad, e-posta, öğrenci no, bölüm/sınıf, parola (şifrelenmiş), hesap/rol.</li>
                        <li><strong>Etkinlik Başvuruları:</strong> Ad-soyad, e-posta, öğrenci no, bölüm/sınıf, telefon (varsa), tercih/oturum seçimi, katılım durumu.</li>
                        <li><strong>İletişim Formu:</strong> Ad-soyad, e-posta, mesaj.</li>
                        <li><strong>Teknik Kayıtlar:</strong> IP adresi, işlem zamanı, tarayıcı/cihaz bilgisi (güvenlik ve kötüye kullanımın önlenmesi için).</li>
                        <li><strong>Tercihler:</strong> Tema gibi kullanım tercihleri (cihazınızda saklanan veriler).</li>
                    </ul>
                </section>

                <section id="veri_isleme_amaclari">
                    <h3>3. Veri İşleme Amaçları</h3>
                    {/* <p>
                        Kişisel verileriniz;
                        <ul>
                            <li>İletişim taleplerinizi karşılamak,</li>
                            <li>Sorularınızı yanıtlamak,</li>
                            <li>Teknik güvenliği sağlamak ve kötüye kullanımın önlenmesi,</li>
                            <li>Yasal yükümlülüklerimizi yerine getirmek</li>
                        </ul>
                        amaçlarıyla işlenmektedir.
                    </p> */}
                    <ul>
                        <li>Üyelik oluşturma ve hesabınızı yönetme,</li>
                        <li>Etkinlik başvurularını almak, değerlendirmek ve bilgilendirmek,</li>
                        <li>Site güvenliğini sağlamak; istismar ve spam’ı önlemek,</li>
                        <li>Mevzuattan doğan yükümlülükler.</li>
                    </ul>
                </section>

                <section id="hukuki_sebepler">
                    <h3>4. Hukuki Sebepler</h3>
                    {/* <p>Kişisel verileriniz, KVKK m.5/2 (c) ve (f) kapsamında “bir sözleşmenin kurulması veya ifası için gerekli olması” ve “meşru menfaatlerimizin korunması” sebeplerine dayanarak işlenmektedir. GDPR kapsamında ise m.6/1 (b) ve (f) hükümleri uyarınca işlenmektedir.</p> */}
                    <ul>
                        <li><strong>KVKK 5/2-c</strong> ve <strong>GDPR 6/1-b</strong>: Üyelik/başvuru süreçlerinin yürütülmesi.</li>
                        <li><strong>KVKK 5/2-f</strong> ve <strong>GDPR 6/1-f</strong>: Güvenlik ve meşru menfaat.</li>
                        <li><strong>Açık rıza:</strong> Sadece gerekli özel durumlarda/isteğe bağlı alanlarda.</li>
                    </ul>
                </section>

                <section id="veri_saklama_sureleri">
                    <h3>5. Verilerin Saklama Süreleri</h3>
                    {/* <p>Toplanan kişisel verileriniz, ilgili amaçların yerine getirilmesi için gerekli süre boyunca saklanmakta olup, mevzuatta öngörülen zamanaşımı sürelerinin sona ermesiyle birlikte silinir, anonim hale getirilir veya imha edilir.</p> */}
                    <ul>
                        <li><strong>Üyelik verileri:</strong> Hesap aktif kaldığı sürece; pasif hesaplar için en fazla <strong>1 yıl</strong>.</li>
                        <li><strong>Etkinlik verileri:</strong> Etkinlik bitişinden sonra <strong>6 ay</strong>.</li>
                        <li><strong>Güvenlik/log:</strong> <strong>6 ay</strong>.</li>
                        <li>Mevzuat gereği daha uzun süreler saklı tutulabilir.</li>
                    </ul>
                </section>

                <section id="aktarim_ve_paylasim">
                    <h3>6. Aktarım ve Paylaşım</h3>
                    {/* <p>Kişisel verileriniz, yasal yükümlülükler haricinde üçüncü kişilerle paylaşılmamaktadır. Ancak teknik altyapı hizmet sağlayıcılarımız (barındırma, e-posta servisleri vb.) ile sınırlı ve gerekli ölçüde paylaşılabilir.</p> */}
                    <ul>
                        <li>Barındırma/e-posta gibi teknik hizmet sağlayıcılarla, hizmetin görülmesi için gerekli ölçüde paylaşım yapılabilir.</li>
                        <li>Üniversite birimleriyle (örn. öğrenci işleri) etkinlik organizasyonu ve güvenlik amaçlı gerekli durumlarda paylaşım yapılabilir.</li>
                    </ul>
                </section>

                <section id="haklariniz">
                    <h3>7. Haklarınız</h3>
                    <p>
                        KVKK m.11 ve GDPR m.15-22 kapsamında şu haklara sahipsiniz:
                        <ul>
                            <li>Kişisel verilerinizin işlenip işlenmediğini öğrenme,</li>
                            <li>İşlenmişse buna ilişkin bilgi talep etme,</li>
                            <li>Amacına uygun işlenip işlenmediğini öğrenme,</li>
                            <li>Eksik veya yanlış işlenmişse düzeltilmesini talep etme,</li>
                            <li>Silinmesini veya anonim hale getirilmesini isteme,</li>
                            <li>İşlemenin sınırlandırılmasını talep etme,</li>
                            <li>İşlenen verilerinizin yurt içinde veya yurt dışında kimlere aktarıldığını öğrenme,</li>
                            <li>İşlemenin hukuka aykırı olması halinde zararın giderilmesini talep etme.</li>
                        </ul>
                    </p>
                    <p>KVKK m.11 ve GDPR m.15–22 kapsamındaki haklarınızı <a href="mailto:destek@ataseng.com">destek@ataseng.com</a> adresine başvurarak kullanabilirsiniz.</p>
                </section>

                <section id="cerezler_ve_benzeri_teknolojiler">
                    <h3>8. Çerezler ve Benzeri Teknolojiler</h3>
                    {/* <p>
                        Web sitemizde hizmetin sağlanması ve kullanıcı deneyiminin geliştirilmesi için çerezler ve tarayıcı depolama teknolojileri kullanılmaktadır.
                        <ul>
                            <li>
                                Kimlik Doğrulama Çerezleri:
                                <br />
                                Oturumunuzun güvenli bir şekilde devam etmesi için zorunlu olan bu veriler tarayıcınızda çerez olarak saklanır.
                            </li>
                            <li>
                                Erişim Anahtarları:
                                <br />
                                Sisteme giriş yaptıktan sonra erişim anahtarlarınız tarayıcı local storage üzerinde saklanır. Bu veriler yalnızca oturumunuzu sürdürebilmek amacıyla tutulur.
                            </li>
                            <li>
                                Kullanıcı Tercihleri:
                                <br />
                                Tema seçimi gibi kişisel tercihlerinizi hatırlamak için tarayıcı local storage üzerinde bazı bilgiler saklanmaktadır.
                            </li>
                        </ul>
                    </p> */}
                    <ul>
                        <li><strong>Zorunlu çerezler:</strong> oturumun güvenli sürdürülmesi için gereklidir.</li>
                        <li><strong>Tercihler:</strong> tema gibi ayarların hatırlanması için cihazınızda saklanan veriler.</li>
                    </ul>
                    <p>Detaylar için <Link to="/cerez-politikasi">Çerez Politikası</Link></p>
                </section>

                <section id="guvenlik">
                    <h3>9. Güvenlik</h3>
                    <ul>
                        <li>Parolalar şifrelenir.</li>
                        <li>Verileriniz, iletim sırasında güvenli bağlantı (TLS/HTTPS) ile korunur.</li>
                        <li>Erişim yetkileri rol bazlı sınırlandırılır.</li>
                        <li>Yetkisiz erişim şüphesinde derhal bildirin: <a href="mailto:destek@ataseng.com">destek@ataseng.com</a>.</li>
                    </ul>
                </section>

                <section id="degisiklikler">
                    <h3>10. Değişiklikler</h3>
                    <p>Politika güncellenebilir. Önemli değişiklikler siteden duyurulur.</p>
                </section>
                
            </div>
        </section>
    )
}

export default PrivacyPolicy