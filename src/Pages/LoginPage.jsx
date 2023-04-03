import LoginForm from '../Components/LoginPage/LoginPage-LoginForm';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { SaveToStorage } from '../Services/StorageService';
import useAuth from '../Hooks/useAuth';
import { accessTokenTag } from '../Constants/storageTag';
import ProcessCode from '../Components/LoginPage/LoginPage-ProcessCode';

const LoginPage = () =>
{
    const [component, setComponent] = useState(<></>);
    const navigate = useNavigate();
    const location = useLocation();

    const { setAuth } = useAuth();

    const url = window.location.origin;

    const setOnSuccess = (token) =>
    {
        // zde pak zobrazit form pro dvoufazové
        const from = location.state?.from?.pathname || "/";
        setAuth({token});   // save token to page instance memory
        SaveToStorage(token, accessTokenTag);
        navigate(from, {replace: true});
    }

    const getUrlCode = () =>
    {
        const search = location.search;
        return new URLSearchParams(search).get('code');
    }

    const checkOAuthCode = () =>
    {
        const code = getUrlCode();
        const isCode = !(code === "") && code != null
        if (isCode) 
        {
            console.log(code, isCode);
            return false;
        }
        return true;
    }

    const ShowForm = () => 
    {
        setComponent(
            <LoginForm
                setOnSuccess={setOnSuccess}
                formName={"Přihlášení"}
            />
        );
    }

    const ShowCheckCode = () =>
    {
        const provider = 
        setComponent(
            <ProcessCode 
                code={getUrlCode()}
                onFail={ShowForm}
                onSucc={() => alert("succ přihlášení")}
            />
        );
    }

    useEffect(() => 
    {
        if (!checkOAuthCode())
            ShowCheckCode();
        else ShowForm();
    }, [])

    return (
        <>
            {component}
        </>
    )
};

export default LoginPage;