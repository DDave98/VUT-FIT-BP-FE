import PropTypes from "prop-types";
import { useState, useEffect } from "react";

/// funkce/komponenta, která představuje část stránky profil
/// načte informace o připojených účtech ze serveru
const ProfilProfilCard = ({data, passwordChange, photoChange, photo}) =>
{
    const defPhoto = "https://bootdey.com/img/Content/avatar/avatar7.png";
    return (
        <div className="profile-card">
            <img
                src={photo != null ? photo : defPhoto}
                alt="Admin"
                className="profile-image"
                width="150"
            />
            <div className="profile-card-body">
                <h4>
                    {data.name} {data.surname}
                </h4>
                <p>{data.role}</p>
                <p>počet aplikací: #</p>
                <p>
                    založen: {new Date(data.created).toLocaleDateString()}
                </p>
                <button className="btn-secondary btn" onClick={passwordChange}>změna hesla</button>
                <button className="btn-secondary btn" onClick={photoChange}>nové foto</button>
            </div>
        </div>
    );
};

ProfilProfilCard.propTypes = {
    //isabled: PropTypes.bool,
};

export default ProfilProfilCard;
