import { useState } from 'react';
import { Link } from 'react-router-dom';
import { loginPath } from '../../Constants/pagesPath';
import { ConsoleOut, consoleType } from '../../Services/DebugService';
import { FormInput } from '../FormInput';
import FormPageLayout from '../FormPageLayout';
import { PublicAPI } from '../LoginPage/LoginPage-imports';
import { apiPath, NotificationManager } from '../ProfilePage/Profile-Import';
import SendButton from '../SendButton';

/**
 * @description komponenta zpracovávající MFA ověření
 * @returns formulář k vícefázovému ověření
 */
const MfaForm = (
    {
        setOnSuccess,
        onCancel,
        countdown,
        mfaType
    }
) =>
{
    const [code, setCode] = useState("");
    const [loadMode, setLoad] = useState(false);
    
    const VerifyCode = async () =>
    {
        try
        {
            setLoad(true);
            const path = apiPath.MFACheck.path + mfaType;
            const response = await PublicAPI.post(path, code);
            ConsoleOut(consoleType.log, "MFAForm", "response: " + JSON.stringify(response.data));
            setOnSuccess(response.data)
        }
        catch (error)
        {
            var errTitle = "2FA ověření";
            var errMessage = "chybný kód nebo metoda"
            if (error == null) errMessage = "žádná odpověď od serveru, zkontrolujte prosím připojení.";
            NotificationManager.error(errMessage, errTitle, 10000);
        }
        finally
        {
            setLoad(false);
        }
    }

    return (
        <>
            <FormPageLayout handlSubmit={VerifyCode} name={"Vícefázové ověření (MFA)"} >
                <FormInput 
                    inputName={"čas do vypršení kódu:" + countdown + " s"}
                    placeholder='zadejte ověřovací kód'
                    htmlFor='mfaCode'
                    onChangeValue={(value) => setCode(value)}
                />
                <SendButton loadMode={loadMode} text={"Potvrdit"} disabled={code == "" || code == undefined} />
                <p className='lostPasswod' onClick={onCancel}>
                    Zrušit
                </p>
            </FormPageLayout>
        </>
    )
};

export default MfaForm;