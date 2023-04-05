/**
 * tato koponenta představuje ikonu
 */

import useOAuth2 from "../../Hooks/useOAuth2";
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
        // ověření kódu
        try
        {
            alert("aaa");
            const path = apiPath.checkProviderCode + name;
            var response = await PublicAPI.post( path, JSON.stringify(code));
            const token = response.data;
            // onSuccess(token);
            alert("Server token: " + token);
        }
        catch (err)
        {
            handlError(err);
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

    const redirectURI = "http://localhost:3000/OAuth/Callback";
    const [authorize, loading] = useOAuth2(
    {
        authEndpoint: api, 
        tokenEndpoint: apiPath.checkProviderCode + name,
        clientId: cid, 
        redirectUri: redirectURI, 
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