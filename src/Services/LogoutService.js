import {accessTokenTag, refreshTokenTag} from '../Constants/storageTag';
import { DeleteFromStorage } from './StorageService';
import {loginPath} from "../Constants/pagesPath";
import { Navigate } from 'react-router-dom';

export function Logout()
{
    DeleteFromStorage(accessTokenTag);   // delete access token from local storage
    return <Navigate to={loginPath} />
}