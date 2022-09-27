import { useRef, useState, useEffect } from 'react'
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';

const NameInput = ({divStyleClass, }) =>
{

    const [name, setName] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    return <>
        <div className={divStyleClass}>
            <Form.Label htmlFor="registerInputName" className='block'>
                Jméno:
                <span className={validName ? iconStyleClass : "hidden"}>
                    <FontAwesomeIcon icon={faCheck} />
                </span>
                <span className={validName || !name ? "hidden" : icon2StyleClass}>
                    <FontAwesomeIcon icon={faTimes} />
                </span>
            </Form.Label>
            <Form.Control
                type="text"
                id="registerInputName"
                ref={userRef}
                autoComplete="off"
                onChange={(e) => setName(e.target.value)}
                aria-invalid={validName ? "false" : "true"}
                aria-describedby="nameNote"
                onFocus={() => setUserFocus(true)}
                onBlur={() => setUserFocus(false)}
                placeholder='zadejte jméno'
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
                jméno by mělo být minimálně 4 znaky dlouhé, mělo by začínat písmenem. 
                Písmena, číslice, podtržítka, pomlčky jsou povolené.
            </p>
        </div>
    </>

}

export default NameInput;