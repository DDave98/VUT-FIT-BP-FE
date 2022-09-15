import './TopNavbar.css';
import { Link } from 'react-router-dom';
import '../../Constants/menuPath';
import { navLinks } from '../../Constants/menuPath';
import  {
    DropdownToggle,
    DropdownMenu,
    DropdownMenuWrapper,
    MenuItem,
    Dropdown,
    DropdownButton
}  from '@trendmicro/react-dropdown';
import '@trendmicro/react-dropdown/dist/react-dropdown.css';

const TopNavbar = () => {
    return <>
        <nav className='w-full fixed top-0 left-0 shadow-md'>
            <div className='md:flex items-center justify-between bg-white py-4 md:px-10 px-7'>

                {/* LOGO */}
                <Link className='font-bold text-2x1 cursor-pointer flex items-center font-sans'>
                    <span className='text-3x1 text-indigo-600 mr-1 pt-2'>
                        <img src={require('../../Assets/Images/vut.cz.png')} id='logo'/>
                    </span>
                </Link>

                {/* Odkazy */}
                <ul className='md:flex md:items-center h-full'>
                    {
                        navLinks.map((link) => (
                            <li className='md:ml-8 text-xl'>
                                <Link className='inline-block h-full p-3 hover:bg-gray-100 duration-500'>{link.name}</Link>
                            </li>   
                        ))
                    }
                </ul>

                {/* Profil */}
                <div className="flex flex-row dropdown flex-wrap content-between">
                    <div>
                        <img src={require('../../Assets/Images/Sample_User_Icon.png')} id='userIcon'/>
                    </div>
                    <div>
                    </div>
                </div>
            </div>
        </nav>
    </>
}

export default TopNavbar;