import { Link } from 'react-router-dom';
import '../Constants/menuPath';
import PropTypes, { object, string } from 'prop-types';
import "../Styles/TopNavLinks.css";

const TopNavLinks = ({navLinks}) => {

    return <>
        {/* Odkazy */}
        <ul className='TopNavLinks'>
            {
                navLinks.map(({name, link}) => (
                    <li key={name+link}>
                        <Link to={link}>{name}</Link>
                    </li>   
                ))
            }
        </ul>
    </>
}

TopNavLinks.propTypes =
{
    navLinks: PropTypes.arrayOf(object)
}

export default TopNavLinks;