import { useState } from 'react';
import { apiPath } from "../../Constants/apiPath";
import { NotificationManager } from 'react-notifications';

import { FormInput } from '../FormInput';
import SendButton from '../SendButton';
import { usePublicApi } from '../../Hooks/usePublicAPI';

import "../../Styles/MFAForm/GoogleAuthenticator.css";
import { useEffect } from 'react';

const GoogleAuthenticator = () =>
{
    const [code, setCode] = useState("");
    const [isValid, setValid] = useState(false);
    const [loadingMode, setLoadingMode] = useState(false);
    const [ManualEntryKey, stManualEntryKey] = useState("");
    const [QrCodeSetupImageUrl, setQrCodeSetupImageUrl] = useState("");
    const [SendRequest, GenerateParams, GenerateError] = usePublicApi();

    // odeslání zadaného kódu na server
    const VerifyCode = async (e) =>
    {
        e.preventDefault();
        setLoadingMode(true);
        const errorMessage = "Nelze ověřit kód";
        const errorTitle = "Google Authenticator";
        const error = GenerateError(errorMessage, errorTitle);
        const params = GenerateParams(apiPath.GAverifi, code);
        const response = await SendRequest(params, error);
        setLoadingMode(false);
        if(response != undefined) NotificationManager.success("úspěšně ověřeno");
    }

    // získání kódu ze serveru
    const GetCode = async () =>
    {
        const errorMessage = "Nelze načíst QR kód";
        const errorTitle = "Google Authenticator";
        const error = GenerateError(errorMessage, errorTitle);
        const params = GenerateParams(apiPath.GAgenerate, code);
        const response = await SendRequest(params, error);
        if(response != undefined) 
        {
            stManualEntryKey(response.data.manualEntryKey)
            setQrCodeSetupImageUrl(response.data.qrCodeSetupImageUrl);
        }
    }

    useEffect(() => 
    {
        GetCode();
    }, []);

    return (
        <div className="GoogleAuthVerifi">
        <div className="leftSide">
            <p>Pro použití ověřovací aplikace postupujte následovně:</p>
            <ul>
            <li>Stáhněte aplikaci do vašeho mobilního zařízení, které je dostupné pro IOS nebo android.</li>
            <li>Naskenujte QR kód nebo opište klíč <p className="key">{ManualEntryKey}</p> do aplikace.
            </li>
            <img src={QrCodeSetupImageUrl} alt="QR kód" />
            <li>Jakmile vložíte klíč nebo naskenujete QR kód, aplikace bude generovat klíče. </li>
            <li>Poté vygenerovaný klíč ve vaší aplikaci opište do kolonky pod nápovědou a potvrďte.</li>
            <li>V nastavení výše zvolte 2FA na Google Authenticator a změnu uložtě.</li>
            <li>V případě změny způsobu ověření nění potřeba kód měnit.</li>
            </ul>
        </div>
        <form className="rightSide" onSubmit={VerifyCode}>
            <FormInput
                inputName="Ověření kódu:"
                placeholder='zadejte kód z aplikace'
                htmlFor='GAVerification'
                userRef={null}
                regex={null}
                onChangeValue={setCode}
                getValidValue={setValid}
                disabled={loadingMode}
            />
            <SendButton loadMode={loadingMode} text={"Ověřit"} disabled={!isValid} />
        </form>
      </div>
    )
};

export default GoogleAuthenticator;