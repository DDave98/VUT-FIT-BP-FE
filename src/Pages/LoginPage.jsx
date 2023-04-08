import LoginForm from '../Components/LoginPage/LoginPage-LoginForm';
import { useLocation, useNavigate } from 'react-router-dom';
import { SaveToStorage } from '../Services/StorageService';
import useAuth from '../Hooks/useAuth';
import { accessTokenTag } from '../Constants/storageTag';

const LoginPage = () =>
{
    const navigate = useNavigate();
    const location = useLocation();
    const { setAuth } = useAuth();
 
    const SaveToken = (token) =>
    {
        const from = location.state?.from?.pathname || "/";
        setAuth({token});   // save token to page instance memory
        SaveToStorage(token, accessTokenTag);
        navigate(from, {replace: true});
    }

    // při úspěšném přihlášení -> uloží token či zobrazí MFA form
    const setOnSuccess = (token) =>
    {
        // zde pak zobrazit form pro dvoufazové
        if (token != null) SaveToken(token);
    }

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