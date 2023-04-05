import FormPageLayout from './FormPageLayout';
import { FormInput } from './FormInput';
import { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { guidRegex } from '../Constants/regex';
import config from "../Constants/config.json";
import { PublicAPI } from '../Services/AjaxService';
import SendButton from './SendButton';
import { NotificationManager } from 'react-notifications';
import "../Styles/EmailConfirmForm.css";
import { consoleLog } from '../Services/DebugService';

const EmailConfirmForm = ({setOnSuccess, code}) =>
{
    const userRef = useRef();

    const [confirmCode, setConfirmCode] = useState(code);
    const [validConfirmCode, setValidConfirmCode] = useState(false);
    const [loadMode, setLoadMode] = useState(false);

    const handlSubmit = async () =>
    {
        setLoadMode(true);
        try
        {
            const path = config.path.confirmEmail + "?code=" + confirmCode;
            await PublicAPI.get(path);
            setLoadMode(false);
            setOnSuccess(true);
        }
        catch (err)
        {
            const message = "";
            const title = "";

            if (err == null) message = "žádná odpověď od serveru, zkontrolujte prosím připojení.";
            else if (err.response?.status == 400) message = "Nevalidní kód";
            else message = "Potvrzení se nezdařilo";

            NotificationManager.error(message, title, 10000);
            consoleLog("login form error: " + err);
        }
        setLoadMode(false);
    }

    return <>
        <FormPageLayout name='Potvrzení Emailu' handlSubmit={handlSubmit}>
            <h4 className='EmailConfirmFormHeader'>Uživatel byl zaregistrován</h4>
            <p className='EmailConfirmFormText'>
                Na uvedenou e-mailuvou adresu byl zaslán potvrzovací kód.
                Klikněte na odkaz v e-mailu nebo napiště kód v e-mailu. <br />
                Po potvrzení bude účet aktivní, jinak do pár minut bude registrace zrušena.
            </p>
            <FormInput
                inputName={'Potvrzovací kód:'}
                placeholder={'např: 8a10247a-cad4-476a-af29-481f26fd0d0b'}
                htmlFor='registrationFormName'
                userRef={userRef}
                onChangeValue={(value) => setConfirmCode(value)}
                getValidValue={(isValid) => setValidConfirmCode(isValid)}
                regex={guidRegex}
                inputValue={code}
            />
            <SendButton
                disabled={!validConfirmCode}
                text="potvrdit"
                loadMode={loadMode}
            />
        </FormPageLayout>
    </>
};

EmailConfirmForm.propTypes = 
{
    setOnSuccess: PropTypes.func.isRequired,
    code: PropTypes.string
}

export default EmailConfirmForm;