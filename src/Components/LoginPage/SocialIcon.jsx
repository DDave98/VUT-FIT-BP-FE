/**
 * tato koponenta představuje ikonu
 */

import useOAuth2 from "../../Hooks/useOAuth2";
import { consoleLog } from "../../Services/DebugService";
import "../../Styles/SocialIcon.css";

import {
    PropTypes,
    NotificationManager,
    apiPath,
    useEffect,
    PublicAPI
} from "./LoginPage-imports";

const SocialIcon = (
{
    src,
    name,
    cid, api, scope,
    onLoad, onSuccess
}) =>
{
    // v případě úspěšného přihlášení
    const CheckCode = async (code) =>
    {
        if (code == null) return;

        // ověření kódu
        try
        {
            const path = apiPath.loginSSO.path + name;
            var response = await PublicAPI.post( path, JSON.stringify(code));
            const token = response.data;
            // onSuccess(token);
            consoleLog("Server token: " + token);
        }
        catch (err)
        {
            const title = "Ověření SSO";
            var message = "";
            if (err == null) message = "žádná odpověď od serveru, zkontrolujte prosím připojení.";
            else if (err.response?.status == 400) message = "nelze zpracovat (400)";
            else message = "Přihlášení se nezdařilo";
            NotificationManager.error(message, title, 10000);
        }
    }

    // v případě neúspěšného příhlášení
    const handlError = (err) =>
    {
        NotificationManager.error(err, "Chyba při přihlašování", 10000);
    }

    // ověření uživatele
    const handleAuthorize = () =>
    {
        authorize();
    };

    const [authorize, loading] = useOAuth2(
    {
        authEndpoint: api, 
        tokenEndpoint: apiPath.checkProviderCode + name,
        clientId: cid,
        scope: scope,
        onError: handlError,
        onSuccess: CheckCode
    });

    useEffect(() => 
    {
        // onLoad(loading);
    }, [loading])

    return (
        <>
            <img
                src={src}
                className={"SocialIcon"}
                onClick={handleAuthorize}
                title={name}
                alt={name}
            />
        </>
    )
}

SocialIcon.propTypes = 
{
    src: PropTypes.string.isRequired,
    name: PropTypes.string,
    onClick: PropTypes.func,
}

export default SocialIcon;