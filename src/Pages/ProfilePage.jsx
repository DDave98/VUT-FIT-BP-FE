import "../Styles/ProfielPage.css"
import ProfilDataCard from "../Components/Profil-Data-Card";
import ProfilSocialCard from "../Components/Profil-Social-Card";
import ProfilProfilCard from "../Components/Profil-Profil-Card";


import { useState, useEffect } from "react";

// Prototyp
import { GetFromStorage } from '../Services/StorageService';
import { PrivateAPI } from '../Services/AjaxService';
import { accessTokenTag } from '../Constants/storageTag';
import config from "../Constants/config.json";
import {NotificationManager} from 'react-notifications';



const ProfilePage = () =>
{
    const InitUserData =  {
        id: "49de0439-0000-4706-7522-08dab0608231",
        email: "email@email.cz",
        name: "Jméno",
        surname: "Příjmení",
        phone: 0,
        isEnable: true,
        created: "2000-03-19T00:00:00",
        twoFactorAuth: "none",
        state: "Stát",
        city: "Město",
        religion: "",
        role: "role",
        sex: -1,
        birthdate: "2000-03-19T00:00:00",
        edu: "edu",
        job: "job"
    }

    const [userData, setUserData] = useState(InitUserData);

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
                    <ProfilProfilCard data={userData} />
                
                    {/* <!-- Spodní čtverec --> */}
                    <ProfilSocialCard />
                </div>

                {/* <!-- Pravá strana --> */}
                <div className="profile-body-right">
                    <ProfilDataCard data={userData} />
                </div>
            </div>
        </div>
    );
}

export default ProfilePage;