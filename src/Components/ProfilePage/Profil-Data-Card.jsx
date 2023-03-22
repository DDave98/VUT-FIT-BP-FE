import PropTypes from "prop-types";
import { useState, useEffect } from 'react';
import { apiPath } from "../../Constants/apiPath";
import { ConvertDate } from "../../Services/GeneralFunctions";

import ProfilDataCardInput from "./Profil-DataCard-Input";
import ProfilDataCardSelect from "./Profil-DataCard-Select";
import ProfilDataCardCalendar from "./Profil-Datacard-calendar";
import ProfilDataCardEdit from "./Profil-DataCard-edit";
import ProfilDataCardButton from "./Profil-DataCard-button";

// Prototyp
import { GetFromStorage } from '../../Services/StorageService';
import { PrivateAPI } from '../../Services/AjaxService';
import { accessTokenTag } from '../../Constants/storageTag';
import {NotificationManager} from 'react-notifications';

/// funkce komponenta, která představuje pravou stranu stránky profil
/// přijme objekt získaný od serveru
const ProfilDataCard = ({data, emailChange}) => {

  const formData = {
    name: data.name,
    surname: data.surname,
    phone: data.phone,
    twoFactorAuth: data.twoFactorAuth,
    state: data.state,
    city: data.city,
    religion: data.religion,
    sex: data.sex,
    birthdate: data.birthdate,
    education: data.education,
    career: data.career,
  }

  const [editMode, setEditMode] = useState(true);
  const [editData, setEditData] = useState(formData);


  const changeEditMode = () =>
  {
      setEditMode(!editMode);
  }

  const sendChanges = async () =>
  {
    const selfInfo = apiPath.UpdateUser;

    try
    {
        var token = GetFromStorage(accessTokenTag);
        const response = await PrivateAPI.put(selfInfo, 
          formData,
          {
              headers: { Authorization: `Bearer ${token}` },
          }
        );
        
        console.log("update status:", response.data);
    }
    catch (err)
    {
        NotificationManager.error("nelze načíst data", "BaseInfo()", 10000);
        console.log("topNav error: ", err);
    }
  }

  const pohlaviMap = (value) => {return value == 0 ? "muž" : value == 1 ? "žena" : "neuvedeno"} 
  const  pohlaviValues = [
    {value: 0, name: "Muž"},
    {value: 1, name: "Žena"},
  ];

  return (
    <div className="profile-card">

      <ProfilDataCardInput
        header="Jméno"
        value={data?.name}
        editMode={editMode} />

      <ProfilDataCardInput 
        header="Příjmení" 
        value={data?.surname} 
        editMode={editMode} />

      <ProfilDataCardButton 
        header="Email" value={data?.email} 
        editMode={editMode} onClick={emailChange} 
        btnVal="Změnit"/>

      <ProfilDataCardInput 
        header="Telefon" 
        value={data?.phone} 
        editMode={editMode} />

      <ProfilDataCardInput 
        header="2FA" 
        value={data?.twoFactorAuth != "none" ? "Ano" : "Ne"} 
        editMode={editMode} />

      <ProfilDataCardInput 
        header="Stát" value={data?.state} 
        editMode={editMode} />

      <ProfilDataCardInput 
        header="Město" 
        value={data?.city} 
        editMode={editMode} />

      <ProfilDataCardSelect 
        header="Pohlaví" editMode={editMode} 
        selected={data.sex} 
        value={pohlaviMap(data.sex)} 
        values={pohlaviValues}/>

      <ProfilDataCardCalendar 
        header="Datum narození"
        editMode={editMode}
        value={ConvertDate(editData.birthdate)}
        dival={new Date(data?.birthdate).toLocaleDateString()}
        max={(new Date()).getDate()}
        onChange={(e) => (e) => console.log(e.target.value)}
      />

      <ProfilDataCardInput 
        header="Náboženské vyznání" 
        value={data?.religion} 
        editMode={editMode} />
      
      <ProfilDataCardInput 
        header="Dosažené vzdělání" 
        value={editData?.education} 
        editMode={editMode} />
      
      <ProfilDataCardInput 
        header="Profese" 
        value={data?.career} 
        editMode={editMode} />
      
      <ProfilDataCardEdit 
        editMode={editMode} 
        changeEditMode={changeEditMode} 
        sendChanges={sendChanges} />
        
    </div>
  );
};

ProfilDataCard.propTypes = {
  //isabled: PropTypes.bool,
};

export default ProfilDataCard;
