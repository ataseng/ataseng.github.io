import './Competitions.css';
import { useEffect, useState } from 'react';
import { competitionsData } from './components/Data/CompetitionsData';
import Pagination from './components/Pagination/Pagination';
import CompetitionSelectFilter from './components/CompetitionSelectFilter/CompetitionSelectFilter';
import CompetitionSearchFilter from './components/CompetitionSearchFilter/CompetitionSearchFilter';
import CompetitionsCard from './components/CompetitionsCard/CompetitionsCard';

const Competitions = () => {
    // const formatTitle = (title) => {
    //     return title.toLowerCase().split(' ').join('-')
    // };

    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [select, setSelect] = useState('all');
    const itemsPerPage = 4;

    useEffect(() => {
        setCurrentPage(1);
    }, [select, searchQuery]);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const filteredData = competitionsData.filter((item) => {
        const matchesSearch = item.title && item.title.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = (select === 'all') || (item.status && select === item.status);
        return matchesSearch && matchesStatus;
    });

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
    const totalPageCount = Math.ceil(filteredData.length / itemsPerPage);

    return (
        <>
            <div className='content'>
            <header>
                <CompetitionSelectFilter select={select} setSelect={setSelect} />
                <CompetitionSearchFilter searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
            </header>

            <div className="card-container">
                {currentItems.length > 0 ? (
                    currentItems.map((item) => (
                        <CompetitionsCard key={item.id} data={item} />
                    ))
                ) : (
                    <div className='result'>
                        <p>Gösterilecek yarışma bulunmamaktadır.</p>
                    </div>
                )}
            </div>
            <Pagination totalPages={totalPageCount} currentPage={currentPage} paginate={paginate} />
        </div>
        </>
    )
}

export default Competitions