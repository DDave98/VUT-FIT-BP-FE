import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import "../../Styles/ProfilePageStyles/ProfilModalPhoto.css"

/// funkce/komponenta, která představuje část stránky profil
/// obsah modal okna, umožňuje nahrání fotky
const ProfilModalPhoto = () =>
{

    const [photo, setPhoto] = useState(null);

    // potvrzení nahrání na server
    const handleSubmit = (e) => 
    {
        e.preventDefault();
    
        // Send photo to server
        // Use the 'photo' variable to access the photo data
        // e.g. const formData = new FormData();
        //      formData.append('photo', photo);
        //      fetch('/upload-photo', {
        //        method: 'POST',
        //        body: formData
        //      }).then(response => {
        //        // Handle response from server
        //      });
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
            <script src='https://kit.fontawesome.com/a076d05399.js' crossorigin='anonymous'></script>
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
                <label for="file">vyberte soubor</label>                   
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
