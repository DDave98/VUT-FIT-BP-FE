
// General
import { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// Services
import { PublicAPI } from '../Services/AjaxService';
import { SaveToStorage } from '../Services/StorageService';

// Components
import BreakLine from './BrakLine/BreakLine';
import Recaptcha from './ReCAPTCHA/ReCAPTCHA';
import FormPageLayout from './FormPageLayout';
import { FormInput } from './FormInput';

// Constants
import { registerPath } from "../Constants/pagesPath";
import config from "../Constants/config.json";
import { passwordRegex, emailRegex } from '../Constants/regex';
import { accessTokenTag } from '../Constants/storageTag';

const LoginForm = ({setOnSuccess, setOnError}) =>
{

    const userRef = useRef();

    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);

    const [password, setPassword] = useState('');
    const [validPassword, setValidPassword] = useState(false);

    const handlSubmit = async () => {

        if (!validPassword || !validEmail)
        {
            setOnError("Nevalidní vstup");
            return;
        }

        const loginPath = config.path.auth.authenticate;
        const loginData = {
            Password: password,
            Login: email
        };
        
        try
        {
            const response = await PublicAPI.post(
                loginPath,
                JSON.stringify(loginData)
            );
            console.log("response: ", response.data, response.status);
            SaveToStorage(response.data, accessTokenTag);
            setOnSuccess(response.data);
        }
        catch (err)
        {
            if (!err) setOnError("žádná odpověď od serveru, zkontrolujte prosím připojení.");
            else if (err.response?.status === 400) setOnError("některý z uvedených parametrů je neplatný");
            else setOnError("Přihlášení se nezdařila");
            console.log("login form error: ", err.message);
        }
    }

    const divStyleClass = "flex flex-col items-baseline justify-between mt-2 max-w-lg";
    const lostPasswodStyle = "text-right inline-block w-full text-sm text-gray-500 hover:text-blue-900";
    const submitButtonStyle = "flex items-baseline justify-between mb-6 mt-2";
    const buttonStyleClass = "px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900 w-full disabled:opacity-50 disabled:bg-gray-400";
    const socialIconStyle = 'h-10 hover:border-sky-500 hover:ring-2 hover:border-transparent';

    return <>
        <FormPageLayout name="Přihlášení" handlSubmit={handlSubmit}>
            <FormInput
                inputName="Email:"
                placeholder='zadejte email'
                htmlFor='loginFormName'
                divStyleClass={divStyleClass}
                userRef={userRef}
                regex={emailRegex}
                onChangeValue={(value) => setEmail(value)}
                getValidValue={(isValid) => setValidEmail(isValid)}
            />
            <FormInput
                InputType="password"
                inputName="Heslo:"
                placeholder='zadejte email'
                htmlFor='loginFormPwd'
                divStyleClass={divStyleClass}
                userRef={userRef}
                regex={passwordRegex}
                onChangeValue={(value) => setPassword(value)}
                getValidValue={(isValid) => setValidPassword(isValid)}
            />
            <Link to={""} className={lostPasswodStyle}>Zapomněl jste heslo?</Link>
            <div className={submitButtonStyle}>
                <button
                    className={buttonStyleClass}
                    disabled={!validEmail || !validPassword ? true : false}
                >
                    Přihlásit se
                </button>
            </div>
            <Recaptcha />
            <BreakLine id={"loginBreakLine1"}>nebo</BreakLine>
            <div id='loginSocialIcons' className="flex items-baseline justify-evenly">
                <img src={require ('../Assets/Images/socialIcons/facebook.png')} className={socialIconStyle}/>
                <img src={require ('../Assets/Images/socialIcons/github.png')} className={socialIconStyle}/>
                <img src={require ('../Assets/Images/socialIcons/google.png')} className={socialIconStyle}/>
                <img src={require ('../Assets/Images/socialIcons/instagram.png')} className={socialIconStyle}/>
                <img src={require ('../Assets/Images/socialIcons/linkedin.png')} className={socialIconStyle}/>
                <img src={require ('../Assets/Images/socialIcons/microsoft.png')} className={socialIconStyle}/>
            </div>
            <p className='mt-10'>
                Nemáte účet?
                <Link to={registerPath} className="text-blue-900 ml-2">Registrujte se</Link>
            </p>

        </FormPageLayout>
    </>
};

LoginForm.propTypes = 
{
    setOnSuccess: PropTypes.func.isRequired,
    setOnError: PropTypes.func.isRequired,
}

export default LoginForm;