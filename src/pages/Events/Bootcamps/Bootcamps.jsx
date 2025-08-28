import Filters from '../../../components/Filters/Filters';
import { eventFilter } from '../../../utils/eventFilter';
import { useEffect, useState } from 'react';
import Pagination from '../Competitions/components/Pagination/Pagination';
import EventVerticalCard from '../../../components/EventVerticalCard/EventVerticalCard';
import { api } from '../../../api';

const Bootcamps = () => {

    const [currentPage, setCurrentPage] = useState(1);
    const [searchText, setSearchText] = useState('');
    const [selected, setSelected] = useState('all');
    const [bootcamps, setBootcamps] = useState([]);

    const itemsPerPage = 4;

    useEffect(() => {
        setCurrentPage(1);
    }, [selected, searchText]);

    const filteredData = bootcamps.filter((item) => {
        return eventFilter(item, selected, searchText);
    });

    const getBootcamps = async () => {
        const result = await api.get("https://ataseng.com/api/bootcamps/get.php");
        if(result && result.content && result.content.length > 0)
            setBootcamps(result.content);
    }

    useEffect(() => {
        getBootcamps();
    }, []);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
    const totalPageCount = Math.ceil(filteredData.length / itemsPerPage);

    const selectMenu = {
        "active": "Aktif Eğitim Kampları",
        "passive": "Pasif Eğitim Kampları",
        "all": "Hepsi"
    };

    return (
        <div className='events-subpage'>
            <div className='events-subpage-content'>
                <Filters selectMenu={selectMenu} selected={selected} setSelected={setSelected} setSearchText={setSearchText} searchPlaceHolder={"Yarışma Ara..."} />
                <div className="events-subpage-cards">
                    {currentItems.length > 0 ? (
                        currentItems.map(item => (
                            <EventVerticalCard key={`bootcamp_card_${item.id}`} item={item}/>
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

export default Bootcamps;