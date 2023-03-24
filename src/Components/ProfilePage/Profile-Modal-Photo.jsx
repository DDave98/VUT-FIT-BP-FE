import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import "../../Styles/ProfilePageStyles/ProfilModalPhoto.css"

/// funkce/komponenta, která představuje část stránky profil
const ProfilModalPhoto = () =>
{

    const OnChange = () =>
    {

    }

    return (
        <div className="zone">
            <script src='https://kit.fontawesome.com/a076d05399.js' crossorigin='anonymous'></script>
            <div id="dropZ">
                <i className='fas fa-upload'></i>
                <div>Přetáhněte sem vaši fotku</div>                    
                <span>NEBO</span>
                <div className="selectFile">       
                <label for="file">vyberte soubor</label>                   
                <input type="file" name="files[]" id="file" accept="image/png, image/gif, image/jpeg" />
                </div>
                <p>File size limit : 10 MB</p>
            </div>
        </div>
    );
};

ProfilModalPhoto.propTypes = {
    //isabled: PropTypes.bool,
};

export default ProfilModalPhoto;
