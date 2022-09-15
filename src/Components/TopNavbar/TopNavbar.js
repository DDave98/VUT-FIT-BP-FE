import './TopNavbar.css';
import { Link } from 'react-router-dom';
import { contactPath, galleryPath, homePath, loginPath, tarrifPath } from '../../Constants/pagesPath';

const TopNavbar = () => {
    return <>
        <nav className="relative w-full flex flex-wrap items-center justify-between py-3 bg-gray-900 text-gray-200 shadow-lg navbar navbar-expand-lg navbar-light">
            <div className="container-fluid w-full flex flex-wrap items-center justify-between px-6">
                <div className="collapse navbar-collapse flex-grow items-center" id="navbarSupportedContent1">

                    {/* Logo */}
                    <a className="text-xl text-white pr-2 font-semibold" href="#">Logo</a>

                    {/*<!-- Left links -->*/}
                    <ul className="navbar-nav flex flex-col pl-0 list-style-none mr-auto">
                        <li class="nav-item p-2">
                            <Link class="nav-link text-white" href="#">Dashboard</Link>
                        </li>
                        <li class="nav-item p-2">
                            <Link class="nav-link text-white opacity-60 hover:opacity-80 focus:opacity-80 p-0" href="#">
                                Uživatelé
                            </Link>
                        </li>
                        <li class="nav-item p-2">
                            <Link class="nav-link text-white opacity-60 hover:opacity-80 focus:opacity-80 p-0" href="#">
                                Přihlášení
                            </Link>
                        </li>
                        <li class="nav-item p-2">
                            <Link class="nav-link text-white opacity-60 hover:opacity-80 focus:opacity-80 p-0" href="#">
                                Aplikace
                            </Link>
                        </li>
                    </ul>
                </div>

                {/*<!-- Collapsible wrapper -->*/}

                {/*<!-- Right elements -->*/}

                <div className="flex items-center relative">
                    <div className="dropdown relative">
                        
                        <Link className="dropdown-toggle flex items-center hidden-arrow" href="#" id="dropdownMenuButton2" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <img src="https://mdbootstrap.com/img/new/avatars/2.jpg" className="rounded-full" alt="" loading="lazy" id='userProfile'/>
                        </Link>

                        <ul className="dropdown-menu min-w-max absolute hidden bg-white text-base z-50 float-left py-2 list-none text-left rounded-lg shadow-lg mt-1 hidden m-0 bg-clip-padding border-none left-auto right-0" aria-labelledby="dropdownMenuButton2">
                            <li>
                                <Link className="dropdown-item text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700 hover:bg-gray-100" href="#">
                                    Action
                                </Link>
                            </li>
                            <li>
                                <Link className="dropdown-item text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700 hover:bg-gray-100" href="#">
                                    Action
                                </Link>
                            </li>
                            <li>
                                <Link className="dropdown-item text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700 hover:bg-gray-100" href="#">
                                    Action
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    </>
}

export default TopNavbar;