import './TopNavbar.css';
import { Link } from 'react-router-dom';
import { homePath} from '../../Constants/pagesPath';

const TopNavbar = () => {
    return <>
        <nav className='w-full fixed top-0 left-0 shadow-md'>
            <div className='md:flex items-center justify-between bg-white py-4 md:px-10 px-7'>

                {/* LOGO */}
                <div className='font-bold text-2x1 cursor-pointer flex items-center font-sans'>
                    <span className='text-3x1 text-indigo-600 mr-1 pt-2'>
                        <img src={require('../../Assets/Images/vut.cz.png')} id='logo'/>
                    </span>
                </div>

                {/* Odkazy */}
                <ul className='md:flex md:items-center h-full'>
                        <li className='md:ml-8 text-xl'>
                            <Link className='inline-block h-full p-3 hover:bg-gray-100 duration-500'>DashBoard</Link>
                        </li>
                        <li className='md:ml-8 text-xl'>
                            <Link className='h-full p-3 hover:bg-gray-100 duration-500'>Uživatelé</Link>
                        </li>
                        <li className='md:ml-8 text-xl'>
                            <Link className='h-full p-3 hover:bg-gray-100 duration-500'>Záznamy</Link>
                        </li>
                        <li className='md:ml-8 text-xl'>
                            <Link className='h-full p-3 hover:bg-gray-100 duration-500'>Aplikace</Link>
                        </li>
                </ul>

                {/* Profil */}

            </div>
        </nav>
    </>
}

export default TopNavbar;