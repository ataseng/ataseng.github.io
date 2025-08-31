
import React, { useState, useEffect } from 'react';
import './Sidebar.css';
import { Icon } from '@iconify/react';
import menuData from './menu.json';
import MenuItem from './MenuItem';
import HamburgerMenu from './HamburgerMenu';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/actions/userActions';
import { Link, useLocation, useNavigate } from 'react-router-dom';
/**
 * Sidebar component that displays a navigation menu with a theme toggle.
 *
 * This component renders a sidebar with a list of menu items and an icon to toggle the theme.
 * It also handles the opening and closing of a mobile hamburger menu.
 *
 * @component
 * @example
 * return (
 *   <Sidebar />
 * )
 *
 * @returns {JSX.Element} A JSX element representing the Sidebar.
 */

const Sidebar = ({ setTheme, theme }) => {

    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setMenuOpen(prevState => !prevState);
    };

    const toggleTheme = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark');
    }

    const userLogin = useSelector(state => state.userLogin);
    const { error, loading, userInfo } = userLogin;

    const dispatch = useDispatch();

    const logoutHandler = e => {
        e.preventDefault();
        dispatch(logout());
        if(menuOpen){
            toggleMobileMenu();
        }
    }

    return (

        <div>
            {/* Desktop Sidebar */}
            <div className={`sidebar ${theme === 'dark' ? 'dark-mode' : ''}`}>
                <ul>
                    {menuData.map((item, index) => (
                        <li key={index}>
                            <MenuItem item={item} onClick={menuOpen ? toggleMobileMenu : undefined} />
                        </li>
                    ))}
                    {
                        userInfo ?
                            <>
                                <li>
                                    <MenuItem
                                        item={{
                                            "name": "Profil",
                                            "icon": "healthicons:ui-user-profile",
                                            "link": "/profil"
                                        }}
                                        onClick={menuOpen ? toggleMobileMenu : undefined}
                                        user = {userInfo.user}
                                    />
                                </li>
                                <li>
                                    <Link onClick={logoutHandler}>
                                        <Icon icon={"entypo:log-out"} className="icon" />
                                        <span>Çıkış Yap</span>
                                    </Link>
                                </li>
                            </>
                            :
                            <>
                                <li>
                                    <MenuItem
                                        item={{
                                            "name": "Kayıt Ol",
                                            "icon": "entypo:add-user",
                                            "link": "/kayit"
                                        }}
                                        onClick={menuOpen ? toggleMobileMenu : undefined}
                                    />
                                </li>
                                <li>
                                    <MenuItem
                                        item={{
                                            "name": "Giriş Yap",
                                            "icon": "entypo:login",
                                            "link": "/giris"
                                        }}
                                        onClick={menuOpen ? toggleMobileMenu : undefined}
                                    />
                                </li>
                            </>
                            
                    }
                </ul>
                <div className="icon moon-sun" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
                    <Icon icon={theme === 'dark' ? 'ph:sun' : 'ph:moon'} />
                </div>
            </div>

            {/* Mobile Hamburger Menu Icon */}
            <div className={`hamburger-menu-icon ${menuOpen ? 'open' : ''} ${theme === 'dark' ? 'dark-mode' : ''}`} onClick={toggleMobileMenu}>
                <Icon icon={menuOpen ? 'mdi:close' : 'mdi:menu'} />
            </div>

            <HamburgerMenu isOpen={menuOpen} toggleMenu={toggleMobileMenu} theme={theme} toggleTheme={toggleTheme} logoutHandler={logoutHandler}/>

        </div>

    );
};

export default Sidebar;
