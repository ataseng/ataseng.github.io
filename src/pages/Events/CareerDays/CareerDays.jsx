import { useEffect, useState } from "react";
import Filters from "../../../components/Filters/Filters";
import Pagination from "../Competitions/components/Pagination/Pagination";
import { eventFilter } from "../../../utils/eventFilter";
import CareerDaysCard from "./CareerDaysCard/CareerDaysCard";
import { careerDaysData } from "./Data/CareerDaysData";
import EventHorizontalCard from "../../../components/EventHorizontalCard/EventHorizontalCard";

const CareerDays = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchText, setSearchText] = useState('');
    const [selected, setSelected] = useState('all');
    const [modalIsOpen, setmodalIsOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const itemsPerPage = 4;

    useEffect(() => {
        setCurrentPage(1);
    }, [selected, searchText]);

    const selectMenu = {
        "active": "Aktif Kariyer Günleri",
        "passive" : "Pasif Kariyer Günleri",
        "all" : "Hepsi"
    };

    const filteredData = careerDaysData.filter((item) => {
        return eventFilter(item, selected, searchText);
    });

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
    const totalPageCount = Math.ceil(filteredData.length / itemsPerPage);

    return (

        <div className='events-subpage'>
            <div className='events-subpage-content'>
                <Filters selectMenu={selectMenu} selected={selected} setSelected={setSelected} setSearchText={setSearchText} searchPlaceHolder={"Kariyer Günü Ara..."}/>
                <div className="events-subpage-cards">
                    {
                        currentItems.length !== 0 ?
                            currentItems.map((item, key) => (
                                <EventHorizontalCard
                                    key={key}
                                    item={item}
                                    curatorTitle={"Konuşmacı"}
                                    setmodalIsOpen={setmodalIsOpen}
                                    setSelectedItem={setSelectedItem}
                                />
                            ))
                            :
                            <div className='filter-not-found-area'>
                                <p>Gösterilecek sonuç bulunmamaktadır.</p>
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

export default CareerDays;