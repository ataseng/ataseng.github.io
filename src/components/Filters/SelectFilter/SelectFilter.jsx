import { useState } from "react";
import { MdArrowDropDown } from "react-icons/md";
import PropTypes from 'prop-types';
import "./SelectFilter.css";

const SelectFilter = ({ selectMenu, selected, setSelected }) => {
    const [openSelect, setOpenSelect] = useState(false);
    
    return (
        <div onClick={() => setOpenSelect(!openSelect)} className="selectFilter">
            <div className="select">
                <p>{selectMenu[selected]}</p>
                <i><MdArrowDropDown /></i>
            </div>
            <div className={`option ${openSelect === true ? "active" : ''}`}>
                <div className="option-menu">
                    <ul>
                        {
                            Object.keys(selectMenu).map((menuItemKey, index) => (
                                <li key={`select_menu_item_${menuItemKey}_${index}`} onClick={() => {
                                    setOpenSelect(!openSelect);
                                    setSelected(menuItemKey)
                                }}>{selectMenu[menuItemKey]}</li>
                            ))
                        }
                    </ul>
                </div>
            </div>
        </div>
    )
}

SelectFilter.propTypes = {
    selectMenu: PropTypes.object.isRequired,
    selected: PropTypes.string.isRequired,
    setSelected: PropTypes.func.isRequired
};

export default SelectFilter;