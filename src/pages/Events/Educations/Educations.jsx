import { useEffect, useState } from 'react'
import "./Educations.css";
import Filters from '../../../components/Filters/Filters';
import EducationCard from './components/EducationCard/EducationCard';
import { eventFilter } from '../../../utils/eventFilter';

const Educations = () => {
    const [searchText, setSearchText] = useState("");
    const [selected, setSelected] = useState("all");
    const [educations, setEducations] = useState([]);
    const [modalIsOpen, setmodalIsOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    
    const selectMenu = {
        "active": "Aktif Eğitimler",
        "passive": "Pasif Eğitimler",
        "all" : "Hepsi"
    };

    const filteredData = educations.filter(item => {
        return eventFilter(item, selected, searchText);
    });

    useEffect(() => {
        // setLoading(true);
        fetch("https://ataseng.com/api/educations_get.php")
            .then(res => res.json())
            .then(data => {
                if (data.message === "success") {
                    const content = data.content;
                    setEducations(content);
                }
                else {
                    console.error(data.message);
                }
                // setLoading(false);
            });

    }, []);
    return (
        <div className='events-subpage'>
            <div className='events-subpage-content'>
                <Filters selectMenu={selectMenu} selected={selected} setSelected={setSelected} setSearchText={setSearchText} searchPlaceHolder={"Eğitim Ara..."}/>
                <div className="events-subpage-cards">
                    {
                        filteredData.length !== 0 ?
                            filteredData.map((item, key) => (
                                <EducationCard
                                    key={key}
                                    item={item}
                                    setmodalIsOpen={setmodalIsOpen}
                                    setSelectedItem={setSelectedItem}
                                />
                            ))
                            :
                            <div className='filter-not-found-area'>
                                <p>Gösterilecek eğitim bulunmamaktadır.</p>
                            </div>
                    }
                </div>
                {/* <EducationCard selected={selected} filtered={filtered} educations={educations} /> */}
            </div>
        </div>
    )
}

export default Educations