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

    // funkce pro načtení seznamu providerů ze serveru
    const LoadProviders = async () =>
    {
        try
        {
            const path = apiPath.allProviders;
            const response = await PublicAPI.get(path);
            return setProviders(response.data);
        }
        catch (err)
        {
            var errTitle = "Nastala chyba - " + err?.response.status;
            var errMessage = "Nelze načíst seznam providerů";
            if (err == null) errMessage += ", žádná odpověď od serveru, zkontrolujte prosím připojení.";

            NotificationManager.error(errMessage, errTitle, 10000);
            consoleLog("socialAuth form error: " + err);
            return false;
        }
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