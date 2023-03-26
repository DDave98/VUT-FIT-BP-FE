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
import "../../Styles/ProfilePageStyles/ProfilModalPhoto.css"

/// funkce/komponenta, která představuje část stránky profil
/// obsah modal okna, umožňuje nahrání fotky
const ProfilModalPhoto = ({setUserPhoto}) =>
{

    const [photo, setPhoto] = useState(null);

    // potvrzení nahrání na server
    const handleSubmit = async (e) => 
    {
        e.preventDefault();
        const formData = new FormData();
        formData.append("photo", photo);
        const path = apiPath.UploadPhoto;
        console.log("photo up: ", photo);
        try
        {
            var token = GetFromStorage(accessTokenTag);
            const response = await PrivateAPI.put(path, formData,
                {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json',
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            
            console.log("photo upload:", response.data);
            setUserPhoto(() => photo);
        }
        catch (err)
        {
            NotificationManager.error("nelze změnit", "UploadPhoto()", 10000);
            console.log("photo upload error: ", err);
        }
    };

    return (
        <form className="zone" onSubmit={handleSubmit}>
            {
                photo == null 
                ? <ProfilModalPhotoForm setPhoto={setPhoto}/>
                : <ProfilModalPhotoPreview photo={photo} setPhoto={setPhoto}/>
            }
        </form>
    );
};

const ProfilModalPhotoForm = ({setPhoto}) =>
{
    const [dragging, setDragging] = useState(false);

    const CheckSize = (file) =>
    {
        if (file && file.size > 1000000)   // 1MB = 1000000B
            return false;
        return true;
    }

    const handlePhotoChange = (e) => 
    {
        const file = e.target.files[0];
        if(CheckSize(file))
            setPhoto(URL.createObjectURL(file));
    };

    const handleDragEnter = (e) => 
    {
        e.preventDefault();
        setDragging(true);
    };

    const handleDragLeave = (e) => 
    {
        e.preventDefault();
        setDragging(false);
    };

    const handleDrop = (e) => 
    {
        e.preventDefault();
        setDragging(false);
        const file = e.dataTransfer.files[0];
        if(CheckSize(file))
            setPhoto(URL.createObjectURL(file));
    };

    return (
        <div className="zone">
            {/* <script src='https://kit.fontawesome.com/a076d05399.js' crossOrigin='anonymous'></script> */}
            <div id="dropZ"
                onDragEnter={handleDragEnter}
                onDragOver={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
            >
                <i className='fas fa-upload'></i>
                <div>Přetáhněte sem vaši fotku</div>                    
                <span>NEBO</span>
                <div className="selectFile">       
                <label htmlFor="file">vyberte soubor</label>                   
                <input 
                    type="file" 
                    name="files[]" 
                    id="file" 
                    accept="image/*" 
                    onChange={handlePhotoChange}
                />
                    
                </div>
                <p>File size limit : 1 MB</p>
            </div>
        </div>
    );
};

const defaultPhotoPath = "https://bootdey.com/img/Content/avatar/avatar7.png";

const ProfilModalPhotoPreview = ({photo, setPhoto, submitOnClick}) =>
{
    // nepotvrzení
    const RemoveClick = () =>
    {
        setPhoto(null);
    }

    return (
        <div className="photoPreview">
            <img
                src={photo}
                alt="nahráno"
                className="profile-image"
                width="150"
            />
            <div>
                <button className="btn-secondary btn" onClick={RemoveClick}>Zrušit</button>
                <button className="btn-primary btn" onClick={submitOnClick}>Nahrát fotku</button>
            </div>
        </div>
    );
};



export default ProfilModalPhoto;
