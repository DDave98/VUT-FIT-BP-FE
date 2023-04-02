/**
 * tato koponenta představuje ikonu
 */

import PropTypes from 'prop-types';
import "../../Styles/SocialIcon.css";

const SocialIcon = (
{
    src,
    className,
    name,
    disable = false,
    cid, api
}) =>
{

    /*const [wait, setWait] = useState(false);*/

    const LogIn = async (e) =>
    {
        const client_id = "?client_id=" + cid;
        const redirect_uri = "&redirect_uri=" + "http://localhost:3000/login"; // získat doménu dynamicky
        window.location.assign(api + client_id + redirect_uri); 
    }


    return (
        <>
            <img
                src={src}
                className={"SocialIcon"}
                onClick={LogIn}
                title={name}
                alt={name}
            />
        </>
    )
}

SocialIcon.propTypes = 
{
    src: PropTypes.string.isRequired,
    className: PropTypes.string,
    name: PropTypes.string,
    onClick: PropTypes.func,
}

export default SocialIcon;