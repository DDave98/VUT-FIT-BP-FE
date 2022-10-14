import FormPageLayout from './FormPageLayout';
import { loginPath } from "../Constants/pagesPath";
import { FormInput } from './FormInput';
import { FormPwdInputs } from './FormPwdInputs';
import { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { nameRegex, passwordRegex, emailRegex } from '../Constants/regex';
import { PublicAPI } from '../Services/AjaxService';
import config from "../Constants/config.json";
import SendButton from './SendButton';
import Recaptcha from './ReCAPTCHA';

const RegistrationForm = ({setOnSuccess, setOnError}) =>
{
    const userRef = useRef();

    const [loadMode, setLoadMode] = useState(false);

    const [name, setName] = useState('');
    const [validName, setValidName] = useState(false);

    const [surname, setSurname] = useState('');
    const [validSurname, setValidSurname] = useState(false);

    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);

    const [password, setPassword] = useState('');
    const [validPassword, setValidPassword] = useState(false);

    const handlSubmit = async () => {

        if (!(validEmail && validName && validSurname && validPassword))
        {
            setOnError("Nevalidní vstup");
            return;
        }

        setLoadMode(true);

        const registrationPath = config.path.registration;
        const registrationData = {
            Name: name,
            Surname: surname,
            Email: email,
            Password: password
        }

        try
        {
            const response = await PublicAPI.post(
                registrationPath,
                JSON.stringify(registrationData)
            );
            console.log("response: ", response.data, response.status);
            setOnSuccess(response.data);
        }
        catch (err)
        {
            if (err == null) setOnError("žádná odpověď od serveru, zkontrolujte prosím připojení.", "nastala chyba");
            else if (err.response?.status == 409) setOnError(err.response.data, "");
            else if (err.response?.status == 400) setOnError("některý z uvedených parametrů je neplatný", "");
            else setOnError("Registrace se nezdařila", "nastala chyba");
            console.log("registration form error: ", err);
        }

        setLoadMode(false);
    }

    const instr = "Minimální délka 4 znaky. Mělo by začínat písmenem. Písmena, číslice, podtržítka, pomlčky jsou povolené.";
    const emailInstr = "zadejte platnou e-mailovou adresu."
    const pwdInstr = "Heslo musí obsahovat malé a velké písmena, číslici, speciální znak. Minimální délka je 8 znaků. Povolené speciální znaky jsou !@#$%"
    const pwd2Instr='Hesla se musí shodovat'

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
            <Recaptcha />
            <SendButton 
                disabled={!validName || !validSurname || !validEmail || !validPassword}
                text="Registrovat se"
                loadMode={loadMode}
            />
            <p>Jste již registrovaný?</p>
            <Link to={loginPath} className='underline'>Přihlásit se</Link>
        </FormPageLayout>
    </>
};

RegistrationForm.propTypes = 
{
    setOnSuccess: PropTypes.func.isRequired,
    setOnError: PropTypes.func.isRequired,
}

export default RegistrationForm;