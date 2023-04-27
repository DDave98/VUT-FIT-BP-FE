import { 
    useState, 
    useEffect,
    apiPath,
} from "./Profile-Import";

import "../../Styles/ProfilePageStyles/Profile-SocialCard.css";
import ProfilSocialCardAccout from "./Profil-SocialCard-Account";
import { usePublicApi } from "../../Hooks/usePublicAPI";
import { GetIcoByName } from "../../Services/GeneralFunctions";

/// funkce/komponenta, která představuje část stránky profil
const ProfilSocialCard = ({toggleAccount}) =>
{
    const [providers, setProviders] = useState([]);    // seznam providerů
    const [SendRequest, GenerateParams, GenerateError] = usePublicApi();

    const loadSocialAccount = async () =>
    {
        // načíst všechny providery + co má uživatel přihlášené
        const errorMessage = "Chyba při načístání providerů";
        const errorTitle = "Nelze načíst providery";
        const error = GenerateError(errorMessage, errorTitle);
        const params = GenerateParams(apiPath.providerPaths.usrProviders);
        const response = await SendRequest(params, error);
        if(response != undefined) setProviders(response.data);
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
