// General
import { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import FormPageLayout from './FormPageLayout';
import { FormInput } from './FormInput';
import { emailRegex } from '../Constants/regex';
import SendButton from './SendButton';
import config from "../Constants/config.json";
import { PublicAPI } from '../Services/AjaxService';

const RecoveryForm = ({setOnError, setOnSuccess}) =>
{

    const userRef = useRef();

    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);
    const [loadMode, setLoadMode] = useState(false);

    const handlSubmit = async () =>
    {
        setLoadMode(true);

        if (!validEmail)
        {
            setOnError("Nevalidní vstup");
            return;
        }

        const recoveryPath = config.path.recovery + "/" + email;
        
        try
        {
            const response = await PublicAPI.get(recoveryPath);
            setOnSuccess(true);
        }
        catch (err)
        {
            var errTitle = "Nastala chyba při zpracování";
            var errMessage = "...";
            if (err == null) errMessage = "žádná odpověď od serveru, zkontrolujte prosím připojení.";
            else if (err.response?.status == 400) errMessage = "některý z uvedených parametrů je neplatný";
            else errMessage = "Operace se nezdařila";

            setOnError(errMessage, errTitle);
            console.log("Recovery form error: ", err);
        }

        setLoadMode(false);
    }

    const divStyleClass = "flex flex-col items-baseline justify-between mt-2 max-w-lg";

    return (
        <FormPageLayout name="Obnova Hesla" handlSubmit={handlSubmit}>
            <FormInput
                inputName="Email pro obnovu hesla:"
                InputType="email"
                placeholder='zadejte email'
                htmlFor='loginFormName'
                divStyleClass={divStyleClass}
                userRef={userRef}
                regex={emailRegex}
                onChangeValue={(value) => setEmail(value)}
                getValidValue={(isValid) => setValidEmail(isValid)}
            />
            <SendButton 
                disabled={!validEmail}
                text="Odeslat"
                loadMode={loadMode}
            />
        </FormPageLayout>
    );
}

RecoveryForm.propTypes = 
{
    setOnError: PropTypes.func.isRequired,
    setOnSuccess: PropTypes.func.isRequired,
}

export default RecoveryForm;