
// General
import { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Link, useLocation, useNavigate } from 'react-router-dom';

// hook
import useAuth from '../Hooks/useAuth';

// Services
import { PublicAPI } from '../Services/AjaxService';
import { SaveToStorage } from '../Services/StorageService';

// Components
import BreakLine from './BreakLine';
import Recaptcha from './ReCAPTCHA';
import FormPageLayout from './FormPageLayout';
import { FormInput } from './FormInput';

// Constants
import { recoveryPath, registerPath } from "../Constants/pagesPath";
import config from "../Constants/config.json";
import { passwordRegex, emailRegex } from '../Constants/regex';
import { accessTokenTag } from '../Constants/storageTag';

const LoginForm = ({setOnError}) =>
{
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const userRef = useRef();
    const { setAuth } = useAuth();

    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);

    const [password, setPassword] = useState('');
    const [validPassword, setValidPassword] = useState(false);

    const handlSubmit = async () =>
    {

        if (!validPassword || !validEmail)
        {
            setOnError("Nevalidní vstup");
            return;
        }

        const loginPath = config.path.authenticate;
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

            const token = response.data;
            setAuth({token});   // save token to page instance memory
            SaveToStorage(token, accessTokenTag);
            navigate(from, {replace: true});
        }
        catch (err)
        {
            var errTitle = "Nastala chyba při zpracování";
            var errMessage = "...";
            if (err == null) errMessage = "žádná odpověď od serveru, zkontrolujte prosím připojení.";
            else if (err.response?.status == 400) errMessage = "některý z uvedených parametrů je neplatný";
            else errMessage = "Přihlášení se nezdařilo";

            setOnError(errMessage, errTitle);
            console.log("login form error: ", err);
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
                placeholder='zadejte heslo'
                htmlFor='loginFormPwd'
                divStyleClass={divStyleClass}
                userRef={userRef}
                regex={passwordRegex}
                onChangeValue={(value) => setPassword(value)}
                getValidValue={(isValid) => setValidPassword(isValid)}
            />
            <Link to={recoveryPath} className={lostPasswodStyle}>Zapomněl jste heslo?</Link>
            <div className={submitButtonStyle}>
                <button
                    className={buttonStyleClass}
                    disabled={!validEmail || !validPassword ? true : false}
                >
                    Přihlásit se
                </button>
            </div>
            <div className='flex item-base justify-center' >
                <Recaptcha />
            </div>
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
    setOnError: PropTypes.func.isRequired,
}

export default LoginForm;