/**
 * tato koponenta představuje ikonu
 */
import useOAuth2 from "../../Hooks/useOAuth2";
import { usePublicApi } from "../../Hooks/usePublicAPI";
import { ConsoleOut, consoleType } from "../../Services/DebugService";
import "../../Styles/SocialIcon.css";

import {
    PropTypes,
    NotificationManager,
    apiPath,
} from "./LoginPage-imports";

const SocialIcon = (
{
    src, name, cid, api, scope,
    disabled = false,
    setLoadMode, onSuccess
}) =>
{
    const [SendRequest, GenerateParams, GenerateError] = usePublicApi();
    const [authorize, loading, CleanWindow] = useOAuth2(
    {
        authEndpoint: api, 
        tokenEndpoint: apiPath.checkProviderCode + name,
        clientId: cid,
        scope: scope,
    });

    // v případě úspěšného přihlášení
    const CheckCode = async (code) => // předělat hook tak, aby vracel hodnotu a nevolal další metodu
    {
        const token = JSON.stringify(code);
        const errorMessage = "Přihlášení se nezdařilo";
        const errorHeader = "Ověření OAuth SSO";
        const urlParams = [name];
        const error = GenerateError(errorMessage, errorHeader);
        const params = GenerateParams(apiPath.loginSSO, token, urlParams);
        const response = await SendRequest(params, error);
        return response;
    }

    // zavře okno a vypne stav načítání
    const CleanAfterAuthorize = () =>
    {
        CleanWindow();
        setLoadMode(false);
    }

    // start: ověření uživatele
    const handleAuthorize = async () =>
    {
        setLoadMode(true);
        const authcode = await authorize();
        if (authcode == undefined)
        { // kontrola získání ověřovacího kódu
            ConsoleOut(consoleType.error, "SocialIcon", "nelze načíst ověřovací kód: " + name);
            NotificationManager.error("Chyba při získání ověřovacího kódu", "Ověření " + name, 10000);
            CleanAfterAuthorize();
            return null;
        } 

        const response = await CheckCode(authcode);
        CleanAfterAuthorize();
        if(response != undefined) onSuccess(response.data);
    };

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