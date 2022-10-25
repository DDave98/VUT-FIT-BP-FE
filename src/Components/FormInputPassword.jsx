import { useState } from 'react';
import PropTypes from 'prop-types';
import { passwordRegex } from '../Constants/regex';
import { FormInput } from './FormInput';
import "../Styles/FormInputPassword.css";

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

    return (
        <>
            <div className="FormInputPassword" >
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
                    onPaste={(e) => {
                        e.preventDefault();
                        return false;
                    }}
                    onCopy={(e) => {
                        e.preventDefault();
                        return false;
                    }}
                />
                <img
                    src={require (!passwordShown ? 
                        "../Assets/Images/pwd_icons/hide.png" :
                        "../Assets/Images/pwd_icons/show.png")}
                    className="FormInputPasswordIcon"
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