import './Competitions.css';
import { useEffect, useState } from 'react';
// import { competitionsData } from './Data/CompetitionsData';
import Pagination from './components/Pagination/Pagination';
import CompetitionsCard from './components/CompetitionsCard/CompetitionsCard';
import Filters from '../../../components/Filters/Filters';
import { eventFilter } from '../../../utils/eventFilter';
import EventVerticalCard from '../../../components/EventVerticalCard/EventVerticalCard';
import { api } from '../../../api';

const Competitions = () => {

    const [currentPage, setCurrentPage] = useState(1);
    const [searchText, setSearchText] = useState('');
    const [selected, setSelected] = useState('all');
    const [competitions, setCompetitions] = useState([]);

    const itemsPerPage = 4;
    const selectMenu = {
        "active": "Aktif Yarışmalar",
        "passive": "Pasif Yarışmalar",
        "all": "Hepsi"
    };

    useEffect(() => {
        setCurrentPage(1);
    }, [selected, searchText]);

    const filteredData = competitions?.filter((item) => {
        return eventFilter(item, selected, searchText);
    });

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredData?.slice(indexOfFirstItem, indexOfLastItem);
    const totalPageCount = Math.ceil(filteredData?.length / itemsPerPage);

    const getCompetitions = async () => {
        const result = await api.get("https://ataseng.com/api/competitions/get.php");
        if(result && result.content && result.content.length > 0)
            setCompetitions(result.content);
    }

    useEffect(() => {
        getCompetitions();
    }, []);

    return (
        <div className='events-subpage'>
            <div className='events-subpage-content'>
                <Filters selectMenu={selectMenu} selected={selected} setSelected={setSelected} setSearchText={setSearchText} searchPlaceHolder={"Yarışma Ara..."} />
                <div className="events-subpage-cards">
                    {currentItems?.length > 0 ? (
                        currentItems?.map((item, index) => (
                            <EventVerticalCard key={`competition_card_${index}`} item={item}/>
                        ))
                    ) : (
                        <div className='filter-not-found-area'>
                            <p>Gösterilecek yarışma bulunmamaktadır.</p>
                        </div>
                    )}
                </div>
                <Pagination totalPageCount={totalPageCount} currentPage={currentPage} setCurrentPage={setCurrentPage} />
            </div>
        </div>
    )
}

export default Competitions