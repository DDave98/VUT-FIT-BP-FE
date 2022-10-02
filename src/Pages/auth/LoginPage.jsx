import { useRef, useState, useEffect } from 'react';
import { homePath } from "../../Constants/pagesPath";
import { Navigate } from 'react-router-dom';
import LoginForm from '../../Components/LoginForm';

const LoginPage = () =>
{
    const errRef = useRef();
    const [loginErrorMsg, setLoginErrorMsg] = useState('');

    useEffect(() =>
    {
        errRef.current.focus();
    }, [loginErrorMsg]);

    return <>
        <LoginForm setOnError={setLoginErrorMsg} />
        <p 
            ref={errRef}
            className={loginErrorMsg ? "errmsg" : "hidden"}
            aria-live="assertive"
        >
            {loginErrorMsg}
        </p>
    </>
};

export default LoginPage;