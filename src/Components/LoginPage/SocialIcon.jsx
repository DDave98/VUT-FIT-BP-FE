/**
 * tato koponenta představuje ikonu
 */
import useOAuth2 from "../../Hooks/useOAuth2";
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
    const SSOAuthHook = useSSOAuthSubmit();

    // v případě úspěšného přihlášení
    const CheckCode = async (code) =>
    {
        const token = await SSOAuthHook(code, name);
        onSuccess(token);
    }

    // v případě neúspěšného příhlášení
    const handlError = (err) =>
    {
        NotificationManager.error(err, "Chyba při přihlašování", 10000);
    }

    // ověření uživatele
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