import RecoveryForm from "../Components/RecoveryForm";
import {NotificationContainer, NotificationManager} from 'react-notifications';
import SuccessForm from "../Components/SuccessForm";
import { loginPath } from "../Constants/pagesPath";
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const RecoveryPage = () =>
{
    const [emailSend, SetEmailSend] = useState(false);
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
            code != null ?
            (
                <SuccessForm
                title="Nice!"
                buttonText={code}
                LinkPath=""
                />
            ) :
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
                    <RecoveryForm setOnError={ShowError} setOnSuccess={SetEmailSend} />
                )
            )
        }
        
        <NotificationContainer />
    </>
};

export default RecoveryPage;