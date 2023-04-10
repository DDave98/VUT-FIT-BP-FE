import LoginForm from '../Components/LoginPage/LoginPage-LoginForm';
import { useLocation, useNavigate } from 'react-router-dom';
import { SaveToStorage } from '../Services/StorageService';
import useAuth from '../Hooks/useAuth';
import { accessTokenTag } from '../Constants/storageTag';
import { useState } from 'react';
import MfaForm from '../Components/MFAForm/MFAForm';
import { ConsoleOut, consoleType } from '../Services/DebugService';
import { useCountdownCall } from '../Hooks/useTimeout';
import { NotificationManager } from 'react-notifications';

const LoginPage = () =>
{
    const navigate = useNavigate();
    const location = useLocation();
    const { setAuth } = useAuth();

    const [changeForm, setChangeForm] = useState(false);
    const [mfaType, setMfaType] = useState("");

    const [count, startCountdown, stopCountdown] = useCountdownCall(200, () =>
    {
        setMfaType("");
        setChangeForm(false);
        NotificationManager.info("Čas pro ověření vypršel", "Ověření", 10000);
    });

    /// vrátí login page do původního stavu
    const SetLoginDefault = () =>
    {
        stopCountdown();
        setMfaType("");
        setChangeForm(false);
    }

    // při úspěšném přihlášení -> uloží token či zobrazí MFA form
    const setOnSuccess = (AccessTokenResponse) =>
    {
        // zde pak zobrazit form pro dvoufazové
        ConsoleOut(consoleType.log, "LoginPage", JSON.stringify(AccessTokenResponse));
        stopCountdown();

        // pokud je mfa true -> zobrazit mfa formulář
        if(AccessTokenResponse.mfa == true)
        {
            ConsoleOut(consoleType.log, "LoginPage", "changeForm -> 2FA");
            setMfaType(AccessTokenResponse.type);
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
            SaveToStorage(accessToken, accessTokenTag);
            //SaveToStorage(AccessTokenResponse.refreshToken, refreshTokenTag);
            navigate("/");
            navigate(0);
        }

        else
        {
            // ??
        }
    }

    const loginFormElement = <LoginForm setOnSuccess={setOnSuccess} formName={"Přihlášení"} />;
    const mfaFormElement = <MfaForm setOnSuccess={setOnSuccess} countdown={count} mfaType={mfaType} onCancel={SetLoginDefault}/>;

    return (
        <>
            {
                changeForm? mfaFormElement : loginFormElement
            }
        </>
    )
};

export default LoginPage;