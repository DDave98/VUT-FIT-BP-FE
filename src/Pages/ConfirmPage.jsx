import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import EmailConfirmForm from '../Components/EmailConfirmForm';
import FormPageLayout from '../Components/FormPageLayout';
import { loginPath } from "../Constants/pagesPath";
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {NotificationContainer, NotificationManager} from 'react-notifications';

const ConfirmPage = () =>
{
    const [confirmSuccess, setConfirmSuccess] = useState(false);
    const [code, setCode] = useState('');
    
    const ShowError = (message, title) =>
    {
        NotificationManager.error(message, title, 10000);
    }

    const search = useLocation().search;

    useEffect(() =>
    {
        const urlCode = new URLSearchParams(search).get('code');
        setCode(urlCode);
    }, []); 

    const buttonStyleClass = "px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900 w-full disabled:opacity-50 disabled:bg-gray-400";

    return <>
        {
            confirmSuccess ?
            (
                <>
                    <FormPageLayout name='Email byl úspěšně potvrzený'>
                        <FontAwesomeIcon icon={faCheck} className="m-auto p-10 text-2xl font-bol w-20 h-20 mb-8 mt-16 border-solid border-2 border-green-600 rounded-full block text-green-600"/>
                        <div className="flex items-baseline justify-between mb-6 text-center">
                            <Link to={loginPath} className={buttonStyleClass} >přejít na přihlášení</Link>
                        </div>
                    </FormPageLayout>
                </>
                
            ) :
            (
                <EmailConfirmForm setOnSuccess={setConfirmSuccess} setOnError={ShowError} urlConfirmCode={code} />
            )
        }
        <NotificationContainer />
    </>
};

export default ConfirmPage;