import { useEffect, useState } from "react";
import Filters from "../../../components/Filters/Filters";
import { eventFilter } from "../../../utils/eventFilter";
import Pagination from "../Competitions/components/Pagination/Pagination";
import EventVerticalCard from "../../../components/EventVerticalCard/EventVerticalCard";
import { api } from "../../../api";
const Hackathons = () => {

    const [currentPage, setCurrentPage] = useState(1);
    const [searchText, setSearchText] = useState('');
    const [selected, setSelected] = useState('all');
    const [hackathons, setHackathons] = useState([]);

    const itemsPerPage = 4;

    const selectMenu = {
        "active": "Aktif Yazılım Yarışmaları",
        "passive": "Pasif Yazılım Yarışmaları",
        "all": "Hepsi"
    };

    useEffect(() => {
        setCurrentPage(1);
    }, [selected, searchText]);

    const filteredData = hackathons.filter((item) => {
        return eventFilter(item, selected, searchText);
    });

    const getHackathons = async () => {
            const result = await api.get("https://ataseng.com/api/hackathons/get.php");
            if(result && result.content && result.content.length > 0)
                setHackathons(result.content);
        }
    
        useEffect(() => {
            getHackathons();
        }, []);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
    const totalPageCount = Math.ceil(filteredData.length / itemsPerPage);

    return (
        <div className='events-subpage'>
            <div className='events-subpage-content'>
                <Filters selectMenu={selectMenu} selected={selected} setSelected={setSelected} setSearchText={setSearchText} searchPlaceHolder={"Hackathon Ara..."} />
                <div className="events-subpage-cards">
                    {currentItems.length > 0 ? (
                        currentItems.map(item => (
                            <EventVerticalCard key={`hackathon_card_${item.id}`} item={item}/>
                        ))
                    ) : (
                        <div className='filter-not-found-area'>
                            <p>Gösterilecek hackathon bulunmamaktadır.</p>
                        </div>
                    )}
                </div>
                {
                    totalPageCount <= 1 ? 
                    <></> : <Pagination totalPageCount={totalPageCount} currentPage={currentPage} setCurrentPage={setCurrentPage} />
                }
                
            </div>
        </div>
    )
};

export default Hackathons;