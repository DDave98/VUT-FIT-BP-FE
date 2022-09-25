import '../../Styles/TopNavbar.css';
import { Link } from 'react-router-dom';
import '../../Constants/menuPath';
import { navLinks } from '../../Constants/menuPath';
import TopNavUserProfile from '../TopNavUserProfile/TopNavUserProfile'
import { homePath } from '../../Constants/pagesPath';
import { navLinks as links } from '../../Constants/menuPath';
import { useState, useEffect } from 'react';
import TopNavLinks from '../TopNavLinks/TopNavLinks';

const TopNavbar = () => {

    const [firstName, setFirstName] = useState('Jmeno');
    const [lastName, setLastName] = useState('Příjmení');

    // hook pro načtení dat

    return <>
        <nav className='w-full fixed top-0 left-0 shadow-md'>
            <div className='md:flex items-center justify-between bg-white py-4 md:px-10 px-7'>

                {/* LOGO */}
                <Link to={homePath} className='font-bold text-2x1 cursor-pointer flex items-center font-sans'>
                    <span className='text-3x1 text-indigo-600 mr-1 pt-2'>
                        <img src={require('../../Assets/Images/vut.cz.png')} id='logo'/>
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

//TopNavbar.propTypes = {}

export default TopNavbar;