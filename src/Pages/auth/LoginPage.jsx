import LoginForm from '../../Components/LoginForm';
import {NotificationContainer, NotificationManager} from 'react-notifications';

const LoginPage = () =>
{
    // zde pak uložit token a zobrazit form pro dvoufazové

    const ShowError = (message, title) =>
    {
        NotificationManager.error(message, title, 10000);
    }

    return <>
        <LoginForm setOnError={ShowError} />
        <NotificationContainer />
    </>
};

export default LoginPage;