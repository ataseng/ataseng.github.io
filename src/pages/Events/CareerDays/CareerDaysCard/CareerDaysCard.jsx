import EducationButton from '../../../../components/Button/EducationButton/EducationButton';
import './CareerDaysCard.css'

import careerDaysImg from "../../../../assets/images/EducatorImage.jpg";

const CareerDaysCard = ({ item, setmodalIsOpen, setSelectedItem }) => {

    const imgSrc = item.image ? item.image : careerDaysImg;

    return (

        <div className="carrer-days-card">
            <div className="carrer-days-card-wrap">
                <img className="educator-image" src={imgSrc} alt="" />

                <div className="carrer-days-card-info">
                    <div className="carrer-days-card-title">
                        <h3>{item.title}</h3>
                    </div>
                    <div className="carrer-days-content">
                        <h4>Konferans İçeriği :</h4>
                        <span>{item.content}</span>
                    </div>
                    <div className="carrer-days-date">
                        <h4>Konferans Tarihi :</h4>
                        <span>{item.date}</span>
                    </div>
                    <div className="carrer-days-location">
                        <h4>Konferans Adresi :</h4>
                        <span>{item.location}</span>
                    </div>
                </div>

                <div className="carrer-days-last-date">
                    <h4>Son Başvuru :</h4>
                    <span>{item.last}</span>
                </div>

                <div className="carrer-days-button">
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

export default CareerDaysCard;