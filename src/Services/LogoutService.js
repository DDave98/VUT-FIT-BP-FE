// General
import { useLocation, Navigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from './AuthProviderService';

// Services
import { DeleteFromStorage } from './StorageService';

// Constants
import {accessTokenTag} from '../Constants/storageTag';
import {loginPath} from "../Constants/pagesPath";


export function Logout()
{
    //const { setAuth } = useContext(AuthContext);
    const location = useLocation();
    
    //setAuth({});                         // delete access token from memory
    DeleteFromStorage(accessTokenTag);   // delete access token from local storage
    return <Navigate to={loginPath} state={{from: location}} replace />
}