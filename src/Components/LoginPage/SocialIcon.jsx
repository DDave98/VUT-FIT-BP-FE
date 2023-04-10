/**
 * tato koponenta představuje ikonu
 */
import useOAuth2 from "../../Hooks/useOAuth2";
import { usePublicApi } from "../../Hooks/usePublicAPI";
import { consoleLog } from "../../Services/DebugService";
import "../../Styles/SocialIcon.css";
import { useSSOAuthSubmit } from "./LoginPage-hooks";

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


    // v případě úspěšného přihlášení
    const CheckCode = async (code) => // předělat hook tak, aby vracel hodnotu a nevolal další metodu
    {
        const token = JSON.stringify(code);
        const errorMessage = "Přihlášení se nezdařilo";
        const errorTitle = "Ověření OAuth SSO";
        const urlParams = [name];
        const error = GenerateError(errorMessage, errorTitle);
        const params = GenerateParams(apiPath.loginSSO, token, urlParams);
        const response = await SendRequest(params, error);
        if(response != undefined) onSuccess(response.data);
    }

    // v případě neúspěšného příhlášení
    const handlError = (err) =>
    {
        NotificationManager.error(err, "Chyba při přihlašování", 10000);
    }

    // start: ověření uživatele
    const handleAuthorize = async () =>
    {
        setLoadMode(true);
        await authorize();
        setLoadMode(false);
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