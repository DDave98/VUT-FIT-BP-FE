import { useBasicAuthSubmit } from "./LoginPage-hooks";
import {
    FormInput,
    useRef,
    useState,
    emailRegex,
    passwordRegex,
    PropTypes,
    useEffect,
    
} from "./LoginPage-imports";

/**
 * 
 * @param {onEmailChange} onEmailChange - nastavení hodnoty pole email
 * @param {onPasswordChange} onPasswordChange - nastavení hodnoty pole heslo
 * @returns furmulář běžného přihlášení
 */
const BasicAuth = (
{
    setBasicForm,
    disabled,
}) =>
{
    const userRef = useRef();
    const [validEmail, setValidEmail] = useState(false);
    const [validPassword, setValidPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => 
    {
        setBasicForm(
        {
            basicValid: validEmail && validPassword,
            email: email,
            password: password,
        });
    }, [validEmail, validPassword, email, password]);

    return <>
        <FormInput
            inputName="Email:"
            placeholder='zadejte email'
            htmlFor='loginFormName'
            userRef={userRef}
            regex={emailRegex}
            onChangeValue={setEmail}
            getValidValue={(isValid) => setValidEmail(isValid)}
            disabled={disabled}
        />
        <FormInput
            InputType={"password"}
            inputName="Heslo:"
            placeholder='zadejte heslo'
            htmlFor='loginFormPwd'
            userRef={userRef}
            regex={passwordRegex}
            onChangeValue={setPassword}
            getValidValue={(isValid) => setValidPassword(isValid)}
            disabled={disabled}
        />
    </>
};

BasicAuth.propTypes = 
{
}

export default BasicAuth;