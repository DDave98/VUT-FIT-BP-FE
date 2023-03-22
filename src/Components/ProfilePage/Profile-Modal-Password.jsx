import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import FormInputPassword from "../FormInputPassword";
import {FormPwdInputs} from "../FormPwdInputs";

/// funkce/komponenta, která představuje část stránky profil
/// načte informace o připojených účtech ze serveru
const ProfilModalPassword = ({data}) =>
{

    const OnChange = () =>
    {

    }

    return (
        <div className="profile-modal-content">
            <FormInputPassword 
                placeholder="zadejte původní heslo"
                inputName="Staré heslo"
                onChangeValue={OnChange}
                htmlFor="profil-modal"
            />
            <FormPwdInputs 
                htmlFor="profil-modal-pwds"
                input1Name="Nové heslo"
                placeholder1="zadejte nové heslo"
                input2Name="Potvrďte nové heslo"
                placeholder2="zadejte nové heslo"
                onChangeValue={OnChange}
            />
        </div>
    );
};

ProfilModalPassword.propTypes = {
    //isabled: PropTypes.bool,
};

export default ProfilModalPassword;
