import { useState } from "react";
import { NotificationManager } from "react-notifications";
import LoginForm from "../../Components/LoginPage/LoginPage-LoginForm";
import MfaForm from "../../Components/MFAForm/MFAForm";
import { accessTokenTag } from "../../Constants/storageTag";
import useAuth from "../../Hooks/useAuth";
import { useCountdownCall } from "../../Hooks/useTimeout";
import { ConsoleOut, consoleType } from "../../Services/DebugService";
import { SaveToStorage } from "../../Services/StorageService";

const OAuthLoginForm = ({
    onSuccess = () => {}
}) =>
{
    const { setAuth } = useAuth();
    const [changeForm, setChangeForm] = useState(false);
    const [mfaRequest, setMfaType] = useState({});

    const [count, startCountdown, stopCountdown] = useCountdownCall(200, () =>
    {
        setMfaType("");
        setChangeForm(false);
        NotificationManager.info("Čas pro ověření vypršel", "Ověření", 10000);
    });

    const SetLoginDefault = () =>
    {
        stopCountdown();
        setMfaType("");
        setChangeForm(false);
    }

    const setOnSuccess = (AccessTokenResponse) =>
    {
        if(AccessTokenResponse.mfa == true)
        {
            ConsoleOut(consoleType.log, "OAuthLoginView", "changeForm -> 2FA");
            setMfaType(AccessTokenResponse);
            startCountdown();
            setChangeForm(true);
        }

        // pokud je mfa false a accessToken není null -> uložit token a přesměrovat
        else if (AccessTokenResponse.accessToken)
        {
            ConsoleOut(consoleType.log, "LoginPage", "token saved");
            var accessToken = AccessTokenResponse.accessToken;
            //const from = location.state?.from?.pathname || "/";
            setAuth({accessToken});   // save token to page instance memory
            SaveToStorage(accessToken, accessTokenTag);                     // možná jiný tog určený pro OAuth
            onSuccess();
        }
    }

    const loginFormElement = <LoginForm setOnSuccess={setOnSuccess} formName={"Jednorázové přihlášení"} />;
    const mfaFormElement = <MfaForm setOnSuccess={setOnSuccess} countdown={count} mfaRequest={mfaRequest} onCancel={SetLoginDefault}/>;


    return (
        <>
            {
                changeForm? mfaFormElement : loginFormElement
            }
        </>
    );
}

export default OAuthLoginForm;