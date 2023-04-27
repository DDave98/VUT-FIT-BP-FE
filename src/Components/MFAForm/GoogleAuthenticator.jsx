import { useState } from 'react';
import { apiPath } from "../../Constants/apiPath";
import { NotificationManager } from 'react-notifications';

import { FormInput } from '../FormInput';
import SendButton from '../SendButton';
import { usePublicApi } from '../../Hooks/usePublicAPI';

import "../../Styles/MFAForm/GoogleAuthenticator.css";
import { useCountdownCall } from '../../Hooks/useTimeout';

const GoogleAuthenticator = () =>
{
    const [code, setCode] = useState("");
    const [isValid, setValid] = useState(false);
    const [loadingMode, setLoadingMode] = useState(false);
    const [ManualEntryKey, stManualEntryKey] = useState("");
    const [QrCodeSetupImageUrl, setQrCodeSetupImageUrl] = useState("");
    const [SendRequest, GenerateParams, GenerateError] = usePublicApi();

    const clearCodes = () =>
    {
        stManualEntryKey("");
        setQrCodeSetupImageUrl("");
    }

    const [count, startCountdown, stopCountdown] = useCountdownCall(100, clearCodes);

    // odeslání zadaného kódu na server
    const VerifyCode = async (e) =>
    {
        e.preventDefault();
        setLoadingMode(true);
        const errorMessage = "Nelze ověřit kód";
        const errorTitle = "Google Authenticator";
        const error = GenerateError(errorMessage, errorTitle);
        const body = JSON.stringify(code);
        const params = GenerateParams(apiPath.GAverifi, body);
        const response = await SendRequest(params, error);
        setLoadingMode(false);
        if(response != undefined) 
        {
            NotificationManager.success("úspěšně ověřeno");
            stopCountdown();
            clearCodes();
        }
    }

    // získání kódu ze serveru
    const GetCode = async () =>
    {
        const errorMessage = "Nelze načíst QR kód";
        const errorTitle = "Google Authenticator";
        const error = GenerateError(errorMessage, errorTitle);
        const params = GenerateParams(apiPath.GAgenerate);
        const response = await SendRequest(params, error);
        if(response != undefined) 
        {
            stManualEntryKey(response.data.manualEntryKey)
            setQrCodeSetupImageUrl(response.data.qrCodeSetupImageUrl);
            startCountdown();
        }
    }

    const codeComponent = (
        <div className='GoogleAuthCode'>
                <p className="key">{ManualEntryKey}</p>
                <img src={QrCodeSetupImageUrl} alt="QR kód" />
        </div>
    );

    const buttonComponent = (
        <button className='btn-secondary btn' onClick={GetCode}>
            Vygenerovat kód
        </button>
    );

    const ShowCode = () =>
    {
        if(ManualEntryKey == "")
            return buttonComponent;
        else return codeComponent;
    }

    return (
        <div className="GoogleAuthVerifi">
            <div className="leftSide">
                <p>Pro použití ověřovací aplikace postupujte následovně:</p>
                <ul>
                <li>Stáhněte aplikaci do vašeho mobilního zařízení, které je dostupné pro IOS nebo android.</li>
                <li>Naskenujte QR kód nebo opište klíč do aplikace.</li>
                <div className='GoogleAuthCode'>
                     {ShowCode()}   
                </div>
                <li>Jakmile vložíte klíč nebo naskenujete QR kód, aplikace bude generovat klíče. </li>
                <li>Poté vygenerovaný klíč ve vaší aplikaci opište do kolonky pod nápovědou a potvrďte.</li>
                <li>V nastavení výše zvolte 2FA na Google Authenticator a změnu uložtě.</li>
                <li>V případě změny způsobu ověření nění potřeba kód měnit.</li>
                <li>V případě, že kód nelze ověřit, klikněte na tlačítko vygenerovat nové.</li>
                </ul>
            </div>
            <form className="rightSide" onSubmit={VerifyCode}>
                <FormInput
                    inputName={"Ověření kódu: (zbývá " + count + "s)" }
                    placeholder='zadejte kód z aplikace'
                    htmlFor='GAVerification'
                    userRef={null}
                    regex={null}
                    onChangeValue={setCode}
                    getValidValue={setValid}
                    disabled={loadingMode}
                />
                <SendButton loadMode={loadingMode} text={"Ověřit"} disabled={(code == undefined)} />
            </form>
      </div>
    )
};

export default GoogleAuthenticator;