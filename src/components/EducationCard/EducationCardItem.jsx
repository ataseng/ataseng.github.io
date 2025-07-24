import './EducationCardItem.css';
import EducationButton from '../Button/EducationButton/EducationButton';
import educatorImage from "../../assets/images/EducatorImage.jpg";

const EducationCardItem = ({ item, setmodalIsOpen, setSelectedItem }) => {
    const imgSrc = item.Educator_Image || educatorImage;

    return (
        <>
            <div className="educator-image">
                <img src={imgSrc} alt="" />
            </div>

            <div className="education-card-info">
                <div className="education-card-title">
                    <h3>{item.Title}</h3>
                </div>
                <div className="education-content">
                    <h4>Eğitim İçeriği :</h4>
                    <span>{item.Content}</span>
                </div>
                <div className="education-date">
                    <h4>Eğitim Tarihi :</h4>
                    <span>{item.Date}</span>
                </div>
                <div className="education-location">
                    <h4>Eğitim Adresi :</h4>
                    <span>{item.Location}</span>
                </div>
            </div>

            <div className="education-last-date">
                <h4>Son Başvuru :</h4>
                <span>{item.Last_Application}</span>
            </div>

            <div className="education-button">
                <EducationButton 
                    item={item}
                    setmodalIsOpen={setmodalIsOpen}
                    setSelectedItem={setSelectedItem}
                />
            </div>
        </>
    );
};

export default EducationCardItem;
