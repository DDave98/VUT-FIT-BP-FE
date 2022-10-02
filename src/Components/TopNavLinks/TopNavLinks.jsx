import { Link } from 'react-router-dom';
import '../../Constants/menuPath';
import { useState, useEffect } from 'react';
import PropTypes, { object, string } from 'prop-types';

const TopNavLinks = ({navLinks}) => {

    return <>
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
    </>
}

TopNavLinks.propTypes =
{
    navLinks: PropTypes.arrayOf(object)
}

export default TopNavLinks;