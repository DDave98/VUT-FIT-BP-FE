import {
    userRef,
    useState,
    PropTypes,
    Link,
    NotificationManager,
    PublicAPI,
    useRef,
    config,
    FormPageLayout,
    registerPath,
    SendButton,
    Recaptcha,
    recoveryPath,
    useEffect
} from "./LoginPage-imports";

import "../../Styles/LoginForm.css";
import BasicAuth from './LoginPage-BasicAuth';
import SocialAuth from './LoginPage-SocialAuth';
import { consoleLog } from "../../Services/DebugService";

const LoginForm = (
{
    setOnSuccess,
    formName,
    Hook
}) =>
{
    const userRef = useRef();
    const [loadMode, setLoadMode] = useState(false);    // ověřovaní dat
    const [reValid, setReValid] = useState(false);      // recaptcha check
    const [email, setEmail] = useState('');             // zadaný email
    const [password, setPassword] = useState('');       // zadané heslo
    const [isValid, setIsValid] = useState(false);      // kontrola polí


    const handlSubmit = async () =>
    {

        if (!isValid)   // pokud vstupní pole jsou nevalidní
        {
            NotificationManager.error("Nevalidní vstup");
            return;
        }

        // proces zpracování
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
            consoleLog("login form error: " + err);
        }

        setLoadMode(false);
    }

    const buttonText = "Přihlásit se";
    const RegisterText = "Nemáte účet?";
    const RegisterLinkText = "Registrujte se";
    
    return <>
        <FormPageLayout name={formName} handlSubmit={handlSubmit}>

            <BasicAuth 
                onEmailChange={(value) => setEmail(value)}
                onPasswordChange={(value) => setPassword(value)}
                setIsValid={(value) => setIsValid(value)}
                disabled={loadMode}
            />

            <Link to={recoveryPath} className='lostPasswod'>
                Zapomněl jste heslo?
            </Link>

            <Recaptcha
                siteKey={config.RecaptchaKey}
                isValid={setReValid}
                visible={isValid}
            />

            <SendButton 
                disabled={!isValid || !reValid}
                text={buttonText}
                loadMode={loadMode}
            />

            <SocialAuth
                disabled={loadMode}
                onSuccess={setOnSuccess}
                onLoad={setLoadMode}
            />

            <p className='LoginRegistration'>
                {RegisterText}
                <Link to={registerPath}>
                    {RegisterLinkText}
                </Link>
            </p>

        </FormPageLayout>
    </>
};

LoginForm.propTypes = 
{
    setOnSuccess: PropTypes.func,
}

export default LoginForm;