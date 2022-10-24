import RecoveryForm from "../Components/RecoveryForm";
import {NotificationManager} from 'react-notifications';
import SuccessForm from "../Components/SuccessForm";
import { loginPath } from "../Constants/pagesPath";
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import NewPasswordForm from "../Components/NewPasswordForm";

const RecoveryPage = () =>
{
    const [emailSend, SetEmailSend] = useState(false);
    const [pwdChanged, SetPwdChanged] = useState(false);
    const [code, setCode] = useState('');

    const ShowError = (message, title) =>
    {
        NotificationManager.error(message, title, 10000);
    }

    const search = useLocation().search;

    useEffect(() =>
    {
        const urlCode = new URLSearchParams(search).get('code');
        setCode(urlCode);
    }, []);

    return <>
        {
            code == null ?
            (
                emailSend ? 
                (
                    <SuccessForm 
                        title="Email byl poslán"
                        buttonText="přejít na přihlášení"
                        LinkPath={loginPath}
                    />
                ) :
                (
                    <RecoveryForm
                        setOnError={ShowError}
                        setOnSuccess={SetEmailSend}
                    />
                )     
            ) :
            (
                 !pwdChanged ?
                 (
                    <NewPasswordForm
                        setOnSuccess={SetPwdChanged}
                        code={code}
                    />
                ) :
                (
                    <SuccessForm
                        title="Heslo bylo změněno"
                        buttonText="přejít na přihlášení"
                        LinkPath={loginPath}
                    />
                )
            )
        }
    </>
};

export default RecoveryPage;