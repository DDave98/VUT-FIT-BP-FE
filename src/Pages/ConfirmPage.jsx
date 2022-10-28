import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { loginPath } from "../Constants/pagesPath";
import SuccessForm from '../Components/SuccessForm';
import React from 'react';

const ConfirmPage = ({
    formElement,
    successFromProperties
}) =>
{
    const [confirmSuccess, setConfirmSuccess] = useState(false);
    const [code, setCode] = useState('');

    const formParam = {setOnSuccess: setConfirmSuccess, code: code};

    const search = useLocation().search;

    useEffect(() =>
    {
        const urlCode = new URLSearchParams(search).get('code');
        setCode(urlCode);
    }, []); 

    const form = () =>
    {
        const formComponent = React.cloneElement(formElement, formParam);
        return formComponent;
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
                {
                    form()
                }
               </>
            )
        }
    </>
};

export default ConfirmPage;