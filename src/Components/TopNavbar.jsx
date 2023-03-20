
// General
import { Link } from 'react-router-dom';
import { propTypes } from 'react-bootstrap/esm/Image';
import { useState, useEffect } from 'react';

// Services

// Components
import TopNavUserProfile from './TopNavUserProfile'

// Constants
import '../Styles/TopNavbar.css';
import { navLinks as links } from '../Constants/menuPath';
import TopNavLinks from './TopNavLinks';
import { homePath } from '../Constants/pagesPath';
import config from "../Constants/config.json";
import {NotificationManager} from 'react-notifications';

// Prototyp
import { GetFromStorage } from '../Services/StorageService';
import { PrivateAPI } from '../Services/AjaxService';
import { accessTokenTag } from '../Constants/storageTag';

const TopNavbar = () => {

    const [firstName, setFirstName] = useState('Jmeno');
    const [lastName, setLastName] = useState('Příjmení');

    const GetBaseInfo = async () =>
    {
        const selfInfo = config.path.selfInfo;

        try
        {
            var token = GetFromStorage(accessTokenTag);
            console.log("token: ", token)
            const response = await PrivateAPI.get(selfInfo, 
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            console.log("data:  ", response.data);
            setFirstName(response.data.name);
            setLastName(response.data.surname);
        }
        catch (err)
        {
            NotificationManager.error("nelze načíst data", "BaseInfo()", 10000);
            console.log("topNav error: ", err);
        }
    }

    // hook pro načtení dat
    useEffect(() =>
    {
        GetBaseInfo();
    }, []);

    return <>
        <nav className='NavBar'>
            <div className='NavBarLayout'>

                {/* LOGO */}
                <Link to={homePath} className='NavBarLink'>
                    <span>
                        <img src={require('../Assets/Images/vut.cz.png')} id='logo'/>
                    </span>
                </Link>

                {/* Odkazy */}
                <TopNavLinks navLinks={links} />

                {/* Profil */}
                <TopNavUserProfile name={firstName} surname={lastName} />
            </div>
        </nav>
    </>
}

TopNavbar.propTypes =
{
}

export default TopNavbar;