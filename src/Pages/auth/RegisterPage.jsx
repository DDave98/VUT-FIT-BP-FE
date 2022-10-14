import { useState } from 'react';
import RegistrationForm from '../../Components/RegistrationForm';
import { confirmPath } from '../../Constants/pagesPath';
import { Navigate } from 'react-router-dom';
import {NotificationContainer, NotificationManager} from 'react-notifications';

const RegistrationPage = () =>
{
    const [registrationSuccess, setRegistrationSuccess] = useState(false);

    return <>
        {
            registrationSuccess ?
                <Navigate to={confirmPath}/> :
                <RegistrationForm
                    setOnSuccess={setRegistrationSuccess}
                />
        }
    </>
};

export default RegistrationPage;