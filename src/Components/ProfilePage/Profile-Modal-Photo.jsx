import { 
    useState,
    apiPath,
} from "./Profile-Import";
import "../../Styles/ProfilePageStyles/ProfilModalPhoto.css"
import { consoleLog } from "../../Services/DebugService";
import { usePublicApi } from "../../Hooks/usePublicAPI";
import NotificationManager from "react-notifications/lib/NotificationManager";

/// funkce/komponenta, která představuje část stránky profil
/// obsah modal okna, umožňuje nahrání fotky
const ProfilModalPhoto = ({CloseModal}) =>
{
    const [SendRequest, GenerateParams, GenerateError] = usePublicApi();
    const [photo, setPhoto] = useState(null);

    // potvrzení nahrání na server
    const handleSubmit = async (e) => 
    {
        e.preventDefault();
        if (!photo) {
            console.error('No photo selected');
            return;
        }
        const headers = {'Content-Type': 'application/x-www-form-urlencoded'}
        const formData = new FormData();
        formData.append('photo', photo);
        const errorMessage = "Chyba při nahrávání";
        const errorTitle = "Nahrávání fotky";
        const error = GenerateError(errorMessage, errorTitle);
        const params = GenerateParams(apiPath.UploadPhoto, formData, null, headers);
        const response = await SendRequest(params, error);
        if(response != undefined) 
        {
            NotificationManager.success("Fotka byla nahrána");
            CloseModal(photo);
        }
    };

    return (
        <form className="zone" onSubmit={handleSubmit}>
            {
                photo == null 
                ? <ProfilModalPhotoForm setPhoto={setPhoto}/>
                : <ProfilModalPhotoPreview photo={URL.createObjectURL(photo)} setPhoto={setPhoto}/>
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

    const SetFile = (file) =>
    {
        //setPhoto(URL.createObjectURL(file));
        setPhoto(file);
    }

    const handlePhotoChange = (e) => 
    {
        console.log(e);
        const file = e.target.files[0];
        if(CheckSize(file)) SetFile(file);
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
        if(CheckSize(file)) SetFile(file);
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
