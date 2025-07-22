import React, { forwardRef, useState } from 'react'
import './homeManagementSection.css'


const HomeManagementSection = forwardRef((_, ref) => {
    const [formData, setformData] = useState(
        {
            fullname: "",
            departmant: "",
            grade: "",
            phone: ""
        }
    );

    const recruitmentActive = true;

    const handleChange = (e) => {
        const { name, value } = e.target
        if (value === "")
            return;

        setformData(prevState => ({
            ...prevState,
            [name]: value
        }));
    }
    const handleSubmit = (e) => {
        e.preventDefault();

        if (formData) {
            setformData({
                fullName: "",
                departmant: "",
                grade: "",
                phone: ""
            })
        }
    }
    
    return (
        <div ref={ref} id='management-section' className="management-section">
            <div className="management-content">
                <div className="management-side">
                    <div className="management-title">
                        <h2>Yönetim Ekibinde Yer Almak İster Misiniz?</h2>
                    </div>
                    <div className="management-description">
                        Değerli Üyelerimiz,<br />

                        Kulübümüzün yönetim ekibinde yer almak isteyen değerli üyelerimizi aramızda görmekten mutluluk duyarız. Sizlerin enerjisi, deneyimi ve tutkusu, kulübümüzü daha ileriye taşıyacak en önemli unsurlardan biridir. Yönetim ekibi olarak, birlikte çalışarak kulübümüzü daha dinamik, etkili ve başarılı bir hale getirmek için çaba göstereceğiz.

                        Katkılarınız ve fikirlerinizle, kulübümüzü daha da ileriye taşıyacağımıza inanıyoruz. Her birinizin farklı yetenekleri ve bakış açıları, kulüp çalışmalarımızda yenilikçi çözümler geliştirmemize yardımcı olacaktır. Bu süreçte, birlikte fikir alışverişinde bulunmak, projelerimizi geliştirmek ve yeni hedefler belirlemek için büyük bir heyecan duyuyoruz.

                        Sizleri aramızda görmek, kulübümüzün geleceği için büyük bir adım olacaktır. Yönetim ekibine katılma isteğinizi, birlikte daha büyük başarılar elde etme hedefinizi bizlerle paylaşmanızı bekliyoruz.

                        Teşekkür ederiz!
                    </div>
                </div>
                <div className="form-content">
                    <div className="form-side">
                        <form onSubmit={handleSubmit}>
                            <div className="input-area" >

                                <input value={formData.fullname} onChange={handleChange} name='fullname' type="text" placeholder='İsim Soyisim' />
                                <input value={formData.departmant} onChange={handleChange} name='departmant' type="text" placeholder='Bölüm' />
                                {/* <input value={formData.grade} onChange={handleChange} name='grade' type="text" placeholder='Sınıf' /> */}
                                <select name="grade" id="grade" value={formData.grade} onChange={handleChange}>
                                    <option value="">Sınıf</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="4+">4+</option>
                                </select>
                                <input value={formData.phone} onChange={handleChange} name='phone' type="tel" placeholder='Telefon'/>
                            </div>
                            <div className="managament-section-btn">
                                <button type='submit' disabled = {!recruitmentActive}>
                                    <span>Gönder</span>
                                </button>
                            </div>
                            {
                                !recruitmentActive &&
                                <div className='recruitment-not-active'>
                                    <span>Üye Alım Takvimi Dışındasınız!</span>
                                </div>
                            }
                            
                        </form>
                    </div>
                </div>


            </div>
            {/* <div className="sponsor-part">
                <div className="description-side">
                    <p>Atatürk Üniversitesi Yazılım Kulübü, genç yazılımcıları bir araya getirerek yaratıcı projeler geliştiren dinamik bir topluluktur. Öğrencilerimiz, farklı alanlarda (web geliştirme, mobil uygulama, oyun geliştirme) başarılı projeler hayata geçirerek deneyim kazanmakta ve yeteneklerini sergilemektedir. Kulübümüz, takım çalışmasını teşvik eden etkinlikler, hackathonlar ve eğitimler ile üyelerinin gelişimine katkı sağlamaktadır.
                        Daha fazla proje ve çalışmalarımız için GitHub hesabımızı ziyaret edin.</p>
                    <div className="visit-github-link">
                        <a href='https://github.com/ataseng'>ATASENG/GİTHUB</a>
                    </div>
                </div>

                <div className="sponsor-image-side"></div>

            </div> */}

        </div>
    )
});

export default HomeManagementSection