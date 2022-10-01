import FormPageLayout from './FormPageLayout';
import { FormInput } from './FormInput';
import { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { guidRegex } from '../Constants/regex';

const EmailConfirmForm = ({setOnSuccess, setOnError, urlConfirmCode}) =>
{
    const userRef = useRef();

    const [confirmCode, setConfirmCode] = useState(urlConfirmCode);
    const [validConfirmCode, setValidConfirmCode] = useState(false);

    const handlSubmit = () => {

        if (!validConfirmCode)
        {
            setOnError("Nevalidní kód");
            console.log("nevalidní kód");
            return;
        }

        setOnError("");
        setOnSuccess(true);
    }

    const divStyleClass = "flex flex-col items-baseline justify-between mt-2 max-w-lg";
    const buttonStyleClass = "px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900 w-full disabled:opacity-50 disabled:bg-gray-400";

    return <>
        <FormPageLayout name='Potvrzení Emailu' handlSubmit={handlSubmit}>
            <h4 className='text-1xl font-bold mb-2'>Uživatel byl zaregistrován</h4>
            <p className='mb-8 italic'>
                Na uvedenou e-mailuvou adresu byl zaslán potvrzovací kód.
                Klikněte na odkaz v emailu nebo napiště kód v Emailu. <br />
                Po potvrzení bude účet aktivní, jinak do 5 minut bude registrace stornována.
            </p>
            <FormInput
                inputName={'Potvrzovací kód:'}
                placeholder={'např: 8a10247a-cad4-476a-af29-481f26fd0d0b'}
                htmlFor='registrationFormName'
                userRef={userRef}
                onChangeValue={(value) => setConfirmCode(value)}
                getValidValue={(isValid) => setValidConfirmCode(isValid)}
                divStyleClass={divStyleClass}
                regex={guidRegex}
                inputValue={urlConfirmCode}
            />
            <div className="flex items-baseline justify-between mb-6 mt-2">
                <button
                    className={buttonStyleClass}
                    disabled={ !validConfirmCode ? true : false }
                >
                    potvrdit
                </button>
            </div>
        </FormPageLayout>
    </>
};

EmailConfirmForm.propTypes = 
{
    setOnSuccess: PropTypes.func.isRequired,
    setOnError: PropTypes.func.isRequired,
    urlConfirmCode: PropTypes.string
}

export default EmailConfirmForm;