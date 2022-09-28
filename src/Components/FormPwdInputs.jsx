/**
 * Komponenta kombinuje dva Form Inputy
 * tvoří drojici heslo a potvrzení hesla
 */

import { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const FormPwdInputs = (
    {
        placeholder1,
        placeholder2,
        htmlFor,
        input1Name,
        input2Name,
        divsStyleClass,
        regex,
        instruction1,
        instruction2,
        userRef,
        onChangeValue,
        getValidValue
    }) =>
{

    const [pwd2, setPwd2] = useState(false);
    const [pwd1, setPwd1] = useState('');
    const [validPwd1, setValidPwd1] = useState(false);


    useEffect(() =>
    {
        const result = regex.test(pwd1);
        console.log('pwd1:', result, pwd1);
        setValidPwd1(result);

        const isValid = (pwd1 === pwd2) && validPwd1;
        onChangeValue(pwd1);
        getValidValue(isValid);
    }, [pwd1, pwd2]);

    return <>
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
    </>

}

FormPwdInputs.propTypes = 
{
    placeholder: PropTypes.string,
    htmlFor: PropTypes.string.isRequired,
    inputName: PropTypes.string.isRequired,
    divStyleClass: PropTypes.string.isRequired,
    regex: PropTypes.instanceOf(RegExp),
    instruction: PropTypes.string.isRequired,
}

export {FormPwdInputs};