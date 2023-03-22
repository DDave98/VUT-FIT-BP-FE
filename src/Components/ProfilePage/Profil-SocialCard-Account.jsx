import PropTypes from "prop-types";
import { useState, useEffect, Children } from "react";
import "../../Styles/ProfilePageStyles/Profile-SocialCard.css";

/// funkce/komponenta, která představuje část stránky profil
/// načte informace o připojených účtech ze serveru
const ProfilSocialCardAccout = ({onClick, header, children, state}) =>
{
    return (
        <li>
            <h6>
                {children}
                {header}
            </h6>
            {
                state ? <button value={header} className="btn-primary btn" onClick={(e) => onClick(e.target.value)}>Odpojit</button>
                : <button value={header} className="btn-secondary btn" onClick={(e) => onClick(e.target.value)}>Připojit</button>
            }
        </li>
    );
};

ProfilSocialCardAccout.propTypes = {
    //isabled: PropTypes.bool,
};

export default ProfilSocialCardAccout;
