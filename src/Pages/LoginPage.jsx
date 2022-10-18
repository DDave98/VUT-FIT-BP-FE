import LoginForm from '../Components/LoginForm';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { SaveToStorage } from '../Services/StorageService';
import useAuth from '../Hooks/useAuth';
import { accessTokenTag } from '../Constants/storageTag';

const LoginPage = () =>
{
    const navigate = useNavigate();
    const location = useLocation();
    const { setAuth } = useAuth();
    const search = useLocation().search;

    const app = new URLSearchParams(search).get('app');
    const hook = new URLSearchParams(search).get('hook');
    const url = window.location.origin;

    const setOnSuccess = (token) =>
    {
        // zde pak zobrazit form pro dvoufazové

        if (hook != null)
        {
            window.location.replace(hook + "?token=" + token);
        }
        else
        {
            const from = location.state?.from?.pathname || "/";
            setAuth({token});   // save token to page instance memory
            SaveToStorage(token, accessTokenTag);
            navigate(from, {replace: true});
        }

    }

    useEffect(() => 
    {
        // zjistit zda je ?hook & ?app v url
    }, [])

    return (
        <>
            <LoginForm
                setOnSuccess={setOnSuccess}
                formName={"Přihlášení" + (app ? " - " + app : "")}
                Hook={hook ?? url}
            />
        </>
    )
};

export default LoginPage;