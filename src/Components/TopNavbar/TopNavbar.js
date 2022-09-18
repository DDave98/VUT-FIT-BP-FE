import './TopNavbar.css';
import { Link } from 'react-router-dom';
import '../../Constants/menuPath';
import { navLinks } from '../../Constants/menuPath';
import TopNavUserProfile from '../TopNavUserProfile/TopNavUserProfile'
import { homePath } from '../../Constants/pagesPath';

const TopNavbar = () => {
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
                <ul className='md:flex md:items-center h-full'>
                    {
                        navLinks.map(({name, link}) => (
                            <li key={name+link} className='md:ml-8 text-xl'>
                                <Link to={link} className='inline-block h-full p-3 hover:bg-gray-100 duration-500'>{name}</Link>
                            </li>   
                        ))
                    }
                </ul>

                {/* Profil */}
                <TopNavUserProfile />
            </div>
        </nav>
    </>
}

export default TopNavbar;