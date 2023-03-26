// General
import { useNavigate } from "react-router-dom";
import { useContext  } from "react";
import AuthContext from '../Services/AuthProviderService';

// Services
import { DeleteFromStorage } from '../Services/StorageService';

// Constants
import {accessTokenTag} from '../Constants/storageTag';
import {loginPath} from "../Constants/pagesPath";


const useLogout = () => 
{
    //const { setAuth } = useContext(AuthContext);
    const navigate = useNavigate();
    const logut = () =>
    {
        //setAuth({});                         // delete access token from memory
        DeleteFromStorage(accessTokenTag);   // delete access token from local storage
        navigate(loginPath);
    }

    return logut;
};

export default useLogout;