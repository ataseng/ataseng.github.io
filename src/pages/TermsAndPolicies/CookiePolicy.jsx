import "./TermsAndPolicies.css";

const CookiePolicy = () => {
  return (
    <section>
        <div className="section-content vertical-content terms-and-policies-section">
            <h2 className="lined-title">ÇEREZ POLİTİKASI</h2>
            <p className="muted">Yürürlük: <strong>25.08.2025</strong> · Son güncelleme: <strong>25.08.2025</strong></p>
            <section id="icindekiler">
                <nav className="cookie-policy-nav" aria-label="İçindekiler">
                    <h3>İçindekiler</h3>
                    <a href="#cerez_nedir">1. Çerez Nedir?</a>
                    <a href="#hangi_cerezler">2. Hangi Çerezleri Kullanıyoruz?</a>
                    <a href="#hangi_cerezler">3. Saklama Yöntemleri</a>
                    <a href="#cerezleri_yonetme">4. Çerezleri Yönetme</a>
                    <a href="#iletisim">5. İletişim</a>
                </nav>
            </section>

            <section id="cerez_nedir">
                <h3>1. Çerez Nedir?</h3>
                <p>Çerezler, web sitemizi ziyaret ettiğinizde tarayıcınız aracılığıyla cihazınıza kaydedilen küçük metin dosyalarıdır. Çerezler, sitenin düzgün çalışması, güvenliğin sağlanması ve kullanıcı deneyiminin geliştirilmesi için kullanılmaktadır.</p>
            </section>

            <section id="hangi_cerezler">
                <h3>2. Hangi Çerezleri Kullanıyoruz?</h3>
                <ul>
                    <li><strong>Zorunlu Çerezler:</strong> Oturumunuzu açık tutmak ve güvenliği sağlamak için gereklidir. Bu çerezler olmadan site düzgün çalışmaz.</li>
                    <li><strong>Tercih Çerezleri / Yerel Saklama:</strong> Tema gibi kullanıcı tercihlerini hatırlamak amacıyla cihazınızda saklanan veriler.</li>
                </ul>
                {/* <h4>Zorunlu Çerezler (Oturum Çerezleri)</h4>
            <p>
                Oturumunuzun güvenli bir şekilde sürdürülebilmesi için kimlik doğrulama verileriniz (örneğin refresh token) çerezler aracılığıyla saklanır. Bu çerezler olmadan sistemimiz çalışmaz.
            </p>
            <h4>Tercih Çerezleri</h4>
            <p>
                Kullanıcıların tema seçimi gibi kişisel tercihleri tarayıcıda saklanır. Bu çerezler, kullanıcı deneyimini geliştirmek amacıyla kullanılır.
            </p> */}
            </section>

            <section id="hangi_cerezler">
                <h3>3. Saklama Yöntemleri</h3>
                <ul>
                    <li>Güvenli bir şekilde giriş yapmaya devam edebilmeniz için gerekli oturum bilgileri çerezlerde tutulur.</li>
                    <li>Oturumunuzu açık tutabilmek için bazı kimlik doğrulama bilgileri tarayıcınızda saklanır. Ayrıca tema tercihiniz gibi kullanıcı ayarlarınızı hatırlamak amacıyla da veriler cihazınızda tutulur.</li>
                </ul>
            </section>

            <section id="cerezleri_yonetme">
                <h3>4. Çerezleri Yönetme</h3>
                <p>
                    Tarayıcınızın ayarlarından çerezleri engelleyebilir veya silebilirsiniz. Ancak zorunlu çerezleri devre dışı bırakmanız halinde sitemizden tam verimle yararlanamayabilirsiniz.
                </p>
            </section>

            <section id="iletisim">
                <h3>5. İletişim</h3>
                <p><strong>E-posta:</strong> <a href="mailto:destek@ataseng.com">destek@ataseng.com</a><br/>
                <strong>Adres:</strong> Atatürk Üniversitesi, Mühendislik Fakültesi, Yazılım Mühendisliği</p>
            </section>
            
            
        </div>
    </section>
  )
}

export default CookiePolicy