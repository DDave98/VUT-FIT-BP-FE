// General
import { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import FormPageLayout from './FormPageLayout';
import { FormInput } from './FormInput';
import { emailRegex } from '../Constants/regex';
import SendButton from './SendButton';
import config from "../Constants/config.json";
import { PublicAPI } from '../Services/AjaxService';
import { NotificationManager } from 'react-notifications';
import { consoleLog } from '../Services/DebugService';
import { usePublicApi } from '../Hooks/usePublicAPI';
import { apiPath } from '../Constants/apiPath';

const RecoveryForm = ({setOnSuccess}) =>
{

    const userRef = useRef();
    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);
    const [loadMode, setLoadMode] = useState(false);
    const [SendRequest, GenerateParams, GenerateError] = usePublicApi();

    const handlSubmit = async () =>
    {
        if (!validEmail)
        {
            NotificationManager.error("Nevalidní vstup", 10000);
            return;
        }

        setLoadMode(true);
        const errorMessage = "Některý z uvedených parametrů je neplatný";
        const errorTitle = "Obnova";
        const urlParams = [email];
        const error = GenerateError(errorMessage, errorTitle);
        const params = GenerateParams(apiPath.recovery, null , urlParams);
        const response = await SendRequest(params, error);
        setLoadMode(false);
        if(response != undefined) setOnSuccess(true);
    }

    return (
        <FormPageLayout name="Obnova Hesla" handlSubmit={handlSubmit}>
            <FormInput
                inputName="Email pro obnovu hesla:"
                InputType="email"
                placeholder='zadejte email'
                htmlFor='loginFormName'
                userRef={userRef}
                regex={emailRegex}
                onChangeValue={(value) => setEmail(value)}
                getValidValue={(isValid) => setValidEmail(isValid)}
            />
            <SendButton 
                disabled={!validEmail}
                text="Odeslat"
                loadMode={loadMode}
            />
        </FormPageLayout>
    );
}

RecoveryForm.propTypes = 
{
    setOnSuccess: PropTypes.func.isRequired,
}

export default RecoveryForm;