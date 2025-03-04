import React, { useState } from 'react'
import './homeFeedBackSection.css'
import { Icon } from '@iconify/react/dist/iconify.js'
const HomeFeedBackSection = () => {

    const [hoveredStar, setHoveredStar] = useState(0)
    const [clickedStar, setClickedStar] = useState(0)
    const [feedBack, setfeedBack] = useState("")


    const handleMouseEnter = (item) => {
        setHoveredStar(item)
    }

    const handleMouseLeave = () => {
        setHoveredStar(0)
    }

    const handleClickStar = (item) => {
        setClickedStar(item)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(clickedStar, feedBack);
        setClickedStar("")
        setfeedBack("")
    }
    return (
        <div id='feedback-section' className="feedback-section">
            <div className="feedback-content">
                <div className="feedback">
                    <div className="feedback-title">
                        <h2>Görüş ve Önerinizi Bizimle Paylaşın</h2>
                    </div>
                    <form className='feedback-form' onSubmit={handleSubmit}>
                        <div className="feedback-star">
                            {
                                [1, 2, 3, 4, 5].map((item, index) => (
                                    <span
                                        key={`feedback_star_${index}`}
                                        className={clickedStar >= item ? 'active' : '' || hoveredStar >= item ? 'active' : ''}
                                        onMouseEnter={() => handleMouseEnter(item)}
                                        onMouseLeave={handleMouseLeave}
                                        onClick={() => handleClickStar(item)}
                                    >

                                        <Icon icon="material-symbols:star" />
                                    </span>

                                ))
                            }
                        </div>

                        <div className="feedback-message">
                            <textarea
                                rows={10}
                                cols={50}
                                onChange={(e) => { setfeedBack(e.target.value) }}
                                placeholder='Mesajınız...'
                                value={feedBack}

                            >

                            </textarea>
                        </div>
                        <div className="feedback-submit-btn">
                            <button type='submit'>Gönder</button>
                        </div>
                    </form>

                </div>
                <div className="text-side">

                    <div className="text-side-title">
                        <h2>Sizlerle Birlikte Daha Güçlüyüz</h2>
                    </div>
                    <div className="text-side-description">
                        <p>Değerli Üyelerimiz,<br />

                            Kulübümüzün gelişimine katkı sağlamak ve sizlere daha iyi hizmet verebilmek adına, memnuniyetinizi öğrenmek istiyoruz. Sizlerin düşünceleri, bizim için son derece önemlidir ve kulübümüzü daha da ileriye taşımak için en iyi yolu belirlememize yardımcı olacaktır.

                            Bu doğrultuda, yanda yer alan anketi doldurarak bizlerle görüşlerinizi ve önerilerinizi paylaşmanızı rica ediyoruz. Anket, kulüp faaliyetlerimiz hakkında fikirlerinizi, beklentilerinizi ve önerilerinizi öğrenmemize olanak tanıyacak. Katılımınız, sadece mevcut hizmetlerimizi geliştirmekle kalmayacak, aynı zamanda gelecekteki projelerimiz için de yol haritası çizmeye yardımcı olacaktır.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomeFeedBackSection