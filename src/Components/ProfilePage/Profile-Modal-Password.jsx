import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import FormInputPassword from "../FormInputPassword";
import {FormPwdInputs} from "../FormPwdInputs";
import * as txt from"../../Constants/textContent";
import { passwordRegex } from "../../Constants/regex";
import SendButton from "../SendButton";
import NotificationManager from 'react-notifications/lib/NotificationManager';
import { apiPath } from "../../Constants/apiPath";
import { PrivateAPI } from "../../Services/AjaxService";
import { GetFromStorage } from "../../Services/StorageService";
import { accessTokenTag } from "../../Constants/storageTag";

/// funkce/komponenta, která představuje část stránky profil
/// načte informace o připojených účtech ze serveru
const ProfilModalPassword = ({data}) =>
{
    const [oldPassword, setOldPassword] = useState('');
    const [oldPasswordValid, setOldPasswordValid] = useState(false);
    const [newPassword, setNewPassword] = useState('');
    const [newPasswordValid, setNewPasswordValid] = useState(false);
    const [loadMode, setLoadMode] = useState(false);

    const handlSubmit = async (e) =>
    {
        if (Check())
        {
            e.preventDefault();
            setLoadMode(true);
            const token = GetFromStorage(accessTokenTag);
            const path = apiPath.changePwd;
            const ChangePasswordRequest = {
                newPassword: newPassword,
                oldPassword: oldPassword
            }

            try
            {
                const response = await PrivateAPI.post(
                    path,
                    JSON.stringify(ChangePasswordRequest), 
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                );

                console.log("pwd changed", response.data);
                NotificationManager.success("Heslo bylo změněno", " ", 4000);
            }
            catch (err)
            {
                var errTitle = "Nastala chyba při zpracování (" + err.response?.status + ")";
                var errMessage = "...";
                if (err == null) errMessage = "žádná odpověď od serveru, zkontrolujte prosím připojení.";
                else if (err.response?.status == 400) errMessage = "některý z uvedených parametrů je neplatný";
                else errMessage = "Změna hesla se nezdařila";

                NotificationManager.error(errMessage, errTitle, 10000);
                console.log("pwd change error: ", err);
            }

            setLoadMode(false);
        }
    }

    const Check = () =>
    {
        // stare i nove heslo musi byt validni podle regex výrazu
        var isValid = newPasswordValid && oldPasswordValid;
        if (!isValid) NotificationManager.error("Nevalidní vstup");
        return isValid;
    }

    return (
        <form 
            className="profile-modal-content"
            onSubmit={handlSubmit}
        >
            <FormInputPassword 
                placeholder="zadejte původní heslo"
                inputName="Staré heslo"
                onChangeValue={setOldPassword}
                getValidValue={setOldPasswordValid}
                regex={passwordRegex}
                htmlFor="profil-modal"
            />
            <FormPwdInputs
                input1Name="Nové heslo"
                placeholder1="zadejte nové heslo"
                input2Name="Potvrďte nové heslo"
                placeholder2="Potvrďte nové heslo"
                htmlFor='changePwdForm'
                onChangeValue={setNewPassword}
                getValidValue={setNewPasswordValid}
                instruction1={txt.pwdInstr}
                instruction2={txt.pwd2Instr}
                regex={passwordRegex}
            />
            <SendButton 
                disabled={!newPasswordValid || !oldPasswordValid}
                text="Změnit heslo"
                loadMode={loadMode}
            />
        </form>
    );
};

ProfilModalPassword.propTypes = {
    //isabled: PropTypes.bool,
};

export default ProfilModalPassword;
