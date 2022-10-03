
/*
// General
import { Navigate } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from './AuthProviderService';

// Services
import { DeleteFromStorage } from './StorageService';

// Constants
import {accessTokenTag} from '../Constants/storageTag';
import {loginPath} from "../Constants/pagesPath";


const Logout = () =>
{

    const { setAuth } = useContext(AuthContext);
    const navigate = useNavigate();

    //DeleteFromStorage(accessTokenTag);   // delete access token from local storage
    setAuth({});
    navigate('/linkpage');
}

export {Logout};*/