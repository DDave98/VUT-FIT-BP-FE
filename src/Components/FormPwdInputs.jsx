/**
 * Komponenta kombinuje dva Form Inputy
 * tvoří drojici heslo a potvrzení hesla
 */

import { useState, useEffect } from 'react';
import { FormInput } from './FormInput';
import PropTypes from 'prop-types';
import { propTypes } from 'react-bootstrap/esm/Image';

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

        const isValid = isSame() && result;
        //console.log('pwd2:', isValid, pwd2);
        onChangeValue(pwd1);
        getValidValue(isValid);
    }, [pwd1, pwd2]);

    const isSame = (value) => {return pwd1 === value && pwd1 != ""}

    return <>
        <FormInput
            
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
        
            placeholder={placeholder2}
            htmlFor={htmlFor + '2'}
            inputName={input2Name}
            divStyleClass={divsStyleClass}
            instruction={instruction2}
            userRef={userRef}
            onChangeValue={(value) => setPwd2(value)}
            getValidValue={() => {}}
            extSetValidValue={(value) => isSame(value)}
            testVal={pwd1}
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
    getValidValue: propTypes.func,
    onChange: PropTypes.func,
}

export {FormPwdInputs};