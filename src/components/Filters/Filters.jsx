import SelectFilter from "./SelectFilter/SelectFilter";
import SearchFilter from "./SearchFilter/SearchFilter";
import "./Filters.css";
import PropTypes from "prop-types";

const Filters = ({ selectMenu, selected, setSelected, setFiltered, searchPlaceHolder }) => {
    return (
        <div className="filter-area">
            <SelectFilter selectMenu={selectMenu} selected={selected} setSelected={setSelected} />
            <SearchFilter setFiltered={setFiltered} searchPlaceHolder={searchPlaceHolder} />
        </div>
    )
};

Filters.propTypes = {
    selectMenu: PropTypes.object.isRequired,
    selected: PropTypes.string.isRequired,
    setSelected: PropTypes.func.isRequired,
    setFiltered: PropTypes.func.isRequired,
    searchPlaceHolder: PropTypes.string.isRequired
};

export default Filters;