
// General
import { Link } from 'react-router-dom';
import { propTypes } from 'react-bootstrap/esm/Image';
import { useState, useEffect } from 'react';

// Services

// Components
import TopNavUserProfile from './TopNavUserProfile/TopNavUserProfile'

// Constants
import '../Styles/TopNavbar.css';
import { navLinks as links } from '../Constants/menuPath';
import TopNavLinks from './TopNavLinks/TopNavLinks';
import { homePath } from '../Constants/pagesPath';
import config from "../Constants/config.json";
import { PrivateAPI } from '../Services/AjaxService';

const TopNavbar = ({setOnError}) => {

    const [firstName, setFirstName] = useState('Jmeno');
    const [lastName, setLastName] = useState('Příjmení');

    const GetBaseInfo = async () =>
    {
        const baseInfoPath = config.path.user.baseInfo;

        try
        {
            const response = await PrivateAPI.get(baseInfoPath);
            console.log("data:  ", response.data);
            setFirstName(response.data.name);
        }
        catch (err)
        {
            if (!err?.response) setOnError("žádná odpověď od serveru, zkontrolujte prosím připojení.");
            else if (err.response?.status === 400) setOnError("některý z uvedených parametrů je neplatný");
            else setOnError("Přihlášení se nezdařila");
            console.log("topNav error: ", err?.message);
        } 
    }

    // hook pro načtení dat
    useEffect(() =>
    {
        GetBaseInfo();
    }, []);

    return <>
        <nav className='w-full fixed top-0 left-0 shadow-md'>
            <div className='md:flex items-center justify-between bg-white py-4 md:px-10 px-7'>

                {/* LOGO */}
                <Link to={homePath} className='font-bold text-2x1 cursor-pointer flex items-center font-sans'>
                    <span className='text-3x1 text-indigo-600 mr-1 pt-2'>
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
    setOnError: propTypes.func,
}

export default TopNavbar;