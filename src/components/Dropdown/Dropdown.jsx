import React, { createContext, useState, useRef, useEffect, useContext } from 'react';

/*** CSS Imports ***/
import './Dropdown.css';

/*** Icon Imports ***/
import { IoMdArrowDropdown } from "react-icons/io";

/*** Context ***/
const DropdownContext = createContext();

/*** Context Provider ***/
const DropdownContextProvider = (props) => {

    /* useState */
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    /* Context Values */
    const value = {
        isDropdownOpen, setIsDropdownOpen
    };

    return (
        <DropdownContext.Provider value={value}>
            {props.children}
        </DropdownContext.Provider>
    );
}

/*** Dropdown ***/
function Dropdown(props) {
    return (
        <DropdownContextProvider>
            <div className='sp-dropdown'>
                {props.children}
            </div>
        </DropdownContextProvider>
    );
}

/*** Dropdown Title ***/
function Title(props) {
    /* useContext */
    const { isDropdownOpen, setIsDropdownOpen } = useContext(DropdownContext);

    return (
        <p className='sp-dropdown-title'
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
            {props.children} <IoMdArrowDropdown size={22} />
        </p>
    )
}

/*** Dropdown Menu ***/
function Menu(props) {
    /* useContext */
    const { isDropdownOpen, setIsDropdownOpen } = useContext(DropdownContext);

    /* useRef */
    const dropdownRef = useRef(null);

    /* Functions */


    /* useEffect */
    useEffect(() => {
        const handleExternalClick = (e) => {
        if (isDropdownOpen) {
            console.log(dropdownRef.current.contains(e.target))
            console.log(dropdownRef.current.contains(e.target.parentNode))
            console.log(dropdownRef.current.contains(e.target.parentTarget))
        //     if (dropdownRef.current && !dropdownRef.current.contains(e.target)){
        //     setIsDropdownOpen(false);
        // }
        }
        }

        if (isDropdownOpen) {
            document.addEventListener('click', handleExternalClick);
            console.log('Listeb')

            return () => {
            document.removeEventListener('click', handleExternalClick);
        }
        }
    }, [isDropdownOpen]);

    return (
        <ul ref={dropdownRef}
            className={`sp-dropdown-menu ${isDropdownOpen ? 'open' : ''}`}>
            {props.children}
        </ul>
    );
}

/*** Dropdown Item ***/
function Item(props) {
    return (
        <div className='sp-dropdown-item' {...props}>
            <span className='dropdown-item-icon-left'>{props.leftIcon}</span>
            {props.children}
            <span className='dropdown-item-icon-right'>{props.rightIcon}</span>
        </div>
    );
}

Dropdown.Dropdown = Dropdown;
Dropdown.Title = Title
Dropdown.Menu = Menu;
Dropdown.Item = Item;

export default Dropdown;