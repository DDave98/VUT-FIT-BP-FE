import ReCAPTCHA from "react-google-recaptcha";
 

const Recaptcha = () =>
{

    const onChange = (value) =>
    {
        console.log("Captcha value:", value);
    }

    return <>
        <ReCAPTCHA
            sitekey="Your client site key"
            onChange={onChange}
        />  
    </>
}

export default Recaptcha;