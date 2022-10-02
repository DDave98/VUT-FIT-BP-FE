import { useRef, useState, useEffect } from 'react';
import RegistrationForm from '../../Components/RegistrationForm';
import { confirmPath } from '../../Constants/pagesPath';
import { Redirect } from 'react-router-dom';

const RegistrationPage = () =>
{
    const errRef = useRef();

    const [registrationSuccess, setRegistrationSuccess] = useState(false);
    const [registrationErrorMsg, setRegistrationErrorMsg] = useState('');

    useEffect(() =>
    {
        errRef.current.focus();
    }, [registrationErrorMsg]);

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
    </>
};

export default RegistrationPage;