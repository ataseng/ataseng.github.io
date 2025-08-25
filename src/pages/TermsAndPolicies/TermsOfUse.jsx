import "./TermsAndPolicies.css";

const TermsOfUse = () => {
    return (
        <section>
            <div className="section-content vertical-content terms-and-policies-section">
                <h2 className="lined-title">KOŞULLAR VE ŞARTLAR</h2>
                <p className="muted">Yürürlük: <strong>25.08.2025</strong> · Son güncelleme: <strong>25.08.2025</strong></p>
                <section id="icindekiler">
                    <nav className="terms-of-use-nav" aria-label="İçindekiler">
                        <h3>İçindekiler</h3>
                        <a href="#amac">1. Amaç & Kapsam</a>
                        <a href="#uyelik">2. Üyelik</a>
                        <a href="#etkinlik">3. Etkinlik Başvuruları</a>
                        <a href="#kullanim">4. Kabul Edilebilir Kullanım</a>
                        <a href="#ucuncu">5. Üçüncü Taraflar</a>
                        <a href="#fikri">6. Fikri Mülkiyet</a>
                        <a href="#degisiklik">7. Değişiklik</a>
                        <a href="#sorumluluk">8. Sorumluluk</a>
                        <a href="#hukuk">9. Geçerli Hukuk</a>
                        <a href="#iletisim">10. İletişim</a>
                    </nav>
                </section>
                
                <section id="amac">
                    <h3>1. Amaç ve Kapsam</h3>
                    <p><strong>Atatürk Üniversitesi – Yazılım Mühendisliği – Ataseng (Atatürk Üniversitesi Yazılım Mühendisliği Kulübü)</strong> tarafından işletilen <strong>ataseng.com</strong>; öğrencilere kulüp faaliyetlerini takip etme, etkinliklere başvurma ve üyelik süreçlerini yürütme imkânı sunar. Siteye erişerek bu Koşulları kabul etmiş olursunuz.</p>
                </section>

                <section id="uyelik">
                    <h3>2. Üyelik ve Hesap</h3>
                    <ul>
                        <li>Üyelik öncelikle <strong>Atatürk Üniversitesi</strong> öğrencilerine yöneliktir.</li>
                        <li>Kayıt sırasında verdiğiniz bilgilerin doğruluğundan ve güncelliğinden siz sorumlusunuz.</li>
                        <li>Hesap güvenliği (parola/cihaz) size aittir. Yetkisiz kullanım şüphesinde <a href="mailto:destek@ataseng.com">destek@ataseng.com</a> adresine bildirin.</li>
                    </ul>
                </section>

                <section id="etkinlik">
                    <h3>3. Etkinlik Başvuruları</h3>
                    <ul>
                        <li>Başvurular; kontenjan, uygunluk ve kulüp yönergelerine göre değerlendirilir.</li>
                        <li>Gerekirse yedek liste uygulanabilir; iptal etme ve erteleme hakkı saklıdır.</li>
                        <li>Etkinliklerde çekilen fotoğraf veya videolar, kulübün kurumsal iletişim kanallarında paylaşılabilir. Alanlarda ayrıca bilgilendirme yapılır.</li>
                    </ul>
                </section>

                <section id="kullanim">
                    <h3>4. Kabul Edilebilir Kullanım</h3>
                    <ul>
                        <li>Hukuka aykırı, taciz edici, ayrımcı veya yanıltıcı içerik paylaşamazsınız.</li>
                        <li>Sisteme yetkisiz erişim, otomatik isteklerle aşırı yük, güvenlik açıklarından yararlanma yasaktır.</li>
                        <li>Hak ihlali tespitinde içerikler kaldırılabilir; hesaplar askıya alınabilir.</li>
                    </ul>
                </section>

                <section id="ucuncu">
                    <h3>5. Üçüncü Taraf Bağlantılar</h3>
                    <p>Site, üniversite birimleri veya dış sağlayıcılara giden bağlantılar içerebilir; bu sitelerin içerik ve politikalarından Ataseng kulübü sorumlu değildir.</p>
                </section>

                <section id="fikri">
                    <h3>6. Fikri Mülkiyet</h3>
                    <p>Site ve içeriği kulübe veya hak sahiplerine aittir. Yazılı izin olmadan kopyalanamaz, çoğaltılamaz, dağıtılamaz.</p>
                </section>

                <section id="degisiklik">
                    <h3>7. Hizmetlerde Değişiklik</h3>
                    <p>Site ve özellikler zaman zaman güncellenebilir; etkinlikler iptal edilebilir veya ertelenebilir. Önemli değişiklikler siteden duyurulur.</p>
                </section>

                <section id="sorumluluk">
                    <h3>8. Sorumluluk</h3>
                    <p>Site “olduğu gibi” sunulur. Teknik arızalar, erişim kesintileri veya etkinlik değişikliklerinden doğan dolaylı zararlardan Ataseng kulübü sorumlu tutulamaz.</p>
                </section>

                <section id="hukuk">
                    <h3>9. Geçerli Hukuk ve Uyuşmazlık</h3>
                    <p>Koşullar Türkiye Cumhuriyeti hukukuna tabidir. Uyuşmazlıklarda <strong>[İstanbul … Mahkemeleri ve İcra Daireleri]</strong> yetkilidir.</p>
                </section>

                <section id="iletisim">
                    <h3>10. İletişim</h3>
                    <p><strong>E-posta:</strong> <a href="mailto:destek@ataseng.com">destek@ataseng.com</a><br/>
                    <strong>Adres:</strong> Atatürk Üniversitesi, Mühendislik Fakültesi, Yazılım Mühendisliği</p>
                </section>
            </div>
        </section>
    )
}

export default TermsOfUse