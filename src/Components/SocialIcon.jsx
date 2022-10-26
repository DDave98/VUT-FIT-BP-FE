/**
 * tato koponenta představuje ikonu
 */

import PropTypes from 'prop-types';
import "../Styles/SocialIcon.css";
import { NotificationManager } from 'react-notifications';
import { PublicAPI } from '../Services/AjaxService';
import { useState } from 'react';

const SocialIcon = (
{
    src,
    className,
    name
}) =>
{

    const [wait, setWait] = useState(false);

    const LogIn = async (e) =>
    {
        console.log(e.target.name, wait);

        if (wait) return;
        else setWait(true);

        try
        {
            var result = await PublicAPI.get(e.target.name)
            NotificationManager.info(result.data);

        }
        catch (err)
        {
            var errTitle = "Nastala chyba při zpracování";
            var errMessage = "...";
            if (err == null) errMessage = "žádná odpověď od serveru, zkontrolujte prosím připojení.";
            else if (err.response?.status == 400) errMessage = "zadaný přihlašovací provider neexistuje";
            else errMessage = "Operace se nezdařila";

            NotificationManager.error(errMessage, errTitle, 10000);
            console.log("socialpanel form error: ", err);
        }

        setWait(false);
    }

    return (
        <>
            <img
                src={src}
                className={className ?? "SocialIcon"}
                onClick={LogIn}
                name={name}
            />        
        </>
    )
}

SocialIcon.propTypes = 
{
    src: PropTypes.string.isRequired,
    className: PropTypes.string,
    name: PropTypes.string,
    onClick: PropTypes.func,
}

export default SocialIcon;