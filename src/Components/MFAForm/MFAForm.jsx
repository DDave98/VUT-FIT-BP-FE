import { useState } from 'react';
import { usePublicApi } from '../../Hooks/usePublicAPI';
import { FormInput } from '../FormInput';
import FormPageLayout from '../FormPageLayout';
import { apiPath } from '../ProfilePage/Profile-Import';
import SendButton from '../SendButton';

/**
 * komponenta zpracovávající MFA ověření
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
    const [SendRequest, GenerateParams, GenerateError] = usePublicApi();

    // odeslání zadaného kódu na server
    const VerifyCode = async () =>
    {
        setLoad(true);
        const errorMessage = "chybný kód nebo metoda";
        const errorTitle = "2FA ověření";
        const urlParams = [mfaType];
        const error = GenerateError(errorMessage, errorTitle);
        const params = GenerateParams(apiPath.MFACheck, code, urlParams);
        const response = await SendRequest(params, error);
        setLoad(false);
        if(response != undefined) setOnSuccess(response.data);
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