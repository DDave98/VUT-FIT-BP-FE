import { useState, useEffect } from 'react';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';

const FormInput = (
    {
        InputType,
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
        inputValue,
        readOnly
    }) =>
{

    const [value, setValue] = useState('');
    const [validValue, setValidValue] = useState(false);
    const [valueFocus, setValueFocus] = useState(false);

    const checkInput = () =>
    {
        const result = regex?.test(value) && value != null || isSame(value);
        //console.log(inputName, value, result, isSame(value));

        setValidValue(result);
        onChangeValue(value);
        getValidValue?.(result);
    }

    useEffect(() =>
    {
        checkInput();
    }, [value, extCompareValue]);

    useEffect(() => 
    {
        setValue(inputValue);
    }, [inputValue])

    const isSame = (value) =>
    {
        if (extCompareValue != null)
            return extCompareValue === value && extCompareValue != "";
        else return false;
    }

    const divStyle = "flex flex-col items-baseline justify-between mt-2 max-w-lg";
    const inputStyleClass = "w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600";
    const instructionsStyleClass = "mt-4 bg-black block text-white p-2 rounded-md";
    const iconStyleClass = "inline-block ml-3 text-green-600";
    const icon2StyleClass = "inline-block ml-3 text-red-600";

    const validationIcons = <>
        <span className={validValue ? iconStyleClass : "hidden"}>
            <FontAwesomeIcon icon={faCheck} />
        </span>
        <span className={validValue || !value ? "hidden" : icon2StyleClass}>
            <FontAwesomeIcon icon={faTimes} />
        </span>
    </>

    const instructionElement = <p
        id={inputName + "nameNote"}
        className={valueFocus && value && !validValue ? instructionsStyleClass : "hidden"}
    >
        <svg
            className="w-5 h-5 inline mr-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
        >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                >
                </path>
        </svg>
        {instruction}
    </p>

    return <>
        <div className={divStyle + " " + divStyleClass}>
            <label htmlFor={htmlFor} className='block'>
                {inputName}
                {regex != null || extCompareValue != null ? validationIcons : <></>}
            </label>
            <input
                type={InputType? InputType : 'text'}
                id={htmlFor}
                ref={userRef}
                autoComplete="off"
                onChange={(e) => setValue(e.target.value)}
                aria-invalid={validValue ? "false" : "true"}
                aria-describedby={inputName + "nameNote"}
                onFocus={() => setValueFocus(true)}
                onBlur={() => setValueFocus(false)}
                placeholder={placeholder? placeholder : ''}
                className={inputStyleClass}
                defaultValue={inputValue ?? ""}
                readOnly={readOnly ?? false}
            />
            {instruction != null ? instructionElement : <></>}
        </div>
    </>

}

FormInput.propTypes = 
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
    readOnly: PropTypes.bool
}

export {FormInput};