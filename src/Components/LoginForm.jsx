
// General
import { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import NotificationManager from 'react-notifications/lib/NotificationManager';

// Services
import { PublicAPI } from '../Services/AjaxService';


// Components
import BreakLine from './BreakLine';
import Recaptcha from './ReCAPTCHA';
import FormPageLayout from './FormPageLayout';
import { FormInput } from './FormInput';
import SendButton from './SendButton';

// Constants
import { recoveryPath, registerPath } from "../Constants/pagesPath";
import config from "../Constants/config.json";
import { emailRegex, passwordRegex } from '../Constants/regex';
import SocialIconPanel from './SocialIconPanel';

const LoginForm = (
{
    setOnSuccess,
    formName,
    Hook
}) =>
{
    const userRef = useRef();
    const [loadMode, setLoadMode] = useState(false);

    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);

    const [password, setPassword] = useState('');
    const [validPassword, setValidPassword] = useState(false);

    const handlSubmit = async () =>
    {

        if (!validPassword || !validEmail)
        {
            NotificationManager.error("Nevalidní vstup");
            return;
        }

        setLoadMode(true);

        const loginPath = config.path.authenticate;
        const loginData = {
            Password: password,
            Login: email,
            App: Hook
        };
        
        try
        {
            const response = await PublicAPI.post(
                loginPath,
                JSON.stringify(loginData)
            );

            const token = response.data;
            setOnSuccess(token);
        }
        catch (err)
        {
            var errTitle = "Nastala chyba při zpracování";
            var errMessage = "...";
            if (err == null) errMessage = "žádná odpověď od serveru, zkontrolujte prosím připojení.";
            else if (err.response?.status == 400) errMessage = "některý z uvedených parametrů je neplatný";
            else errMessage = "Přihlášení se nezdařilo";

            NotificationManager.error(errMessage, errTitle, 10000);
            console.log("login form error: ", err);
        }

        setLoadMode(false);
    }

    const lostPasswodStyle = "text-right inline-block w-full text-sm text-gray-500 hover:text-blue-900";
    
    return <>
        <FormPageLayout name={formName} handlSubmit={handlSubmit}>
            <FormInput
                inputName="Email:"
                placeholder='zadejte email'
                htmlFor='loginFormName'
                userRef={userRef}
                regex={emailRegex}
                onChangeValue={(value) => setEmail(value)}
                getValidValue={(isValid) => setValidEmail(isValid)}
            />
            <FormInput
                InputType={"password"}
                inputName="Heslo:"
                placeholder='zadejte heslo'
                htmlFor='loginFormPwd'
                userRef={userRef}
                divStyleClass="grow"
                regex={passwordRegex}
                onChangeValue={(value) => setPassword(value)}
                getValidValue={(isValid) => setValidPassword(isValid)}
            />

            <Link to={recoveryPath} className={lostPasswodStyle}>Zapomněl jste heslo?</Link>
            <SendButton 
                disabled={!validEmail || !validPassword}
                text="Přihlásit se"
                loadMode={loadMode}
            />
            <div className='flex item-base justify-center' >
                <Recaptcha />
            </div>
            <BreakLine id={"loginBreakLine1"}>nebo</BreakLine>
            <SocialIconPanel />
            <p className='mt-10'>
                Nemáte účet?
                <Link to={registerPath} className="text-blue-900 ml-2">Registrujte se</Link>
            </p>

        </FormPageLayout>
    </>
};

LoginForm.propTypes = 
{
    setOnSuccess: PropTypes.func,
}

export default LoginForm;