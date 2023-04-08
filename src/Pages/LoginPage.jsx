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
 
    // při úspěšném přihlášení -> uloží token či zobrazí MFA form
    const setOnSuccess = (token) =>
    {
        // zde pak zobrazit form pro dvoufazové
        console.log("LoginPage | " + token);
        if (token)
        {
            //const from = location.state?.from?.pathname || "/";
            setAuth({token});   // save token to page instance memory
            SaveToStorage(token, accessTokenTag);
            navigate("/");
            navigate(0);
        }
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