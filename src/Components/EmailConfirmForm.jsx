import FormPageLayout from './FormPageLayout';
import { FormInput } from './FormInput';
import { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { guidRegex } from '../Constants/regex';
import config from "../Constants/config.json";
import { PublicAPI } from '../Services/AjaxService';
import SendButton from './SendButton';

const EmailConfirmForm = ({setOnSuccess, setOnError, urlConfirmCode}) =>
{
    const userRef = useRef();

    const [confirmCode, setConfirmCode] = useState(urlConfirmCode);
    const [validConfirmCode, setValidConfirmCode] = useState(false);
    const [loadMode, setLoadMode] = useState(false);

    const handlSubmit = async () =>
    {
        setLoadMode(true);
        try
        {
            const path = config.path.confirmEmail + "?code=" + confirmCode;
            await PublicAPI.get(path);
            setOnSuccess(true);
        }
        catch (err)
        {
             if (err == null) setOnError("žádná odpověď od serveru, zkontrolujte prosím připojení.", "Nastala chyba při zpracování");
            else if (err.response?.status == 400) setOnError("Nevalidní kód", "");
            else setOnError("Potvrzení se nezdařilo", "Nastala chyba při zpracování");
            console.log("login form error: ", err);
        }
        setLoadMode(false);
    }

    return <>
        <FormPageLayout name='Potvrzení Emailu' handlSubmit={handlSubmit}>
            <h4 className='text-1xl font-bold mb-2'>Uživatel byl zaregistrován</h4>
            <p className='mb-8 italic'>
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
                inputValue={urlConfirmCode}
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
    setOnError: PropTypes.func.isRequired,
    urlConfirmCode: PropTypes.string
}

export default EmailConfirmForm;