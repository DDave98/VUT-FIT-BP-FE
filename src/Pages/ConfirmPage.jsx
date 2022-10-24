import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import EmailConfirmForm from '../Components/EmailConfirmForm';
import { loginPath } from "../Constants/pagesPath";
import SuccessForm from '../Components/SuccessForm';

const ConfirmPage = ({
    formElement,
    successFromProperties
}) =>
{
    const [confirmSuccess, setConfirmSuccess] = useState(false);
    const [code, setCode] = useState('');

    const search = useLocation().search;

    useEffect(() =>
    {
        const urlCode = new URLSearchParams(search).get('code');
        setCode(urlCode);
    }, []); 

    return <>
        {
            confirmSuccess ?
            (
                <SuccessForm
                    title="Email byl úspěšně potvrzený"
                    buttonText="přejít na přihlášení"
                    LinkPath={loginPath}
                />
            ) :
            (
                <EmailConfirmForm
                    setOnSuccess={setConfirmSuccess}
                    code={code}
                />
            )
        }
    </>
};

export default ConfirmPage;