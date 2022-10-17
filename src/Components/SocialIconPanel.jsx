import { NotificationManager } from 'react-notifications';
import { PublicAPI } from '../Services/AjaxService';
import { useState } from 'react';
import { externalLoginPath } from '../Constants/externalLoginPath';
import PropTypes from 'prop-types';

const SocialIconPanel = ({disabled}) =>
{
    const socialIconStyle = 'h-10 hover:border-sky-500 hover:ring-2 hover:border-transparent';
    const [wait, setWait] = useState(false);

    const LogIn = async (e) =>
    {
        console.log(e.target.name, wait);

        if (wait || disabled) return;
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
            <div id='loginSocialIcons' className="flex items-baseline justify-evenly">
                {
                    externalLoginPath.map(({url, api}) => (
                        <img
                            src={url}
                            key={api}
                            name={api}
                            className={socialIconStyle}
                            onClick={LogIn}
                        />
                    ))
                }
            </div>
        </>
    )
}

SocialIconPanel.propTypes = 
{
    disabled: PropTypes.bool,
}

export default SocialIconPanel;