import {
    FormInput,
    useRef,
    useState,
    emailRegex,
    passwordRegex,
    PropTypes,
    useEffect
    
} from "./LoginPage-imports";

const BasicAuth = (
{
    onEmailChange,
    onPasswordChange,
    setIsValid,
    disabled
}) =>
{
    const userRef = useRef();
    const [validEmail, setValidEmail] = useState(false);
    const [validPassword, setValidPassword] = useState(false);

    const CheckValid = () =>
    {
        setIsValid(validEmail && validPassword);
    }

    useEffect(() => 
    {
        CheckValid();
    }, [validEmail, validPassword])

    return <>
        <FormInput
            inputName="Email:"
            placeholder='zadejte email'
            htmlFor='loginFormName'
            userRef={userRef}
            regex={emailRegex}
            onChangeValue={onEmailChange}
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
            onChangeValue={onPasswordChange}
            getValidValue={(isValid) => setValidPassword(isValid)}
            disabled={disabled}
        />
    </>
};

BasicAuth.propTypes = 
{
}

export default BasicAuth;