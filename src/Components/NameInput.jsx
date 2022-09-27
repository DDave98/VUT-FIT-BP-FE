import { useRef, useState, useEffect } from 'react'
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';

const NameInput = (
    {
        InputType,
        placeholder,
        htmlFor,
        inputName,
        divStyleClass,
        regex,
        instruction
    }) =>
{

    const userRef = useRef();

    const [name, setName] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    useEffect(() =>
    {
        const result = regex.test(name);
        console.log(name, result);
        setValidName(result);
    }, [name])

    return <>
        <div className={divStyleClass}>
            <Form.Label htmlFor={htmlFor} className='block'>
                {inputName}
                <span className={validName ? iconStyleClass : "hidden"}>
                    <FontAwesomeIcon icon={faCheck} />
                </span>
                <span className={validName || !name ? "hidden" : icon2StyleClass}>
                    <FontAwesomeIcon icon={faTimes} />
                </span>
            </Form.Label>
            <Form.Control
                type={InputType}
                id={htmlFor}
                ref={userRef}
                autoComplete="off"
                onChange={(e) => setName(e.target.value)}
                aria-invalid={validName ? "false" : "true"}
                aria-describedby="nameNote"
                onFocus={() => setUserFocus(true)}
                onBlur={() => setUserFocus(false)}
                placeholder={placeholder}
                className={inputStyleClass}
                required
            />
            <p
                id='nameNote'
                className={userFocus && name && !validName ? instructionsStyleClass : "hidden"}
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

export default NameInput;