import React, { useContext } from 'react';

/** CSS Imports ***/
import './Header.css';

/*** Router Imports  ***/
import { useNavigate } from 'react-router-dom';

/*** Redux Imports ***/
import { useDispatch, useSelector } from 'react-redux';
import { useGetMyProfileQuery } from 'redux-app/apis/ProfileAPI';
import { logout } from 'redux-app/slices/AuthSlice';

/*** Component Imports ***/
import Dropdown from 'components/Dropdown/Dropdown';

/*** Icon Imports ***/
import { FaBars, FaCartShopping } from "react-icons/fa6";
import { BsSearch } from "react-icons/bs";
import { MdApps } from 'react-icons/md';
import { IoNotifications } from "react-icons/io5";

/*** Context Imports ***/
import SidebarContext from 'contexts/SidebarContext';

function Header() {

    /* useContext */
    const { isSidebarOpen, setIsSidebarOpen } = useContext(SidebarContext);

    /* Router */
    const navigate = useNavigate();

    /* Redux */
    const { isLoading } = useGetMyProfileQuery();
    const { account: authAccount } = useSelector(state => state.auth)
    const dispatch = useDispatch();

    return (
        <div className='header'>
            <div className='header_left'>

                {/* Menu Bar */}
                <span className='header_icon'
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                    <FaBars size={20} />
                </span>

                {/* Logo */}
                <img src='https://img.freepik.com/premium-vector/red-youtube-logo-social-media-logo_197792-1803.jpg'
                    alt='logo' className='header_logo'
                    onClick={() => navigate('/')} />
            </div>

            {/* Search Bar */}
            <div className='header_center'>
                <div className='header_search'>
                    <input type='text' placeholder='Search' />
                    <button type='submit'>
                        <BsSearch size={22} />
                    </button>
                </div>
            </div>

            <div className='header_right'>
                <span className='header_icon'>
                    <IoNotifications id='icon' size={26} />
                    <span id='badge'>10</span>
                </span>
                <span className='header_icon'>
                    <FaCartShopping id='icon' size={25} />
                    <span id='badge'>10</span>
                </span>
                <span className='header_icon'>
                    <MdApps size={26} />
                </span>
                {
                    authAccount
                        ?
                        <Dropdown>
                            <Dropdown.Title enableArrow={false}>
                                <span>{authAccount?.username}</span>
                                <img className='header_right_avatar'
                                    src='https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/batman_hero_avatar_comics-512.png'
                                    alt='avatar' />
                            </Dropdown.Title>
                            <Dropdown.Menu>
                                <Dropdown.Item clickable={false}>
                                    <div className='d-flex flex-column'>
                                        <span>STEPHEN PHYO</span>
                                        <span>a@gmail.com</span>
                                    </div>
                                </Dropdown.Item>
                                <Dropdown.Separator />
                                <Dropdown.Item onClick={() => console.log('My Profile')}>My Profile</Dropdown.Item>
                                <Dropdown.Item>Order History</Dropdown.Item>
                                <Dropdown.Item
                                    style={{ 'color': 'red' }}
                                    onClick={() => dispatch(logout())}>
                                    Logout
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                        : !isLoading && (
                            <button onClick={() => navigate('/login')}>Login</button>
                        )
                }
            </div>
        </div >
    );
}

export default Header;
// <Dropdown title='User'>
//     <Dropdown.Item>My Profile</Dropdown.Item>
//     <Dropdown.Item>Order History</Dropdown.Item>
//     <Dropdown.Item style={{ 'color': 'red' }}>Logout</Dropdown.Item>
// </Dropdown>