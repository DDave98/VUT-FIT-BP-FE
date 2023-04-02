import LoginForm from '../Components/LoginPage/LoginPage-LoginForm';
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

    const code = new URLSearchParams(search).get('code');
    const url = window.location.origin;

    const setOnSuccess = (token) =>
    {
        // zde pak zobrazit form pro dvoufazové
        const from = location.state?.from?.pathname || "/";
        setAuth({token});   // save token to page instance memory
        SaveToStorage(token, accessTokenTag);
        navigate(from, {replace: true});
    }

    useEffect(() => 
    {
        // zjistit zda je ?hook & ?app v url
    }, [])

    return (
        <>
            <LoginForm
                setOnSuccess={setOnSuccess}
                formName={"Přihlášení"}
            />
        </>
    )
};

export default LoginPage;