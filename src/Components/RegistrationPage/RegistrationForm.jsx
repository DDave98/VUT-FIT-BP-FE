import FormPageLayout from '../FormPageLayout';
import { loginPath, confirmPath } from "../../Constants/pagesPath";
import { FormInput } from '../FormInput';
import { FormPwdInputs } from '../FormPwdInputs';
import { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { nameRegex, passwordRegex, emailRegex } from '../../Constants/regex';
import { PublicAPI } from '../../Services/AjaxService';
import config from "../../Constants/config.json";
import SendButton from '../SendButton';
import Recaptcha from '../ReCAPTCHA';
import { consoleLog } from '../../Services/DebugService';
import { usePublicApi } from '../../Hooks/usePublicAPI';
import { NotificationManager } from 'react-notifications';
import { apiPath } from '../ProfilePage/Profile-Import';

const RegistrationForm = ({setOnSuccess}) =>
{
    const userRef = useRef();

    const [loadMode, setLoadMode] = useState(false);
    const [reValid, setReValid] = useState(false);

    const [name, setName] = useState('');
    const [validName, setValidName] = useState(false);

    const [surname, setSurname] = useState('');
    const [validSurname, setValidSurname] = useState(false);

    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);

    const [password, setPassword] = useState('');
    const [validPassword, setValidPassword] = useState(false);

    const [SendRequest, GenerateParams, GenerateError] = usePublicApi();

    const handlSubmit = async () => {

        if (!(validEmail && validName && validSurname && validPassword))
        {
            NotificationManager.error("Jeden ze vstupů není vaidní", "Chyba při registraci");
            return;
        }

        setLoadMode(true);
        const errorMessage = "Nelze registrovat uživatele. Některá z dat jsou nevalidní nebo účet s takovým emailem již existuje.";
        const errorHeader = "Registrace uživatele";
        const error = GenerateError(errorMessage, errorHeader);
        const registrationData = {
            Name: name,
            Surname: surname,
            Email: email,
            Password: password,
            Hook: window.location.href + "/" + confirmPath
        }
        const params = GenerateParams(apiPath.registration, registrationData);
        const response = await SendRequest(params, error);
        setLoadMode(false);
        if(response != undefined) setOnSuccess(response.data);
    }

    const instr = "Minimální délka 4 znaky. Mělo by začínat písmenem. Písmena, číslice, podtržítka, pomlčky jsou povolené.";
    const emailInstr = "zadejte platnou e-mailovou adresu."
    const pwdInstr = "Heslo musí obsahovat malé a velké písmena, číslici, speciální znak. Minimální délka je 8 znaků. Povolené speciální znaky jsou !@#$%"
    const pwd2Instr='Hesla se musí shodovat'

    const recapchaVisible = validName && validSurname && validEmail && validPassword;
    const sendButtonDisabled = !validName || !validSurname || !validEmail || !validPassword || !reValid;

    return <>
        <FormPageLayout name='Registrace' handlSubmit={handlSubmit}>
            <FormInput
                inputName="Jméno:"
                placeholder='zadejte jméno'
                htmlFor='registrationFormName'
                regex={nameRegex}
                instruction={instr}
                userRef={userRef}
                onChangeValue={(value) => setName(value)}
                getValidValue={(value) => setValidName(value)}
            />
            <FormInput
                placeholder='zadejte Příjmení'
                htmlFor='registrationFormSurname'
                inputName='Příjmení:'
                regex={nameRegex}
                instruction={instr}
                userRef={userRef}
                onChangeValue={(value) => setSurname(value)}
                getValidValue={(isValid) => setValidSurname(isValid)}
            />
            <FormInput
                placeholder='zadejte Email'
                htmlFor='registrationFormEmail'
                inputName='Email:'
                regex={emailRegex}
                instruction={emailInstr}
                userRef={userRef}
                onChangeValue={(value) => setEmail(value)}
                getValidValue={(isValid) => setValidEmail(isValid)}
            />
            <FormPwdInputs
                placeholder1='zadejte heslo'
                placeholder2='zadejte heslo znovu'
                htmlFor='registrationFormPwd'
                input1Name='Heslo:'
                input2Name='Potvrdit Heslo:'
                regex={passwordRegex}
                instruction1={pwdInstr}
                instruction2={pwd2Instr}
                userRef={userRef}
                onChangeValue={(value) => setPassword(value)}
                getValidValue={(isValid) => setValidPassword(isValid)}
            />
            <Recaptcha
                siteKey={config.RecaptchaKey}
                isValid={setReValid}
                visible={recapchaVisible}
            />
            <SendButton 
                disabled={sendButtonDisabled}
                text="Registrovat se"
                loadMode={loadMode}
            />
            <p className='text-sm mb-5'>
                * Kliknutím na registrovat se vytvoříte nový účet a zároveň s tím souhlasíte s
                <Link className='text-blue-600 uderline' to={""}> podmínkami zpracování </Link>
                osobních údajů.
            </p>
            <div className='flex'>
                <p className='mr-2'>Jste již registrovaný?</p>
                <Link to={loginPath} className='underline'>Přihlásit se</Link>
            </div>
        </FormPageLayout>
    </>
};

RegistrationForm.propTypes = 
{
    setOnSuccess: PropTypes.func.isRequired,
}

export default RegistrationForm;