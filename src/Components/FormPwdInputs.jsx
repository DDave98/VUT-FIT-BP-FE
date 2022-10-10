/**
 * Komponenta kombinuje dva Form Inputy
 * tvoří drojici heslo a potvrzení hesla
 */

import { useState, useEffect } from 'react';
import { FormInput } from './FormInput';
import PropTypes from 'prop-types';
import { passwordRegex } from '../Constants/regex';

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

    const [pwd2, setPwd2] = useState('');
    const [pwd1, setPwd1] = useState('');
    const [validPwd1, setValidPwd1] = useState(false);

    useEffect(() =>
    {
        const result = regex?.test(pwd1) ?? passwordRegex.test(pwd1);

        setValidPwd1(result);

        const isValid = pwd1 === pwd2 && validPwd1;
        onChangeValue(pwd1);
        getValidValue?.(isValid);
    }, [pwd1, pwd2]);

    const divStyle = "flex flex-col items-baseline justify-between mt-2 max-w-lg";

    return <>
        <FormInput
            InputType="password"
            placeholder={placeholder1}
            htmlFor={htmlFor + '1'}
            inputName={input1Name}
            divStyleClass={divsStyleClass ?? divStyle}
            regex={regex ?? passwordRegex}
            instruction={instruction1}
            userRef={userRef}
            onChangeValue={(value) => setPwd1(value)}
            getValidValue={(value) => setValidPwd1(value)}
        />
        <FormInput
            InputType="password"
            placeholder={placeholder2}
            htmlFor={htmlFor + '2'}
            inputName={input2Name}
            divStyleClass={divsStyleClass ?? divStyle}
            instruction={instruction2}
            userRef={userRef}
            onChangeValue={(value) => setPwd2(value)}
            extCompareValue={pwd1}
        />
    </>

}

FormPwdInputs.propTypes = 
{
    placeholder1: PropTypes.string,
    placeholder2: PropTypes.string,
    htmlFor: PropTypes.string.isRequired,
    input1Name: PropTypes.string.isRequired,
    input2Name: PropTypes.string.isRequired,
    divsStyleClass: PropTypes.string,
    regex: PropTypes.instanceOf(RegExp),
    instruction1: PropTypes.string,
    instruction2: PropTypes.string,
    getValidValue: PropTypes.func,
    onChange: PropTypes.func,
}

export {FormPwdInputs};