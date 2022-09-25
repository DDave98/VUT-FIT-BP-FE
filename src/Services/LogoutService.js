import {accessTokenTag, refreshTokenTag} from '../Constants/storageTag';
import { DeleteFromStorage } from './StorageService';
import {loginPath} from "../Constants/pagesPath";

export function Logout()
{
    DeleteFromStorage(accessTokenTag);   // delete access token
    DeleteFromStorage(refreshTokenTag);  // delete refresh token
    window.location.href = loginPath;    // redirect home
}