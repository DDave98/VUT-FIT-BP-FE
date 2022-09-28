/**
 * Komponenta kombinuje dva Form Inputy
 * tvoří drojici heslo a potvrzení hesla
 */

import { useState, useEffect } from 'react';
import { FormInput } from './FormInput';
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

    const [pwd2, setPwd2] = useState('');
    const [pwd1, setPwd1] = useState('');
    const [validPwd1, setValidPwd1] = useState(false);

    useEffect(() =>
    {
        const result = regex.test(pwd1);
        //console.log('pwd1:', result, pwd1);
        setValidPwd1(result);

        const isValid = pwd1 === pwd2 && validPwd1;
        //console.log('pwd2:', isValid, pwd2);
        onChangeValue(pwd1);
        getValidValue?.(isValid);
    }, [pwd1, pwd2]);

    return <>
        <FormInput
            InputType="password"
            placeholder={placeholder1}
            htmlFor={htmlFor + '1'}
            inputName={input1Name}
            divStyleClass={divsStyleClass}
            regex={regex}
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
            divStyleClass={divsStyleClass}
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
    divsStyleClass: PropTypes.string.isRequired,
    regex: PropTypes.instanceOf(RegExp),
    instruction1: PropTypes.string.isRequired,
    instruction2: PropTypes.string.isRequired,
    getValidValue: PropTypes.func,
    onChange: PropTypes.func,
}

export {FormPwdInputs};