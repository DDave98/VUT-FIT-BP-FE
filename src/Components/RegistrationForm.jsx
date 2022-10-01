import FormPageLayout from './FormPageLayout';
import { loginPath } from "../Constants/pagesPath";
import { FormInput } from './FormInput';
import { FormPwdInputs } from './FormPwdInputs';
import { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { nameRegex, passwordRegex, emailRegex } from '../Constants/regex';

const RegistrationForm = ({setOnSuccess, setOnError}) =>
{
    const userRef = useRef();

    const [name, setName] = useState('');
    const [validName, setValidName] = useState(false);

    const [surname, setSurname] = useState('');
    const [validSurname, setValidSurname] = useState(false);

    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);

    const [password, setPassword] = useState('');
    const [validPassword, setValidPassword] = useState(false);

    const handlSubmit = () => {

        if (!(validEmail && validName && validSurname && validPassword))
        {
            setOnError("Nevalidní vstup");
            console.log("nevalidní vstup");
            return;
        }

        setOnSuccess(true);
    }

    const divStyleClass = "flex flex-col items-baseline justify-between mt-2 max-w-lg";
    const buttonStyleClass = "px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900 w-full disabled:opacity-50 disabled:bg-gray-400";

    const instr = "Minimální délka 4 znaky. Mělo by začínat písmenem. Písmena, číslice, podtržítka, pomlčky jsou povolené.";
    const emailInstr = "zadejte platnou e-mailovou adresu."
    const pwdInstr = "Heslo musí obsahovat malé a velké písmena, číslici, speciální znak. Minimální délka je 8 znaků. Povolené speciální znaky jsou !@#$%"
    const pwd2Instr='Hesla se musí shodovat'

    return <>
        <FormPageLayout name='Registrace' handlSubmit={handlSubmit}>
            <FormInput
                inputName="Zadejte potvrzovací kód"
                placeholder='zadejte jméno'
                htmlFor='registrationFormName'
                divStyleClass={divStyleClass}
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
                divStyleClass={divStyleClass}
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
                divStyleClass={divStyleClass}
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
                divsStyleClass={divStyleClass}
                regex={passwordRegex}
                instruction1={pwdInstr}
                instruction2={pwd2Instr}
                userRef={userRef}
                onChangeValue={(value) => setPassword(value)}
                getValidValue={(isValid) => setValidPassword(isValid)}
            />
            <div className="flex items-baseline justify-between mb-6 mt-2">
                <button
                    className={buttonStyleClass}
                    disabled={!validName || !validSurname || !validEmail || !validPassword ? true : false}
                >
                    Registrovat se
                </button>
            </div>
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