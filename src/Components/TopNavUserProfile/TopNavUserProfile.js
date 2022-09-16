import './TopNavUserProfile.css';
import { Link } from 'react-router-dom';
import {navDropDownLinks} from '../../Constants/menuPath';
import DropDowHook from './DropDownHook';

const TopNavUserProfile = () => {
    return <>
        <div className="flex flex-row dropdown flex-wrap content-between">
            <div id='userIcoContainer'>
                <img src={require('../../Assets/Images/Sample_User_Icon.png')} id='userIcon'/>
            </div>
            <div id='userIcoDropdown'>
                <button id="dropbtn" onClick={() => DropDowHook()}>Jméno Příjmení</button>
                {
                    navDropDownLinks.map((link) => ( 
                        <div id="dropdown-content">
                            <Link id='dropdownLink'>{link.name}</Link>
                        </div>
                    ))
                }
            </div>
        </div>
    </>
}

export default TopNavUserProfile;