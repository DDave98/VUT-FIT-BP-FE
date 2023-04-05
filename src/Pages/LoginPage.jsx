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
 
    // při úspěšném přihlášení
    const setOnSuccess = (token) =>
    {
        // zde pak zobrazit form pro dvoufazové
        const from = location.state?.from?.pathname || "/";
        setAuth({token});   // save token to page instance memory
        SaveToStorage(token, accessTokenTag);
        navigate(from, {replace: true});
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