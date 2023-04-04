import { 
    useState, 
    useEffect, 
    PropTypes
} from "./Profile-Import";

import "../../Styles/ProfilePageStyles/Profile-SocialCard.css";
import ProfilSocialCardAccout from "./Profil-SocialCard-Account";
import { fbIco, GithubIco, instaIco, twitterIco, webIco } from "../../Constants/icons";

/// funkce/komponenta, která představuje část stránky profil
const ProfilSocialCard = ({toggleAccount}) =>
{
    const [providers, setProviders] = useState([]);    // seznam providerů

    const data = [
        {name: "Website", state:true},
        {name: "Github", state:false},
        {name: "Twitter", state:false},
        {name: "Instagram", state:false},
        {name: "Facebook", state:false},
    ]

    const GetIcoByName = (name) =>
    {
        switch(name)
        {
            case "Github": return GithubIco;
            case "Twitter": return twitterIco;
            case "Instagram": return instaIco;
            case "Facebook": return fbIco;
            default: return webIco;
        }
    }

    const loadSocialAccount = () =>
    {
        // načíst všechny providery + co má uživatel přihlášené
    }

    useEffect(() => 
    {
        loadSocialAccount();
    }, []);

    return (
        <div className="SocialPart card">
            <ul>
                {
                    data.map((accout, num) => (
                        <ProfilSocialCardAccout
                            key={num}
                            header={accout.name}
                            state={accout.state}
                            onClick={toggleAccount}>
                            {GetIcoByName(accout.name)}
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
