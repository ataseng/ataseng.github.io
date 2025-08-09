import "./SearchFilter.css";
import PropTypes from 'prop-types';

const SearchFilter = ({ setSearchText, searchPlaceHolder }) => {
    return (
        <div className="search-filter">
            <input onChange={(e => { setSearchText(e.target.value) })} type="text" placeholder={searchPlaceHolder} />
        </div>
    )
}

SearchFilter.propTypes = {
    setSearchText: PropTypes.func.isRequired,
    searchPlaceHolder: PropTypes.string.isRequired
};

export default SearchFilter;