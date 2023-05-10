import DetailWindowCard from "../DetailLayout/DetailWindowCard";
import ProfilePhoto from "../Elements/ProfilePhoto/ProfilePhoto";
import { 
    useState, 
    useEffect, 
    PropTypes,
    NotificationManager,
    apiPath,
    accessTokenTag,
    PrivateAPI,
    GetFromStorage
} from "./Profile-Import";

/// funkce/komponenta, která představuje část stránky profil
/// načte informace o připojených účtech ze serveru
const ProfilProfilCard = ({data, passwordChange, photoChange}) =>
{
    const [photo, setPhoto] = useState("https://bootdey.com/img/Content/avatar/avatar7.png");

    function handleImageLoad()
    {
        setPhoto('data:image/png;base64,'+ data.photo);
    }

    // hook pro načtení dat při otevření stránky
    useEffect(() =>
    {
        handleImageLoad()
    }, [data]);
    
    return (
        <div className="Profil-ImgView">
            <DetailWindowCard>
                <ProfilePhoto
                    src={photo}
                    alt="Profile Photo"
                />
                <h4>
                    {data.name} {data.surname}
                </h4>
                <p>{data.role}</p>
                <p>
                    založen: {new Date(data.created).toLocaleDateString()}
                </p>
                <div className="profile-card-body">
                    <button className="btn-secondary btn" onClick={passwordChange}>změna hesla</button>
                    <button className="btn-secondary btn" onClick={photoChange}>nové foto</button>
                </div>
            </DetailWindowCard>
        </div>
    );
};

ProfilProfilCard.propTypes = {
    //isabled: PropTypes.bool,
};

export default ProfilProfilCard;
