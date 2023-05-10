import { 
    useState, 
    useEffect,
    apiPath,
} from "./Profile-Import";

import "../../Styles/ProfilePageStyles/Profile-SocialCard.css";
import ProfilSocialCardAccout from "./Profil-SocialCard-Account";
import { usePublicApi } from "../../Hooks/usePublicAPI";
import { GetIcoByName } from "../../Services/GeneralFunctions";
import DetailWindowCard from "../DetailLayout/DetailWindowCard";
import { StackItem, StackOfItems } from "../Elements/StackItems/StackItems";
import SocialProfileCheckBox from "../Elements/SocialProfileStatus/SocialProfileCheckBox";

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

    const GenerateChaceboxes = (prov) =>
    {
        return Object.keys(prov).length == 0 ? <></> : 
        prov.map((obj, num) => (
            <StackItem key={num}>
                <ProfilSocialCardAccout 
                    key={num}
                    data={obj}
                    onRemoveLink={toggleAccount}
                    onAddLink={null}
                >
                    {GetIcoByName(obj.providerName)}
                    {obj.providerName}
                </ProfilSocialCardAccout>
            </StackItem>
        ));
    }

    useEffect(() => 
    {
        loadSocialAccount();
    }, []);

    return (
        <>
        <div className="SocialPart">
            <DetailWindowCard>
                <StackOfItems>
                    {GenerateChaceboxes(providers)}
                </StackOfItems>
            </DetailWindowCard>
            {/*<ul>
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
            </ul>*/}
        </div>
        </>
        
    );
};

ProfilSocialCard.propTypes = {
    //isabled: PropTypes.bool,
};

export default ProfilSocialCard;
