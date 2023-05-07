import { Link } from "react-router-dom";
import "../../Styles/FormElement/LoginRegistrationLink.css";
import { registerPath } from "../LoginPage/LoginPage-imports";

const LoginRegistrationLink = () =>
{
    return (
        <p className='LoginRegistrationLink'>
            Nemáte účet?
            <Link to={registerPath}>
                Registrujte se
            </Link>
        </p>
    );
}

export default LoginRegistrationLink;