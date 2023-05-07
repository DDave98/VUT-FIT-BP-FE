import {
    useState,
    PropTypes,
    config,
    FormPageLayout,
    SendButton,
    Recaptcha,
    apiPath
} from "./LoginPage-imports";

import BasicAuth from './LoginPage-BasicAuth';
import SocialAuth from './LoginPage-SocialAuth';
import { usePublicApi } from "../../Hooks/usePublicAPI";
import { NotificationManager } from "react-notifications";
import ForgetPasswordLink from "../FormsElements/ForgetPasswordLink";
import LoginRegistrationLink from "../FormsElements/LoginRegistrationLink";

const LoginForm = (
{
    setOnSuccess = () => {},
    formName = ""
}) =>
{
    const [loadMode, setLoadMode] = useState(false);       // proces ověřovaní dat
    const [capchaValid, setCapchaValid] = useState(false); // recaptcha check
    const [{basicValid, email, password}, setBasicForm] = useState({basicValid: false, email: "", password: ""});
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
    
    return <>
        <FormPageLayout handlSubmit={handlSubmit} name={formName}>

            <BasicAuth setBasicForm={setBasicForm} disabled={loadMode} />
            <ForgetPasswordLink />

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

            <LoginRegistrationLink />

        </FormPageLayout>
    </>
};

LoginForm.propTypes = 
{
    setOnSuccess: PropTypes.func,
}

export default LoginForm;