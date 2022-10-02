import { useRef, useState, useEffect } from 'react';
import { homePath } from "../../Constants/pagesPath";
import { Redirect } from 'react-router-dom';
import LoginForm from '../../Components/LoginForm';

const LoginPage = () =>
{
    const errRef = useRef();

    const [loginSuccess, setLoginSuccess] = useState(false);
    const [loginErrorMsg, setLoginErrorMsg] = useState('');

    useEffect(() =>
    {
        errRef.current.focus();
    }, [loginErrorMsg]);

    return <>
        {
            loginSuccess ?
                <Redirect to={homePath}/> :
                <LoginForm setOnError={setLoginErrorMsg} setOnSuccess={setLoginSuccess} />
        }
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