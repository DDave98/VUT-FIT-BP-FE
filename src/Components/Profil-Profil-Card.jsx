import PropTypes from "prop-types";
import { useState, useEffect } from "react";
//import "../Styles/PerPage.css";

/// funkce/komponenta, která představuje část stránky profil
/// načte informace o připojených účtech ze serveru
const ProfilProfilCard = ({data}) =>
{
    return (
        <div className="profile-card">
            <img
                src="https://bootdey.com/img/Content/avatar/avatar7.png"
                alt="Admin"
                className="profile-image"
                width="150"
            />
            <div className="profile-card-body">
                <h4>
                    {data.name} {data.surname}
                </h4>
                <p className="">{data.role}</p>
                <p className="">počet aplikací: #</p>
                <p className="">
                    založen: {new Date(data.created).toLocaleDateString()}
                </p>
                <button className="btn-secondary btn">změna hesla</button>
                <button className="btn-secondary btn">nové foto</button>
            </div>
        </div>
    );
};

ProfilProfilCard.propTypes = {
    //isabled: PropTypes.bool,
};

export default ProfilProfilCard;
