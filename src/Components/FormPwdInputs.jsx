useEffect(() =>
{
    const result = passwordRegex.test(pwd);
    console.log(result);
    console.log(pwd);
    setValidPwd(result);
    const match = pwd === pwd2;
    setPwd2(match);
}, [pwd, pwd2])

import { useRef, useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';

const FormPwdInputs = (
    {
        InputType,
        placeholder,
        htmlFor,
        inputName,
        divStyleClass,
        regex,
        instruction,
        userRef
    }) =>
{

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
    InputType: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    htmlFor: PropTypes.string.isRequired,
    inputName: PropTypes.string.isRequired,
    divStyleClass: PropTypes.string.isRequired,
    regex: PropTypes.instanceOf(RegExp),
    instruction: PropTypes.string.isRequired,
}

export {FormPwdInputs};