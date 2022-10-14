import { useState } from 'react';
import PropTypes from 'prop-types';
import { passwordRegex } from '../Constants/regex';
import { FormInput } from './FormInput';

const FormInputPassword = (
{
    placeholder,
    htmlFor,
    inputName,
    divStyleClass,
    regex,
    instruction,
    userRef,
    onChangeValue,
    getValidValue,
    extCompareValue,
    inputValue
}) => 
{

    const [passwordShown, setPasswordShown] = useState(false);

    const togglePassword = () => {
        setPasswordShown(!passwordShown);
      };

    const icoStyle = "h-9 ml-2 mt-9 p-2 green-600 block border border-sky-100 hover:border-sky-600 rounded-full";

    return (
        <>
            <div className="flex flex-row max-w-lg" >
                <FormInput
                    InputType={passwordShown ? "text" : "password"}
                    inputName={inputName}
                    placeholder={placeholder}
                    htmlFor={htmlFor}
                    userRef={userRef}
                    divStyleClass={"grow " + divStyleClass}
                    regex={regex ?? passwordRegex}
                    onChangeValue={onChangeValue}
                    getValidValue={getValidValue}
                    instruction={instruction}
                    inputValue={inputValue}
                    extCompareValue={extCompareValue ?? ""}
                />
                <img
                    src={require (!passwordShown ? 
                        "../Assets/Images/pwd_icons/hide.png" :
                        "../Assets/Images/pwd_icons/show.png")}
                    className={icoStyle}
                    onClick={togglePassword}
                />
            </div>
        </>
    )
}

FormInputPassword.propTypes = 
{
    InputType: PropTypes.string,
    placeholder: PropTypes.string,
    htmlFor: PropTypes.string.isRequired,
    inputName: PropTypes.string,
    divStyleClass: PropTypes.string,
    regex: PropTypes.instanceOf(RegExp),
    instruction: PropTypes.string,
    getValidValue: PropTypes.func,
    onChangeValue: PropTypes.func,
    extCompareValue: PropTypes.string,
    inputValue: PropTypes.string,
}

export default FormInputPassword;