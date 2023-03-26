import "../Styles/ProfilePageStyles/ProfielPage.css"
import ProfilDataCard from "../Components/ProfilePage/Profil-Data-Card";
import ProfilSocialCard from "../Components/ProfilePage/Profil-Social-Card";
import ProfilProfilCard from "../Components/ProfilePage/Profil-Profil-Card";
import ProfilModalPassword from "../Components/ProfilePage/Profile-Modal-Password";
import {NotificationManager} from 'react-notifications';
import ModalWindow from "../Components/ModalWindow";

import { useState, useEffect } from "react";

// Prototyp
import { GetFromStorage } from '../Services/StorageService';
import { PrivateAPI } from '../Services/AjaxService';
import { accessTokenTag } from '../Constants/storageTag';
import config from "../Constants/config.json";
import ProfilModalPhoto from "../Components/ProfilePage/Profile-Modal-Photo";



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

    const [photo, setPhoto] = useState(null);

    
    // funkce zavře modal okno
    const CloseModal = () => 
    {
        setModalShow(false);    // zavřít okno
        setModalElement(<></>); // smazat obsah modalu
    }

    // otevření okna s formulářem na změnu hesla
    const ChangePassword = () =>
    {
        setModalHeader("Změnit Heslo");
        setModalElement(<ProfilModalPassword CloseModal={CloseModal} />);
        setModalShow(true);
    }

    // otevření okna s formulářem na změnu obrázku
    const ChangePhoto = () =>
    {
        setModalHeader("Změnit Profilovou fotku");
        setModalElement(<ProfilModalPhoto />);
        setModalShow(true);
    }

    // otevření okna s formulářem na přidání/odebrání účtu
    const ToggleAccont = (id) =>
    {
        console.log("accout click:", id);
        setModalHeader("Přidat / Odebrat " + id);
        setModalElement(<>účet {id}</>);
        setModalShow(true);
    }

    // otevření okna s formulářem na změnu emailu
    const ChangeEmail = () =>
    {
        console.log("Email change click");
        setModalHeader("Změna Emailu");
        setModalElement(<>email</>);
        setModalShow(true);
    }

    // metoda načte z api data o přihlášeném uživateli
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
            
            const blob = new Blob([response.data.photo], { type: 'image/jpeg' });
            const dataUrl = await new Promise(resolve => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.readAsDataURL(blob);
            });
            console.log("photo", blob);
            setPhoto(dataUrl);
        }
        catch (err)
        {
            NotificationManager.error("nelze načíst data", "BaseInfo()", 10000);
            console.log("topNav error: ", err);
        }
    }

    // hook pro načtení dat při otevření stránky
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
                    <ProfilProfilCard 
                        data={userData} 
                        passwordChange={ChangePassword} 
                        photoChange={ChangePhoto}
                        photo={photo} />
                
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