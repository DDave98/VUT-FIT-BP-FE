import {accessTokenTag, refreshTokenTag} from '../Constants/storageTag';
import { DeleteFromStorage } from './StorageService';
import {loginPath} from "../Constants/pagesPath";

export function Logout()
{
    DeleteFromStorage(accessTokenTag);   // delete token
    DeleteFromStorage(refreshTokenTag);  // delete token
    window.location.href = loginPath;   // redirect home
}