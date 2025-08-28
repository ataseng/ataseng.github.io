import { useEffect, useState } from "react";
import { hackathon_data } from './hackathon_data';
import Filters from "../../../components/Filters/Filters";
import { eventFilter } from "../../../utils/eventFilter";
import Pagination from "../Competitions/components/Pagination/Pagination";
import EventVerticalCard from "../../../components/EventVerticalCard/EventVerticalCard";
const Hackathons = () => {

    const [currentPage, setCurrentPage] = useState(1);
    const [searchText, setSearchText] = useState('');
    const [selected, setSelected] = useState('all');
    const itemsPerPage = 4;

    useEffect(() => {
        setCurrentPage(1);
    }, [selected, searchText]);

    const filteredData = hackathon_data.filter((item) => {
        return eventFilter(item, selected, searchText);
    });

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
    const totalPageCount = Math.ceil(filteredData.length / itemsPerPage);

    const selectMenu = {
        "active": "Aktif Yazılım Yarışmaları",
        "passive": "Pasif Yazılım Yarışmaları",
        "all": "Hepsi"
    };

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
                            <p>Gösterilecek yarışma bulunmamaktadır.</p>
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