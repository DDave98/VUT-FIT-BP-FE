import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Loader from '../Components/Loader';
import { authCodeTag } from '../Constants/storageTag';
import { SaveToStorage } from '../Services/StorageService';
import "../Styles/OAuth/OAuthCallback.css";

// slouží jako callback pro SSO
// - komponenta zkusí načíst kód z url a uloží
export const OAuthPopup = () =>
{

    const location = useLocation();

    useEffect(() => 
    { 
        const search = location.search;
        const code =  new URLSearchParams(search).get('code');
        SaveToStorage(code, authCodeTag);
    }, []);

    return (
        <div className='OAthCallBackPage'>
            <h1>Zpracování Přihlášení</h1>
            <Loader />
        </div>
    );
}