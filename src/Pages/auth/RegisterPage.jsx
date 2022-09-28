import FormPageLayout from '../../Components/FormPageLayout';
import { loginPath } from "../../Constants/pagesPath";
import { FormInput } from '../../Components/FormInput';
import { FormPwdInputs } from '../../Components/FormPwdInputs';
import { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { nameRegex, passwordRegex, emailRegex } from '../../Constants/regex';

const RegistrationPage = () =>
{
    const userRef = useRef();
    const errRef = useRef();

    const [errMsg, setErrMsg] = useState('');
    const [sucess, setSucess] = useState(false);


    const [name, setName] = useState('');
    const [validName, setValidName] = useState(false);

    const [surname, setSurname] = useState('');
    const [validSurname, setValidSurname] = useState(false);

    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);

    const [password, setPassword] = useState('');
    const [validPassword, setValidPassword] = useState(false);

    useEffect(() =>
    {
        userRef.current.focus();
    }, []);

    useEffect(() =>
    {
        //console.log("name: ", name, "isValid: ", validName);
    }, [name, validName]);

    useEffect(() =>
    {
        //console.log("surname: ", surname, "isValid: ", validSurname);
    }, [surname, validSurname]);

    useEffect(() =>
    {
        //console.log("email: ", email, "isValid: ", validEmail);
    }, [email, validEmail]);

    useEffect(() =>
    {
        //console.log("password: ", password, "isValid: ", validPassword);
    }, [password, validPassword]);


    const divStyleClass = "flex flex-col items-baseline justify-between mt-2 max-w-lg";
    const buttonStyleClass = "px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900 w-full";

    const instr = "Minimální délka 4 znaky. Mělo by začínat písmenem. Písmena, číslice, podtržítka, pomlčky jsou povolené.";
    const emailInstr = "zadejte platnou e-mailovou adresu."
    const pwdInstr = "Heslo by mělo obsahovat malé a velké písmena, číslice, speciální znak a minimální délka je 8 znaků."
    const pwd2Instr='Hesla se musí shodovat'

    return <>
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <p 
                    ref={errRef}
                    className={errMsg ? "errmsg" : "hidden"}
                    aria-live="assertive"
                >
                    {errMsg}
                </p>
                <FormPageLayout name='Registrace'>
                    <FormInput
                    InputType="email"
                        placeholder='zadejte jméno'
                        htmlFor='registrationFormName'
                        inputName='Jméno:'
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
                        <button className={buttonStyleClass}>Registrovat se</button>
                    </div>
                    <p>Jste již registrovaný?</p>
                    <Link to={loginPath} className='underline'>Přihlásit se</Link>
                </FormPageLayout>
            </div>
    </>
};

export default RegistrationPage;