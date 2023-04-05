// General
import { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import FormPageLayout from './FormPageLayout';
import SendButton from './SendButton';
import config from "../Constants/config.json";
import { PublicAPI } from '../Services/AjaxService';
import { FormPwdInputs } from './FormPwdInputs';
import { NotificationManager } from 'react-notifications';
import { consoleLog } from '../Services/DebugService';

const NewPasswordForm = ({setOnSuccess, code}) =>
{

    const userRef = useRef();

    const [password, setPassword] = useState('');
    const [validPassword, setValidPassword] = useState(false);
    const [loadMode, setLoadMode] = useState(false);

    const handlSubmit = async () =>
    {
        setLoadMode(true);

        if (!validPassword) return;

        const recoveryPath = config.path.recovery + "/" + code;
        const data = {
            newPassword: password
        };

        try
        {
            await PublicAPI.put(recoveryPath, data);
            setOnSuccess(true);
        }
        catch (err)
        {
            var errTitle = "Nastala chyba při zpracování";
            var errMessage = "...";
            if (err == null) errMessage = "žádná odpověď od serveru, zkontrolujte prosím připojení.";
            else if (err.response?.status == 400) errMessage = "Nevalidní kód";
            else errMessage = "Operace se nezdařila";
            consoleLog("Recovery form error: " + err);
            NotificationManager.error(errMessage, errTitle, 10000);
        }

        setLoadMode(false);
    }

    return (
        <FormPageLayout name="Změna Hesla" handlSubmit={handlSubmit}>
            <FormPwdInputs
                placeholder1='zadejte nové heslo'
                placeholder2='zadejte heslo znovu'
                htmlFor='recoveryFormPwd'
                input1Name='Nové Heslo:'
                input2Name='Potvrdit Heslo:'
                userRef={userRef}
                onChangeValue={(value) => setPassword(value)}
                getValidValue={(isValid) => setValidPassword(isValid)}
            />
            <SendButton 
                disabled={!validPassword}
                text="Odeslat"
                loadMode={loadMode}
            />
        </FormPageLayout>
    );
}

NewPasswordForm.propTypes = 
{
    setOnSuccess: PropTypes.func.isRequired,
}

export default NewPasswordForm;