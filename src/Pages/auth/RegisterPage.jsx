import { useState } from 'react';
import RegistrationForm from '../../Components/RegistrationForm';
import { confirmPath } from '../../Constants/pagesPath';
import { Navigate } from 'react-router-dom';
import {NotificationContainer, NotificationManager} from 'react-notifications';

const RegistrationPage = () =>
{
    const [registrationSuccess, setRegistrationSuccess] = useState(false);

    const ShowError = (message, title) =>
    {
        NotificationManager.error(message, title, 10000);
    }

    return <>
        {
            registrationSuccess ?
                <Navigate to={confirmPath}/> :
                <RegistrationForm
                    setOnSuccess={setRegistrationSuccess}
                    setOnError={ShowError}
                />
        }
    </>
};

export default RegistrationPage;