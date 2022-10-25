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
        console.log(formElement);
    }, []); 

    const form = () =>
    {
        const element = formElement;
        element.setOnSuccess = setConfirmSuccess;
        element.code = code;
        console.log(element);
        return element;
    }

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
               <>
               {formElement}
               </>
            )
        }
    </>
};

export default ConfirmPage;