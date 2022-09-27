import API from '../../Services/AjaxService';
import Form from 'react-bootstrap/Form';
import FormPageLayout from '../../Components/FormPageLayout';
import { FormInput } from '../../Components/FormInput';
import { useRef, useState, useEffect } from 'react';
import { nameRegex, passwordRegex, emailRegex } from '../../Constants/regex';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const RegistrationPage = () =>
{
    const userRef = useRef();
    const errRef = useRef();

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);


    const [pwd2, setPwd2] = useState('');
    const [validPwd2, setValidPwd2] = useState(false);
    const [pwd2Focus, setPwd2Focus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [sucess, setSucess] = useState(false);

    useEffect(() =>
    {
        userRef.current.focus();
    }, [])

    useEffect(() =>
    {
        setErrMsg('');
    }, [pwd, pwd])

    useEffect(() =>
    {
        const result = passwordRegex.test(pwd);
        console.log(result);
        console.log(pwd);
        setValidPwd(result);
        const match = pwd === pwd2;
        setPwd2(match);
    }, [pwd, pwd2])


    const divStyleClass = "flex flex-col items-baseline justify-between mt-2 max-w-lg";
    const inputStyleClass = "w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600";
    const buttonStyleClass = "px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900 w-full";

    const instr = "příjmení by mělo být minimálně 4 znaky dlouhé, mělo by začínat písmenem. Písmena, číslice, podtržítka, pomlčky jsou povolené.";

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
                        InputType='text'
                        placeholder='zadejte jméno'
                        htmlFor='registrationFormName'
                        inputName='Jméno:'
                        divStyleClass={divStyleClass}
                        regex={nameRegex}
                        instruction={instr}
                        userRef={userRef}
                    />
                    <FormInput
                        InputType='text'
                        placeholder='zadejte Příjmení'
                        htmlFor='registrationFormSurname'
                        inputName='Příjmení:'
                        divStyleClass={divStyleClass}
                        regex={nameRegex}
                        instruction={instr}
                        userRef={userRef}
                    />
                    <FormInput
                        InputType='password'
                        placeholder='zadejte heslo'
                        htmlFor='registrationFormPwd1'
                        inputName='Heslo:'
                        divStyleClass={divStyleClass}
                        regex={passwordRegex}
                        instruction={instr}
                        userRef={userRef}
                    />
                    <FormInput
                        InputType='password'
                        placeholder='zadejte heslo znovu'
                        htmlFor='registrationFormPwd2'
                        inputName='Potvrďte heslo:'
                        divStyleClass={divStyleClass}
                        regex={passwordRegex}
                        instruction={instr}
                        userRef={userRef}
                    />
                    <div className="flex items-baseline justify-between mb-6 mt-2">
                        <button className={buttonStyleClass}>Registrovat se</button>
                    </div>
                </FormPageLayout>
            </div>
    </>
};

export default RegistrationPage;