import "../Styles/ProfilePageStyles/ProfielPage.css"
import ProfilDataCard from "../Components/ProfilePage/Profil-Data-Card";
import ProfilSocialCard from "../Components/ProfilePage/Profil-Social-Card";
import ProfilProfilCard from "../Components/ProfilePage/Profil-Profil-Card";


import { useState, useEffect } from "react";

// Prototyp
import { GetFromStorage } from '../Services/StorageService';
import { PrivateAPI } from '../Services/AjaxService';
import { accessTokenTag } from '../Constants/storageTag';
import config from "../Constants/config.json";
import {NotificationManager} from 'react-notifications';
import ModalWindow from "../Components/ModalWindow";



const ProfilePage = () =>
{
    const InitUserData =  {
        id: "49de0439-0000-4706-7522-08dab0608231",
        email: "email@email.cz",
        name: "",
        surname: "",
        phone: 0,
        isEnable: true,
        created: "2000-03-19T00:00:00",
        twoFactorAuth: "",
        state: "",
        city: "",
        religion: "",
        role: "role",
        sex: -1,
        birthdate: "2000-03-19T00:00:00",
        education: "",
        career: ""
    }

    const [userData, setUserData] = useState(InitUserData);

    const [modalShow, setModalShow] = useState(false);
    const [modalHeader, setModalHeader] = useState("Nadpis");
    const [modalElement, setModalElement] = useState(null);
    
    const CloseModal = () =>
    {
        setModalShow(false);
    }

    const ChangePassword = () =>
    {
        setModalHeader("Změnit Heslo");
        setModalElement(<>změna hesla</>);
        setModalShow(true);
    }

    const ChangePhoto = () =>
    {
        setModalHeader("Změnit Profilovou fotku");
        setModalElement(<>fotka</>);
        setModalShow(true);
    }

    const ToggleAccont = (id) =>
    {
        setModalHeader("Přidat / Odebrat Propojení");
        setModalElement(<>účet</>);
        setModalShow(true);
    }

    const ChangeEmail = () =>
    {
        setModalHeader("Změna Emailu");
        setModalElement(<>email</>);
        setModalShow(false);
    }

    const GetBaseInfo = async () =>
    {
        const selfInfo = config.path.selfInfo;

        try
        {
            var token = GetFromStorage(accessTokenTag);
            const response = await PrivateAPI.get(selfInfo, 
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            
            console.log(response.data);
            setUserData(() => response.data);
        }
        catch (err)
        {
            NotificationManager.error("nelze načíst data", "BaseInfo()", 10000);
            console.log("topNav error: ", err);
        }
    }

    // hook pro načtení dat
    useEffect(() =>
    {
        GetBaseInfo();
    }, []);
    
    return (
        <div className="profilePage">
            <h1>Profil</h1>                
                
            {/* Spodní rám */}
            <div className="profile-body">
        
                {/* <!-- levá strana --> */}
                <div className="profile-body-left">
                
                    {/* <!-- vrchní čtverec --> */}
                    <ProfilProfilCard data={userData} passwordChange={ChangePassword} photoChange={ChangePhoto} />
                
                    {/* <!-- Spodní čtverec --> */}
                    <ProfilSocialCard toggleAccount={ToggleAccont}/>
                </div>

                {/* <!-- Pravá strana --> */}
                <div className="profile-body-right">
                    <ProfilDataCard data={userData} emailChange={ChangeEmail} />
                </div>
            </div>

            <ModalWindow show={modalShow} header={modalHeader} onClose={CloseModal}>
                {modalElement}
            </ModalWindow>
        </div>
    );
}

export default ProfilePage;