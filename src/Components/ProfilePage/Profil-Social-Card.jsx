import { 
    useState, 
    useEffect, 
    PropTypes,
    NotificationManager,
    apiPath,
    PrivateAPI,
    GetFromStorage,
    accessTokenTag
} from "./Profile-Import";

import "../../Styles/ProfilePageStyles/Profile-SocialCard.css";
import ProfilSocialCardAccout from "./Profil-SocialCard-Account";
import { fbIco, GithubIco, GitlabIcon, GoogleIcon, instaIco, LinkedinIcon, MicrosoftIco, twitterIco, webIco } from "../../Constants/icons";
import { consoleLog } from "../../Services/DebugService";
import useOAuth2 from "../../Hooks/useOAuth2";

// podle názvu vrátí svg ikonu
const GetIcoByName = (name) =>
{
    switch(name)
    {
        case "Github": return GithubIco;
        case "Twitter": return twitterIco;
        case "Instagram": return instaIco;
        case "Facebook": return fbIco;
        case "Google": return GoogleIcon;
        case "Microsoft": return MicrosoftIco;
        case "Linkedin": return LinkedinIcon;
        case "Gitlab": return GitlabIcon;
        default: return webIco;
    }
}

/// funkce/komponenta, která představuje část stránky profil
const ProfilSocialCard = ({toggleAccount}) =>
{
    const [providers, setProviders] = useState([]);    // seznam providerů
    

    const loadSocialAccount = async () =>
    {
        // načíst všechny providery + co má uživatel přihlášené
        try
        {
            var token = GetFromStorage(accessTokenTag);
            const path = apiPath.usrProviders;
            const response = await PrivateAPI.get(path,
            {
                headers: { Authorization: `Bearer ${token}` },
            });
            const data = response.data;
            consoleLog("ProfileSocialCard | providers: " + JSON.stringify(data));
            setProviders(data);
        }
        catch (err)
        {
            if (err == null) errMessage += ", žádná odpověď od serveru, zkontrolujte prosím připojení.";
            var errTitle = "Nastala chyba - " + err.response.status;
            var errMessage = "Nelze načíst seznam providerů";
            

            NotificationManager.error(errMessage, errTitle, 10000);
            consoleLog("ProfileSocialCard | social account get error: " + err);
            return false;
        }
    }

    useEffect(() => 
    {
        loadSocialAccount();
    }, []);

    return (
        <div className="SocialPart card">
            <ul>
                {
                    providers.map((accout, num) => (
                        <ProfilSocialCardAccout
                            key={num}
                            data={accout}
                            onRemoveLink={toggleAccount}
                            onAddLink={null}
                        >
                            {GetIcoByName(accout.providerName)}
                            {accout.providerName}
                        </ProfilSocialCardAccout>
                    ))
                }
            </ul>
        </div>
    );
};

ProfilSocialCard.propTypes = {
    //isabled: PropTypes.bool,
};

export default ProfilSocialCard;
