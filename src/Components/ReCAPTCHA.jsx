import ReCAPTCHA from "react-google-recaptcha";
import PropTypes from 'prop-types';
import config from "../Constants/config.json";
import { PublicAPI } from "../Services/AjaxService";
import { useRef, useEffect } from 'react';
import NotificationManager from "react-notifications/lib/NotificationManager";

const RecaptchaV2 = ({className, siteKey, isValid}) =>
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
            console.log("recaptcha form error: ", err);
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
        console.log("ReCAPTCHA: ", err);
    }

    useEffect(()=>
    {
        recaptchaRef.current.reset();
    }, [])

    const recaptchaStyle = 'flex item-base justify-center mt-5';

    return <>
        <div className={className ?? recaptchaStyle} >
            <ReCAPTCHA
                ref={recaptchaRef}
                sitekey={siteKey}
                onChange={onChange}
                theme="light"
                onErrored={onErrored}
                size="normal"
                badge="bottomright"
                type="image"
            />  
        </div>
    </>
}

RecaptchaV2.propTypes = 
{
    isValid: PropTypes.func,
    siteKey: PropTypes.string.isRequired,
    className: PropTypes.string
}

export default RecaptchaV2;