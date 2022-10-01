import { useRef, useState, useEffect } from 'react';
import EmailConfirmForm from '../../Components/EmailConfirmForm';
import RegistrationForm from '../../Components/RegistrationForm';
import { confirmPath } from '../../Constants/pagesPath';
import { Redirect } from 'react-router-dom';

const RegistrationPage = () =>
{
    const errRef = useRef();

    const [registrationSuccess, setRegistrationSuccess] = useState(false);
    const [registrationErrorMsg, setRegistrationErrorMsg] = useState('');

    const [confirmSuccess, setConfirmSuccess] = useState(false);
    const [confirmErrorMsg, setConfirmErrorMsg] = useState('');

    return <>
        {
            registrationSuccess ?
                <Redirect to={confirmPath}/> :
                <RegistrationForm setOnSuccess={setRegistrationSuccess} setOnError={setRegistrationErrorMsg} />
        }
        <p 
            ref={errRef}
            className={registrationErrorMsg ? "errmsg" : "hidden"}
            aria-live="assertive"
        >
            {registrationErrorMsg}
        </p>
        <p 
            ref={errRef}
            className={confirmErrorMsg ? "errmsg" : "hidden"}
            aria-live="assertive"
        >
            {confirmErrorMsg}
        </p>
    </>
};

export default RegistrationPage;