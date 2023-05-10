import useOAuth2 from "../../Hooks/useOAuth2";
import { consoleLog } from "../../Services/DebugService";
import {
    PropTypes,
    apiPath,
    PrivateAPI,
    NotificationManager,
    GetFromStorage,
    accessTokenTag,
    useState
  } from "./Profile-Import";

/// funkce/komponenta, která představuje část stránky profil
/// načte informace o připojených účtech ze serveru
const ProfilSocialCardAccout = ({
    onAddLink, 
    onRemoveLink, 
    children,
    data,
}) =>
{

    const {providerApi, providerCid, providerScope, providerName, isConnected } = data;
    const [connected, setConnected] = useState(isConnected);
    
    // const [SendRequest, GenerateParams, GenerateError] = usePublicApi();

    const handlError = (message, header) => 
    {
        NotificationManager.error(message, header, 10000);
    }

    // callback funkce, která posíla naserver autorizační kód k ověření
    const CheckCode = async (code) =>
    {
        try
        {
            const body = JSON.stringify(code);
            const token = GetFromStorage(accessTokenTag);
            const path = apiPath.addUserAccountProvider.path + providerName;
            var response = PrivateAPI.put(path, body,
            {
                headers: { Authorization: `Bearer ${token}` },
            });

            NotificationManager.success('Účet byl úspěšně přidán', 'Přidání Účtu', 10000);
            setConnected(() => true);
        }
        catch (err)
        {
            if (err == null) errMessage += ", žádná odpověď od serveru, zkontrolujte prosím připojení.";
            var errTitle = "Nastala chyba - " + err?.response.status;
            var errMessage = "nelze přilinkovat ůčet"
            NotificationManager.error(errMessage, errTitle, 10000);
        }
    }

    // funkce spustí autentizaci pomoc SSO
    const processAddLink = async () =>
    {
        consoleLog("ProfleSocialCardLink | start processAddLink");
        authorize();
    }

    // odebrání relace mezi uživatelem a účtem u daného providera
    const processRemoveLink = async () =>
    {
        const message = "Opravdu chcete odebrat " + providerName + "?";
        const conf = window.confirm(message);
        if (!conf) return;
        
        try 
        {
            var token = GetFromStorage(accessTokenTag);
            const path = apiPath.delUserAccountProvider.path + providerName;
            const response = await PrivateAPI.delete(path,
            {
                headers: { Authorization: `Bearer ${token}` },
            });

            setConnected(() => false);
            const message = "Účet byl úspěšně odebrán";
            NotificationManager.success(message, "", 10000);
        }
        catch (err)
        {
            var errTitle = "Nastala chyba - " + err?.response.status;
            var errMessage = "nelze odebrat ůčet"
            if (err == null) errMessage = "žádná odpověď od serveru, zkontrolujte prosím připojení.";
            NotificationManager.error(errMessage, errTitle, 10000);
        }
    }

    // hook který zobrazí okno s autorizací u daného providera
    const [authorize, loading] = useOAuth2(
        {
            authEndpoint: providerApi, 
            tokenEndpoint: apiPath.checkProviderCode + providerName,
            clientId: providerCid,
            scope: providerScope,
            onError: handlError,
            onSuccess: CheckCode
    });

    return (
        <div className="SocialProfileCheckBox">
            <h6>
                {children}
            </h6>
            {
                connected ? <button className="btn-primary btn" onClick={processRemoveLink}>Odpojit</button>
                : <button className="btn-secondary btn" onClick={processAddLink}>Připojit</button>
            }
        </div>
    );
};

ProfilSocialCardAccout.propTypes = {
    //isabled: PropTypes.bool,
};

export default ProfilSocialCardAccout;
