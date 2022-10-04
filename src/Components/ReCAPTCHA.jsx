import ReCAPTCHA from "react-google-recaptcha";
import config from "../Constants/config.json";

const Recaptcha = () =>
{
    const onChange = (value) =>
    {
        console.log("Captcha value:", value);
    }

    return <>
        <ReCAPTCHA
            sitekey={config.RecaptchaKey}
            onChange={onChange}
        />  
    </>
}

export default Recaptcha;