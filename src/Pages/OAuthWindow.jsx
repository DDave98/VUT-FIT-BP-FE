import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Loader from '../Components/Loader';
import { authCodeTag } from '../Constants/storageTag';
import { consoleLog } from '../Services/DebugService';
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
        const params =  new URLSearchParams(search);
        consoleLog("OAuthPopup - params: " + params);
        const code =  params.get('code');
        consoleLog("OAuthPopup - code: " + code);
        SaveToStorage(code, authCodeTag);
        //alert("OAuthCallback");
    }, []);

    return (
        <div className='OAthCallBackPage'>
            <h1>Zpracování Přihlášení</h1>
            <Loader />
        </div>
    );
}