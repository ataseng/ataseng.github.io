import React, { useEffect, useState } from 'react';
import './CardList.css';
import Card from './Card';
import cardsDataJson from './cardsData.json';  
import teamImage from '../../assets/images/team.jpg';
import darkThemeLogo from '../../assets/images/atasengLogo_white.png';
import lightThemeLogo from '../../assets/images/atasengLogo_dark.png';

/**
 * CardList component renders a list of Card components. It fetches card data 
 * from a JSON file and dynamically updates each card with theme-based logos 
 * and team images.
 *
 * @component
 * @returns {JSX.Element} The rendered list of Card components.
 */

const CardList = () => {
    const [cardsData, setCardsData] = useState([]);

    useEffect(() => {

        const updatedCardsData = cardsDataJson.map(card => ({
            ...card,
            image: teamImage, 
            darkThemeLogo: darkThemeLogo,
            lightThemeLogo: lightThemeLogo
        }));
        setCardsData(updatedCardsData);
    }, []);

    return (
        <div className="card-list">
            {cardsData.map((card, index) => (
                <Card
                    key={index}
                    image={card.image}
                    darkThemeLogo={card.darkThemeLogo}
                    lightThemeLogo={card.lightThemeLogo}
                    name={card.name}
                    department={card.department}
                    role={card.role}
                    links={card.links}
                />
            ))}
        </div>
    );
};

export default CardList;
