import './Competitions.css';
import { useEffect, useState } from 'react';
import { competitionsData } from './Data/CompetitionsData';
import Pagination from './components/Pagination/Pagination';
import CompetitionsCard from './components/CompetitionsCard/CompetitionsCard';
import Filters from '../../../components/Filters/Filters';
import { eventFilter } from '../../../utils/eventFilter';

const Competitions = () => {

    const [currentPage, setCurrentPage] = useState(1);
    const [searchText, setSearchText] = useState('');
    const [selected, setSelected] = useState('all');
    const itemsPerPage = 4;
    const selectMenu = {
        "active": "Aktif Yarışmalar",
        "passive": "Pasif Yarışmalar",
        "all" : "Hepsi"
    };

    useEffect(() => {
        setCurrentPage(1);
    }, [selected, searchText]);

    const filteredData = competitionsData.filter((item) => {
        return eventFilter(item, selected, searchText);
    });

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
    const totalPageCount = Math.ceil(filteredData.length / itemsPerPage);

    return (
        <div className='events-subpage'>
            <div className='events-subpage-content'>
            <Filters selectMenu={selectMenu} selected={selected} setSelected={setSelected} setSearchText={setSearchText} searchPlaceHolder={"Yarışma Ara..."}/>
            <div className="events-subpage-cards">
                {currentItems.length > 0 ? (
                    currentItems.map((item) => (
                        <CompetitionsCard key={`competition_card_${item.id}`} data={item} />
                    ))
                ) : (
                    <div className='result'>
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