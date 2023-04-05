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

const SocialAuth = (
{
    disable = false,
    onSuccess,
    onLoad
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
        // načtení providerů
        LoadProviders();
    }, []);

    const imgPre = 'data:image/png;base64,';
    const BreakLineText = "nebo";

    return (
    <>
        {
            providers.length > 0 ? 
            <BreakLine>{BreakLineText}</BreakLine>
            : <></>
        }

        <div
            disabled = {disable} 
            id = 'loginSocialIcons'
            className = "SocialIconPanel"
        >
            {
                providers.map((prov, key) =>
                (
                    <SocialIcon
                        src={imgPre + prov.ico}
                        name={prov.name}
                        api={prov.api}
                        key={key}
                        cid={prov.clientId}
                        scope={prov.scope}
                        onLoad={onLoad}
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