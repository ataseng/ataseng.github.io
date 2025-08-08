import { useEffect, useState } from 'react'
import "./Educations.css";
import Filters from '../../../components/Filters/Filters';
import EducationCard from './components/EducationCard/EducationCard';

const Educations = () => {
    const [filtered, setFiltered] = useState("");
    const [selected, setSelected] = useState("all");
    const [educations, setEducations] = useState([]);
    const [modalIsOpen, setmodalIsOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    
    const selectMenu = {
        "active": "Aktif Yarışmalar",
        "passive": "Pasif Yarışmalar",
        "all" : "Hepsi"
    };

    const filteredData = educations.filter(item => {
        const searchFilter = item.Title.toLowerCase().includes(filtered.toLowerCase()) || item.Content.toLowerCase().includes(filtered.toLowerCase())
        const selectFilter = selected === "all" || (selected === "active" && item.Status === "active") || (selected === "passive" && item.Status === "passive")
        return searchFilter && selectFilter
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
                <Filters selectMenu={selectMenu} selected={selected} setSelected={setSelected} setFiltered={setFiltered} searchPlaceHolder={"Eğitim Ara..."}/>
                <div className="education-container">
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
                            <div className="error-container">
                                <div className="error-search">
                                    <h3>Aradığınız Eğitim Bulunamadı!</h3>
                                    <p>Lütfen başlığa göre arama yapınız.</p>
                                </div>
                            </div>
                    }
                </div>
                {/* <EducationCard selected={selected} filtered={filtered} educations={educations} /> */}
            </div>
        </div>
    )
}

export default Educations