import {
    useState,
    PropTypes,
    Link,
    config,
    FormPageLayout,
    registerPath,
    SendButton,
    Recaptcha,
    recoveryPath,
    apiPath
} from "./LoginPage-imports";

import "../../Styles/LoginForm.css";
import BasicAuth from './LoginPage-BasicAuth';
import SocialAuth from './LoginPage-SocialAuth';
import { usePublicApi } from "../../Hooks/usePublicAPI";
import { NotificationManager } from "react-notifications";

const LoginForm = (
{
    setOnSuccess,
}) =>
{
    const [loadMode, setLoadMode] = useState(false);       // proces ověřovaní dat
    const [capchaValid, setCapchaValid] = useState(false); // recaptcha check
    const [{basicValid, email, password}, setBasicForm] = useState({basicValid: false, email: "", password: ""});   // recaptcha check
    const [SendRequest, GenerateParams, GenerateError] = usePublicApi();

    const handlSubmit = async () =>
    {
        if (!(basicValid && capchaValid)) 
            NotificationManager.error("Nevalidní vstup");

        setLoadMode(true);
        const data = { Password: password, Login: email };
        const errorMessage = "některý z uvedených parametrů je neplatný";
        const errorTitle = "Nastala chyba při přihlášení";
        const error = GenerateError(errorMessage, errorTitle);
        const params = GenerateParams(apiPath.loginBasic, data);
        const response = await SendRequest(params, error);
        setLoadMode(false);
        if (response != undefined) setOnSuccess(response.data);
    };

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