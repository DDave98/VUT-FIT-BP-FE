import '../Styles/TopNavUserProfile.css';
import { Link, useNavigate } from 'react-router-dom';
import {navDropDownLinks} from '../Constants/menuPath';
import { useState } from "react";
import PropTypes from 'prop-types';
import { Logout } from '../Services/LogoutService';

// hook
import useAuth from '../Hooks/useAuth';

const TopNavUserProfile = ({name, surname}) => {

    const [dropdownState, setDropdownState] = useState(false);

    const { setAuth } = useAuth();
    const navigate = useNavigate(); 

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

    const logout = async () =>
    {
        setAuth({});
    }

    return <>
        <div
            onMouseEnter={dropdownToggle}
            onMouseLeave={dropdownToggle}
            className="flex flex-row dropdown flex-wrap content-between mr-10"
        >
            <div id='userIcoContainer' className='mr-2'>
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
                    <button id='dropdownLink' onClick={logout} >Odhlásit se</button>
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