// General
import { useLocation, Navigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from './AuthProviderService';

// Services
import { DeleteFromStorage } from './StorageService';

// Constants
import {accessTokenTag} from '../Constants/storageTag';
import {loginPath} from "../Constants/pagesPath";


function Logout () 
{
    //const { setAuth } = useContext(AuthContext);
    //let location = useLocation();
    
    //setAuth({});                         // delete access token from memory
    DeleteFromStorage(accessTokenTag);     // delete access token from local storage
    return <Navigate to={loginPath} replace />
}

export default Logout;