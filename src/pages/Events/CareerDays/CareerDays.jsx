import { useEffect, useState } from "react";
import Filters from "../../../components/Filters/Filters";
import Pagination from "../Competitions/components/Pagination/Pagination";
import { eventFilter } from "../../../utils/eventFilter";
import EventHorizontalCard from "../../../components/EventHorizontalCard/EventHorizontalCard";
import { api } from "../../../api";

const CareerDays = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchText, setSearchText] = useState('');
    const [selected, setSelected] = useState('all');
    const [careerDays, setCareerDays] = useState([]);
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

    const filteredData = careerDays.filter((item) => {
        return eventFilter(item, selected, searchText);
    });

    const getCareerDays = async () => {
        const result = await api.get("https://ataseng.com/api/career_days/get.php");
        if(result && result.content && result.content.length > 0)
            setCareerDays(result.content);
    }

    useEffect(() => {
        getCareerDays();
    }, []);

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
                                <p>Gösterilecek etkinlik bulunmamaktadır.</p>
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