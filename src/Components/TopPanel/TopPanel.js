import "./TopPanel.css";
import { homePath } from '../../Constants/pagesPath';
import { Link } from 'react-router-dom';

const TopPanel = () =>
{
    return (    
        <nav className="TopNavbar relative w-full flex flex-wrap items-center justify-between py-3 bg-gray-900 text-gray-200 shadow-lg navbar navbar-expand-lg navbar-light">
            <div className="container-fluid w-full flex flex-wrap items-center justify-between px-6">
                <div className="container-fluid">
                    <Link className="flex items-center text-gray-900 hover:text-gray-900 focus:text-gray-900 mt-2 lg:mt-0 mr-1" to={homePath}>
                        <img src={require('../../Assets/Images/logo192-removebg.png')} className="logo mr-2" />
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default TopPanel;