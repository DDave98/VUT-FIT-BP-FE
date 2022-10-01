import { useRef, useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import EmailConfirmForm from '../Components/EmailConfirmForm';
import FormPageLayout from '../Components/FormPageLayout';
import { loginPath } from "../Constants/pagesPath";
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ConfirmPage = () =>
{
    const errRef = useRef();

    const [confirmSuccess, setConfirmSuccess] = useState(false);
    const [confirmErrorMsg, setConfirmErrorMsg] = useState('');

    const search = useLocation().search;
    const code = new URLSearchParams(search).get('code')

    const buttonStyleClass = "px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900 w-full disabled:opacity-50 disabled:bg-gray-400";

    return <>
        {
            confirmSuccess ?
            (
                <>
                    <FormPageLayout name='Email úspěšně potvrzen'>
                        <FontAwesomeIcon icon={faCheck} className="m-auto p-10 text-2xl font-bol w-20 h-20  border-solid border-2 border-green-600 rounded-full block text-green-600"/>
                        
                        <div className="flex items-baseline justify-between mb-6 mt-8 text-center">
                            <Link to={loginPath} className={buttonStyleClass} >Přihlásit se</Link>
                        </div>
                    </FormPageLayout>
                </>
                
            ) :
            (
                <EmailConfirmForm setOnSuccess={setConfirmSuccess} setOnError={setConfirmErrorMsg} urlConfirmCode={code} />
            )
        }
        <p 
            ref={errRef}
            className={confirmErrorMsg ? "errmsg" : "hidden"}
            aria-live="assertive"
        >
            {confirmErrorMsg}
        </p>
    </>
};

export default ConfirmPage;