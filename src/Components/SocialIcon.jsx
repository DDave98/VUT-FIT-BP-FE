/**
 * tato koponenta představuje ikonu
 */

import PropTypes from 'prop-types';

const SocialIcon = ({src, className}) =>
{
    const socialIconStyle = 'h-10 hover:border-sky-500 hover:ring-2 hover:border-transparent';

    return (
        <>
            <button >
                <img src={require (src)} className={className ?? socialIconStyle}/>
            </button>           
        </>
    )
}

SocialIcon.propTypes = 
{
    src: PropTypes.string.isRequired,
    className: PropTypes.string,
}

export default SocialIcon;