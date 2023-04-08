import {
    useState,
    PropTypes,
    Link,
    useRef,
    config,
    FormPageLayout,
    registerPath,
    SendButton,
    Recaptcha,
    recoveryPath,
} from "./LoginPage-imports";

import "../../Styles/LoginForm.css";
import BasicAuth from './LoginPage-BasicAuth';
import SocialAuth from './LoginPage-SocialAuth';
import { consoleLog } from "../../Services/DebugService";
import { useBasicAuthSubmit } from "./LoginPage-hooks";

const LoginForm = (
{
    setOnSuccess,
}) =>
{
    const [loadMode, setLoadMode] = useState(false);       // proces ověřovaní dat
    const [capchaValid, setCapchaValid] = useState(false); // recaptcha check
    const [{basicValid, email, password}, setBasicForm] = useState({basicValid: false, email: "", password: ""});   // recaptcha check

    const BasicAuthHook = useBasicAuthSubmit();
    const handlSubmit = () =>
    {
        const isValid = basicValid && capchaValid;
        BasicAuthHook(isValid, email, password, setOnSuccess, setLoadMode);
    };

    /*
    // při stisku tlačítka
    const handlSubmit = async () =>
    {

        if (!isValid)   // pokud vstupní pole jsou nevalidní
        {
            NotificationManager.error("Nevalidní vstup");
            return;
        }

        // proces zpracování
        setLoadMode(true);

        const loginPath = apiPath.loginBasic.path;
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
    }*/

    const buttonText = "Přihlásit se";
    const RegisterText = "Nemáte účet?";
    const RegisterLinkText = "Registrujte se";
    
    return <>
        <FormPageLayout handlSubmit={handlSubmit}>

            <BasicAuth 
                setBasicForm={setBasicForm}
                disabled={loadMode}
            />

            <Link to={recoveryPath} className='lostPasswod'>
                Zapomněl jste heslo?
            </Link>

            {/* zobrazení pouze pokud je form připravený k odeslání */}
            <Recaptcha
                siteKey={config.RecaptchaKey}
                isValid={setCapchaValid}
                visible={basicValid}
            />

            {/* povolení v případě že recapcha i form je připravený */}
            <SendButton 
                disabled={!basicValid || !capchaValid}
                loadMode={loadMode}
                text={buttonText}
            />

            <SocialAuth
                onSuccess={setOnSuccess}
                disabled={loadMode}
                setLoadMode={setLoadMode}
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