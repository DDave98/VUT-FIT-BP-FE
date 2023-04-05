import ReCAPTCHA from "react-google-recaptcha";
import PropTypes from 'prop-types';
import config from "../Constants/config.json";
import { PublicAPI } from "../Services/AjaxService";
import { useRef, useEffect } from 'react';
import NotificationManager from "react-notifications/lib/NotificationManager";
import "../Styles/Recaptcha.css";
import { consoleLog } from "../Services/DebugService";

const RecaptchaV2 = (
{
    className,
    siteKey, 
    isValid,
    visible = true,
}) =>
{

    const recaptchaRef = useRef();

    const VerifyToken = async (token) =>
    {
        try
        {
            const recaptchaPath = config.path.recaptcha + "?token=" + token;
            const response = await PublicAPI.get(recaptchaPath);
            return response.data;
        }
        catch (err)
        {
            var errTitle = "Nastala chyba při zpracování";
            var errMessage = "...";
            if (err == null) errMessage = "žádná odpověď od serveru, zkontrolujte prosím připojení.";
            else errMessage = "ověření se nezdařilo";

            NotificationManager.error(errMessage, errTitle, 10000);
            consoleLog("recaptcha form error: " + err);
            return false;
        }
    }

    const onChange = (value) =>
    {
        VerifyToken(value).then( (val) =>
        {
            if (!val) recaptchaRef.current.reset();
            isValid(val);   
        });
    }

    const onErrored = (err) =>
    {
        NotificationManager.error("ReCAPTCHA: chyba");
        consoleLog("ReCAPTCHA: " + err);
    }

    useEffect(()=>
    {
        recaptchaRef.current.reset();
    }, [])

    const visibility = visible ? "visible" : "invisible"
    const classText = "Recaptcha " + visibility;
    const type = "image";
    const size = "normal";
    const badge = "bottomright";
    const theme = "light";

    return <>
        <div className={className ?? classText} >
            <ReCAPTCHA
                ref={recaptchaRef}
                sitekey={siteKey ?? ""}
                onChange={onChange}
                theme={theme}
                onErrored={onErrored}
                size={size}
                badge={badge}
                type={type}
            />  
        </div>
    </>
}

RecaptchaV2.propTypes = 
{
    isValid: PropTypes.func,
    siteKey: PropTypes.string,
    className: PropTypes.string
}

export default RecaptchaV2;