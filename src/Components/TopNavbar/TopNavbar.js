import './TopNavbar.css';
import { Link } from 'react-router-dom';
import '../../Constants/pagesPath';
import { contactPath, galleryPath, homePath, loginPath, tarrifPath } from '../../Constants/pagesPath';

const TopNavbar = () =>
{
    return <nav className="TopNavbar relative w-full flex flex-wrap items-center justify-between py-3 bg-gray-900 text-gray-200 shadow-lg navbar navbar-expand-lg navbar-light">
        <div className="container-fluid w-full flex flex-wrap items-center justify-between px-6">
            <div
                className="navbar-toggler text-gray-200 border-0 hover:shadow-none hover:no-underline py-2 px-2.5 bg-transparent focus:outline-none focus:ring-0 focus:shadow-none focus:no-underline"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent1"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <div className="collapse navbar-collapse flex-grow items-center flex flex-row" id="navbarSupportedContent1">
                    
                        <Link to="/" className="text-xl text-white pr-2 font-semibold">
                            <img src={require('../../Assets/Images/logo192-removebg.png')} className="logo mr-2" style={{height: 45}}/>
                        </Link>
                    
                    <ul className="NavHorizontal navbar-nav flex flex-row pl-0 list-style-none mr-auto">
                        <li className="NavItem nav-item p-2">
                            <Link className='nav-link text-white opacity-60 hover:opacity-80 focus:opacity-80 p-0' to={homePath} >Hlavní stránka</Link>
                        </li>
                        <li className="NavItem nav-item p-2">
                            <Link className='nav-link text-white opacity-60 hover:opacity-80 focus:opacity-80 p-0' to={galleryPath}>Galerie</Link>
                        </li>
                        <li className="NavItem nav-item p-2">
                            <Link className='nav-link text-white opacity-60 hover:opacity-80 focus:opacity-80 p-0' to={contactPath}>Kontrakt</Link>
                        </li>
                        <li className="NavItem nav-item p-2">
                            <Link className='nav-link text-white opacity-60 hover:opacity-80 focus:opacity-80 p-0' to={tarrifPath}>Ceník</Link>
                        </li>
                        <li className="NavItem nav-item p-2">
                            <Link className='nav-link text-white opacity-60 hover:opacity-80 focus:opacity-80 p-0' to={loginPath}>Příhlásit se</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </nav>
}

export default TopNavbar;