import ReCAPTCHA from "react-google-recaptcha";
import config from "../Constants/config.json";

const Recaptcha = ({className}) =>
{
    const onChange = (value) =>
    {
        console.log("Captcha value:", value);
    }

    const recaptchaStyle = 'flex item-base justify-center mt-5';

    return <>
        <div className={className ?? recaptchaStyle} >
            <ReCAPTCHA
                sitekey={config.RecaptchaKey}
                onChange={onChange}
            />  
        </div>
    </>
}

export default Recaptcha;