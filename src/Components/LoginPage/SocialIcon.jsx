/**
 * tato koponenta představuje ikonu
 */

import "../../Styles/SocialIcon.css";
import {
    PropTypes,
    SaveToStorage,
    providerTag
} from "./LoginPage-imports";

const SocialIcon = (
{
    src,
    className,
    name,
    disable = false,
    cid, api, scope
}) =>
{

    /*const [wait, setWait] = useState(false);*/

    const LogIn = async (e) =>
    {
        SaveToStorage(name, providerTag);
        const client_id = "?client_id=" + cid;
        const redirect_uri = "&redirect_uri=" + "http://localhost:3000/login"; // získat doménu dynamicky
        const response_type = "&response_type=code";
        const scopes = "&scope=" + scope
        window.location.assign(api + client_id + redirect_uri + response_type + scopes); 
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