import API from '../../Services/AjaxService';
import Form from 'react-bootstrap/Form';
import FormPageLayout from '../../Components/FormPageLayout';
import { useRef, useState, useEffect } from 'react'
import { nameRegex, passwordRegex, emailRegex } from '../../Constants/regex';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const RegistrationPage = () =>
{
    const userRef = useRef();
    const errRef = useRef();

    const [name, setName] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [surname, setSurname] = useState('');
    const [validSurname, setValidSurname] = useState(false);
    const [surnameFocus, setSurnameFocus] = useState(false);

    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);


    const [pwd2, setPwd2] = useState('');
    const [validPwd2, setValidPwd2] = useState(false);
    const [pwd2Focus, setPwd2Focus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [sucess, setSucess] = useState(false);

    useEffect(() =>
    {
        userRef.current.focus();
    }, [])

    useEffect(() =>
    {
        setErrMsg('');
    }, [surname, name, pwd, pwd, email])

    useEffect(() =>
    {
        const result = nameRegex.test(name);
        console.log(result);
        console.log(name);
        setValidName(result);
    }, [name])

    useEffect(() =>
    {
        const result = nameRegex.test(surname);
        console.log(result);
        console.log(surname);
        setValidSurname(result);
    }, [surname])

    useEffect(() =>
    {
        const result = nameRegex.test(email);
        console.log(result);
        console.log(email);
        setValidEmail(result);
    }, [email])

    useEffect(() =>
    {
        const result = passwordRegex.test(pwd);
        console.log(result);
        console.log(pwd);
        setValidPwd(result);
        const match = pwd === pwd2;
        setPwd2(match);
    }, [pwd, pwd2])


    const divStyleClass = "flex flex-col items-baseline justify-between mt-2 max-w-lg";
    const inputStyleClass = "w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600";
    const buttonStyleClass = "px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900 w-full";
    const instructionsStyleClass = "mt-4 bg-black block text-white p-2 rounded-md";
    const iconStyleClass = "inline-block ml-3 text-green-600";
    const icon2StyleClass = "inline-block ml-3 text-red-600";

    return <>
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <p 
                    ref={errRef}
                    className={errMsg ? "errmsg" : "hidden"}
                    aria-live="assertive"
                >
                    {errMsg}
                </p>
                <FormPageLayout name='Registrace'>
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
                        <div className={divStyleClass}>
                            <Form.Label htmlFor="registerInputSurname" className='block mr-5'>Příjmení:</Form.Label>
                            <Form.Control
                                type="text"
                                id="registerInputSurname"
                                placeholder='zadejte příjmení'
                                className={inputStyleClass}
                                required
                            />
                        </div>
                        <div className={divStyleClass}>
                            <Form.Label htmlFor="registerInputEmail" className='block mr-5'>Email:</Form.Label>
                            <Form.Control
                                type="text"
                                id="registerInputEmail"
                                placeholder='zadejte login'
                                className={inputStyleClass}
                                required
                            />
                        </div>
                        <div className={divStyleClass}>
                            <Form.Label htmlFor="registerInputPaswd" className='block mr-5'>Heslo:</Form.Label>
                            <Form.Control
                                type="password"
                                id="registerInputPaswd"
                                placeholder='zadejte heslo'
                                className={inputStyleClass}
                                required
                            />
                        </div>
                        <div className={divStyleClass}>
                            <Form.Label htmlFor="registerInputPaswd2" className='block mr-5'>Potvrdit:</Form.Label>
                            <Form.Control
                                type="password"
                                id="registerInputPaswd2"
                                placeholder='zadejte heslo znovu'
                                className={inputStyleClass}
                                required
                            />
                        </div>
                        <div className="flex items-baseline justify-between mb-6 mt-2">
                            <button className={buttonStyleClass}>Registrovat se</button>
                        </div>
                </FormPageLayout>
            </div>
    </>
};

export default RegistrationPage;