import {
    PropTypes,
    useState,
    useEffect,
    PublicAPI,
    apiPath,
    NotificationManager
} from "./LoginPage-imports";
import SocialIcon from "./SocialIcon";

const SocialAuth = (
{
    disable = false,
}) =>
{

    const [providers, setProviders] = useState([]);    // seznam providerů

    const onLoad = async () =>
    {
        try
        {
            const path = apiPath.allProviders;
            const response = await PublicAPI.get(path);
            return setProviders(response.data);
        }
        catch (err)
        {
            var errTitle = "Nastala chyba - " + err.response.status;
            var errMessage = "Nelze načíst seznam providerů";
            if (err == null) errMessage += ", žádná odpověď od serveru, zkontrolujte prosím připojení.";

            NotificationManager.error(errMessage, errTitle, 10000);
            console.log("socialAuth form error: ", err);
            return false;
        }
    }

    useEffect(() => 
    {
        // načtení providerů
        onLoad();
    }, []);

    const imgPre = 'data:image/png;base64,';

    return (
    <>
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