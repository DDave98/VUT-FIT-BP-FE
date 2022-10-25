import '../Styles/TopNavUserProfile.css';
import { Link } from 'react-router-dom';
import {navDropDownLinks} from '../Constants/menuPath';
import { useState } from "react";
import PropTypes from 'prop-types';
import Logout from '../Services/LogoutService';

const TopNavUserProfile = ({name, surname}) => {

    const [dropdownState, setDropdownState] = useState(false);

    const dropdownToggle = () =>
    {
        var dropdown = document.getElementById("dropdown-content");
        document.getElementById("dropdown-content").classList.toggle("show");

        if(!dropdownState)
        {
            setDropdownState(true);
            dropdown.classList.add("show");
        }
        else setDropdownState(false);
    }

    return <>
        <div
            onMouseEnter={dropdownToggle}
            onMouseLeave={dropdownToggle}
            className="TopNavUserProfile"
        >
            <div id='userIcoContainer' className='userIcoContainer'>
                <img src={require('../Assets/Images/Sample_User_Icon.png')} id='userIcon'/>
            </div>
            <div id='userIcoDropdown'>
                <p id="dropName" >{name + " " + surname}</p>
                <div id="dropdown-content">
                    {
                        navDropDownLinks.map(({name, link}) => ( 
                            <Link key={name+link} to={link}  id='dropdownLink'>{name}</Link>
                        ))
                    }
                    <button id='dropdownLink' onClick={Logout} >Odhlásit se</button>
                </div>
            </div>
        </div>
    </>
}

TopNavUserProfile.propTypes = {
    name: PropTypes.string,
    surname: PropTypes.string,
}

export default TopNavUserProfile;