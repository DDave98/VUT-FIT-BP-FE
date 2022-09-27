import FormPageLayout from '../../Components/FormPageLayout';
import { FormInput } from '../../Components/FormInput';
import { useRef, useState, useEffect } from 'react';
import { nameRegex, passwordRegex, emailRegex } from '../../Constants/regex';

const RegistrationPage = () =>
{
    const userRef = useRef();
    const errRef = useRef();

    const [errMsg, setErrMsg] = useState('');
    const [sucess, setSucess] = useState(false);

    useEffect(() =>
    {
        userRef.current.focus();
    }, [])


    const divStyleClass = "flex flex-col items-baseline justify-between mt-2 max-w-lg";
    const inputStyleClass = "w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600";
    const buttonStyleClass = "px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900 w-full";

    const instr = "Minimální délka 4 znaky. Mělo by začínat písmenem. Písmena, číslice, podtržítka, pomlčky jsou povolené.";
    const emailInstr = "zadejte platnou e-mailovou adresu."

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
                        InputType='text'
                        placeholder='zadejte Email'
                        htmlFor='registrationFormEmail'
                        inputName='Email:'
                        divStyleClass={divStyleClass}
                        regex={emailRegex}
                        instruction={emailInstr}
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