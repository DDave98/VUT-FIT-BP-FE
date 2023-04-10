import { generatePath } from "react-router-dom";
import { usePublicApi } from "../../Hooks/usePublicAPI";
import { consoleLog } from "../../Services/DebugService";
import {
    PropTypes,
    useState,
    useEffect,
    PublicAPI,
    apiPath,
    NotificationManager,
    BreakLine
} from "./LoginPage-imports";
import SocialIcon from "./SocialIcon";

const GetLogoByName = (name) =>
{
    switch(name)
    {
        case "Github": return require('../../Assets/Images/socialIcons/github.png');
        case "Instagram": return require('../../Assets/Images/socialIcons/instagram.png');
        case "Facebook": return require('../../Assets/Images/socialIcons/facebook.png');
        case "Google": return require('../../Assets/Images/socialIcons/google.png');
        case "Microsoft": return require('../../Assets/Images/socialIcons/microsoft.png');
        case "Linkedin": return require('../../Assets/Images/socialIcons/linkedin.png');
        case "Gitlab": return require('../../Assets/Images/socialIcons/gitlab.png');
        default: return require('../../Assets/Images/socialIcons/web.bmp');
    }
}


///
const SocialAuth = (
{
    disable = false,
    onSuccess, setLoadMode
}) =>
{
    const [providers, setProviders] = useState([]);    // seznam providerů
    const [SendRequest, GenerateParams, GenerateError] = usePublicApi();

    // funkce pro načtení seznamu providerů ze serveru
    const LoadProviders = async () =>
    {
        const errorMessage = "Chyba při načístání";
        const errorTitle = "Nelze načíst seznam providerů";
        const error = GenerateError(errorMessage, errorTitle);
        const params = generatePath(apiPath.allProviders);
        const response = await SendRequest(params, error);
        if(response != undefined) setProviders(response.data);
    }

    useEffect(() => 
    {
        LoadProviders(); // načtení providerů ze serveru
    }, []);

    const loadIco = (src, name) =>
    {
        const imgPre = 'data:image/png;base64,';
        if (src == "" || src == null) 
        {
            var logo =  GetLogoByName(name);
            return logo;
        }
        else return imgPre + src;
    };

    const BreakLineText = "nebo";

    return (
    <>
        {
            providers.length > 0 ? 
            <BreakLine>{BreakLineText}</BreakLine>
            : <></>
        }

        <div
            id = 'loginSocialIcons'
            className = "SocialIconPanel"
        >
            {
                providers.map((prov, key) =>
                (
                    <SocialIcon
                        src={loadIco(prov.ico, prov.name)}
                        name={prov.name}
                        api={prov.api}
                        key={key}
                        cid={prov.clientId}
                        scope={prov.scope}
                        setLoadMode={setLoadMode}
                        onSuccess={onSuccess}
                    />
                ))
            }
        </div>
    
    </>)
};

SocialAuth.propTypes = 
{
    setOnSuccess: PropTypes.func,
}

export default SocialAuth;