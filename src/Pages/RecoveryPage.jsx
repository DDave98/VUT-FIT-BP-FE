import RecoveryForm from "../Components/RecoveryForm";
import {NotificationContainer, NotificationManager} from 'react-notifications';
import SuccessForm from "../Components/SuccessForm";
import { loginPath } from "../Constants/pagesPath";
import { useState, useEffect } from 'react';

const RecoveryPage = () =>
{
    const [emailSend, SetEmailSend] = useState(false);

    const ShowError = (message, title) =>
    {
        NotificationManager.error(message, title, 10000);
    }

    return <>
        {
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
        }
        
        <NotificationContainer />
    </>
};

export default RecoveryPage;