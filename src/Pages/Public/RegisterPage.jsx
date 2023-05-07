import { useState } from 'react';
import { confirmPath } from '../../Constants/pagesPath';
import { Navigate } from 'react-router-dom';

// components
import RegistrationForm from '../../Components/RegistrationPage/RegistrationForm';

const RegistrationPage = () =>
{
    const [registrationSuccess, setRegistrationSuccess] = useState(false);

    const registrationComponent = <RegistrationForm setOnSuccess={setRegistrationSuccess} />
    const confirmationComponent = <Navigate to={confirmPath}/>;

    return <>
        {
            registrationSuccess ? confirmationComponent : registrationComponent
        }
    </>
};

export default RegistrationPage;