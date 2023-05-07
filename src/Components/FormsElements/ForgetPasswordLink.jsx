import { Link } from "react-router-dom";
import { recoveryPath } from "../LoginPage/LoginPage-imports";
import "../../Styles/FormElement/ForgetPasswordLink.css";

const ForgetPasswordLink = () =>
{
    return (
        <Link to={recoveryPath} className='lostPasswod'>
            Zapomněl jste heslo?
        </Link>
    );
}

export default ForgetPasswordLink;