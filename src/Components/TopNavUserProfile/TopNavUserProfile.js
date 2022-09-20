import './TopNavUserProfile.css';
import { Link } from 'react-router-dom';
import {navDropDownLinks} from '../../Constants/menuPath';
import DropDowHook from './DropDownHook';
import PropTypes from 'prop-types';

const TopNavUserProfile = ({name, surname}) => {

    const {dropdownState, dropdownToggle} = DropDowHook();

    return <>
        <div onClick={dropdownToggle} className="flex flex-row dropdown flex-wrap content-between mr-10">
            <div id='userIcoContainer' className='mr-2'>
                <img src={require('../../Assets/Images/Sample_User_Icon.png')} id='userIcon'/>
            </div>
            <div id='userIcoDropdown'>
                <p id="dropName" >{name + " " + surname}</p>
                <div id="dropdown-content">
                    {
                        navDropDownLinks.map(({name, link}) => ( 
                            <Link key={name+link} to={link}  id='dropdownLink'>{name}</Link>
                        ))
                    }
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