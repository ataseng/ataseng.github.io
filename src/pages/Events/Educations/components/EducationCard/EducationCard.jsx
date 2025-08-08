import educatorImage from "../../../../../assets/images/EducatorImage.jpg";
import EducationButton from "../EducationButton/EducationButton";
import "./EducationCard.css";

const EducationCard = ({ item, setmodalIsOpen, setSelectedItem }) => {
    const imgSrc = item.Educator_Image || educatorImage;

    return (
        <div className="education-card">
            <div className="education-card-wrap">
                <div className="educator-image">
                    <img src={imgSrc} alt="" />
                </div>

                <div className="education-card-info">
                    <div className="education-card-title">
                        <h3>{item.Title}</h3>
                    </div>
                    <div className="education-content">
                        <h4>Eğitim İçeriği</h4>
                        <span className='h4-double-dot'>:</span>
                        <span className='education-card-inner-content'>{item.Content}</span>
                    </div>
                    <div className="education-date">
                        <h4>Eğitim Tarihi</h4>
                        <span className='h4-double-dot'>:</span>
                        <span className='education-card-inner-content'>{item.Date}</span>
                    </div>
                    <div className="education-location">
                        <h4>Eğitim Adresi</h4>
                        <span className='h4-double-dot'>:</span>
                        <span className='education-card-inner-content'>{item.Location}</span>
                    </div>

                    <div className="education-last-date">
                        <h4>Son Başvuru</h4>
                        <span className='h4-double-dot'>:</span>
                        <span className='education-card-inner-content'>{item.Last_Application}</span>
                    </div>
                </div>

                <div className="education-button">
                    <EducationButton
                        item={item}
                        setmodalIsOpen={setmodalIsOpen}
                        setSelectedItem={setSelectedItem}
                    />
                </div>
            </div>
        </div>
    )
}

export default EducationCard;