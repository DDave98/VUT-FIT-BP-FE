import API from '../../Services/AjaxService';
import Form from 'react-bootstrap/Form';
import { useRef, useState, useEffect } from 'react'
import { nameRegex, passwordRegex, emailRegex } from '../../Constants/regex';

const RegistrationPage = () =>
{
    const userRef = useRef();
    const errRef = useRef();

    const [name, setUser] = useState('');
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

    return (
        <section>
            <p 
                ref={errRef}
                className={errMsg ? "errmsg" : "offscreen"}
                aria-live="assertive"
            >
                {errMsg}
            </p>

            
        </section>
    )
};

export default RegistrationPage;