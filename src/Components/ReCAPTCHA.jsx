import ReCAPTCHA from "react-google-recaptcha";
import PropTypes from 'prop-types';
import { useRef, useEffect } from 'react';
import "../Styles/Recaptcha.css";
import { ConsoleOut, consoleType } from "../Services/DebugService";
import { usePublicApi } from "../Hooks/usePublicAPI";
import { apiPath } from "../Constants/apiPath";

const RecaptchaV2 = (
{
    className,
    siteKey, 
    isValid,
    visible = true,
}) =>
{

    const recaptchaRef = useRef();
    const [SendRequest, GenerateParams, GenerateError] = usePublicApi();

    const VerifyToken = async (token) =>
    {
        const errorMessage = "chyba při ověření na serveru";
        const errorTitle = "Recaptcha";
        const urlParams = [token];
        const error = GenerateError(errorMessage, errorTitle);
        const params = GenerateParams(apiPath.recaptcha, null, urlParams);
        const response = await SendRequest(params, error);
        if(response != undefined) return response.data;
        else return false;
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
        ConsoleOut(consoleType.error, "Recaptcha", err);
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