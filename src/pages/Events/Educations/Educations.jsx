import { useEffect, useState } from 'react'
import "./Educations.css";
import Filters from '../../../components/Filters/Filters';
import EducationCard from './components/EducationCard/EducationCard';
import { eventFilter } from '../../../utils/eventFilter';
import Pagination from '../Competitions/components/Pagination/Pagination';
import { api } from '../../../api';
import EventHorizontalCard from '../../../components/EventHorizontalCard/EventHorizontalCard';

const Educations = () => {
    
    const [currentPage, setCurrentPage] = useState(1);
    const [searchText, setSearchText] = useState("");
    const [selected, setSelected] = useState("all");
    const [educations, setEducations] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const itemsPerPage = 4;
    
    const selectMenu = {
        "active": "Aktif Eğitimler",
        "passive": "Pasif Eğitimler",
        "all" : "Hepsi"
    };


    useEffect(() => {
        setCurrentPage(1);
    }, [selected, searchText]);

    const filteredData = educations.filter(item => {
        return eventFilter(item, selected, searchText);
    });

    const getEducations = async () => {
        const result = await api.get("https://ataseng.com/api/educations/get.php");
        setEducations(result.content);
    }

    useEffect(() => {
        getEducations();
    }, []);
    
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
    const totalPageCount = Math.ceil(filteredData.length / itemsPerPage);

    return (
        <div className='events-subpage'>
            <div className='events-subpage-content'>
                <Filters selectMenu={selectMenu} selected={selected} setSelected={setSelected} setSearchText={setSearchText} searchPlaceHolder={"Eğitim Ara..."}/>
                <div className="events-subpage-cards">
                    {
                        currentItems.length !== 0 ?
                            currentItems.map((item, key) => (
                                <EventHorizontalCard
                                    key={key}
                                    item={item}
                                    curatorTitle={"Eğitmen"}
                                    setModalIsOpen={setModalIsOpen}
                                    setSelectedItem={setSelectedItem}
                                />
                            ))
                            :
                            <div className='filter-not-found-area'>
                                <p>Gösterilecek eğitim bulunmamaktadır.</p>
                            </div>
                    }
                </div>
                {
                    totalPageCount <= 1 ? 
                    <></> : <Pagination totalPageCount={totalPageCount} currentPage={currentPage} setCurrentPage={setCurrentPage} />
                }
                {/* <EducationCard selected={selected} filtered={filtered} educations={educations} /> */}
            </div>
        </div>
    )
};

export default Educations;