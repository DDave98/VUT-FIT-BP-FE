import { useRef, useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
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
        userRef
    }) =>
{

    const [value, setValue] = useState('');
    const [validValue, setValidValue] = useState(false);
    const [valueFocus, setValueFocus] = useState(false);

    useEffect(() =>
    {
        const result = regex.test(value);
        console.log(inputName, value, result);
        setValidValue(result);
    }, [value]);

    //const divStyleClass = "flex flex-col items-baseline justify-between mt-2 max-w-lg";
    const inputStyleClass = "w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600";
    const instructionsStyleClass = "mt-4 bg-black block text-white p-2 rounded-md";
    const iconStyleClass = "inline-block ml-3 text-green-600";
    const icon2StyleClass = "inline-block ml-3 text-red-600";

    return <>
        <div className={divStyleClass}>
            <Form.Label htmlFor={htmlFor} className='block'>
                {inputName}
                <span className={validValue ? iconStyleClass : "hidden"}>
                    <FontAwesomeIcon icon={faCheck} />
                </span>
                <span className={validValue || !value ? "hidden" : icon2StyleClass}>
                    <FontAwesomeIcon icon={faTimes} />
                </span>
            </Form.Label>
            <Form.Control
                type={InputType}
                id={htmlFor}
                ref={userRef}
                autoComplete="off"
                onChange={(e) => setValue(e.target.value)}
                aria-invalid={validValue ? "false" : "true"}
                aria-describedby="nameNote"
                onFocus={() => setValueFocus(true)}
                onBlur={() => setValueFocus(false)}
                placeholder={placeholder}
                className={inputStyleClass}
                required
            />
            <p
                id='nameNote'
                className={valueFocus && value && !validValue ? instructionsStyleClass : "hidden"}
            >
                <svg
                    class="w-5 h-5 inline mr-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        >
                        </path>
                </svg>
                {instruction}
            </p>
        </div>
    </>

}

FormInput.propTypes = 
{
    InputType: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    htmlFor: PropTypes.string.isRequired,
    inputName: PropTypes.string.isRequired,
    divStyleClass: PropTypes.string.isRequired,
    regex: PropTypes.arrayOf(PropTypes.instanceOf(RegExp)),
    instruction: PropTypes.string.isRequired,
}

export {FormInput};