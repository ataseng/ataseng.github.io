import "./SearchFilter.css";
import PropTypes from 'prop-types';

const SearchFilter = ({ setFiltered, searchPlaceHolder }) => {
    return (
        <div className="search-filter">
            <input onChange={(e => { setFiltered(e.target.value) })} type="text" placeholder={searchPlaceHolder} />
        </div>
    )
}

SearchFilter.propTypes = {
    setFiltered: PropTypes.func.isRequired,
    searchPlaceHolder: PropTypes.string.isRequired
};

export default SearchFilter;