import {
  PropTypes,
  useState,
  useEffect,
  apiPath,
  ConvertDate,
  GetFromStorage,
  PrivateAPI,
  accessTokenTag,
  NotificationManager
} from "./Profile-Import";

import ProfilDataCardInput from "./Profil-DataCard-Input";
import ProfilDataCardSelect from "./Profil-DataCard-Select";
import ProfilDataCardCalendar from "./Profil-Datacard-calendar";
import ProfilDataCardEdit from "./Profil-DataCard-edit";
import ProfilDataCardButton from "./Profil-DataCard-button";
import { consoleLog, ConsoleOut, consoleType } from "../../Services/DebugService";
import { PublicAPI } from "../LoginPage/LoginPage-imports";

const fileName = "ProfileDataCard";

/// funkce komponenta, která představuje pravou stranu stránky profil
/// přijme objekt získaný od serveru
const ProfilDataCard = ({data, emailChange, refresh}) =>
{

  const [editMode, setEditMode] = useState(true);
  const [mfaTypes, SetMfaTypes] = useState([]);

  const [userName, setUserName] = useState(data.name);
  const [userSurname, setUserSurname] = useState(data.surname);
  const [userPhone, setUserPhone] = useState(data.phone);
  const [user2FA, setUser2FA] = useState(data.twoFactorAuth);
  const [userState, setUserState] = useState(data.state);
  const [userCity, setUserCity] = useState(data.city);
  const [userReligion, setUserReligion] = useState(data.religion);
  const [userSex, setUserSex] = useState(data.sex);
  const [userBirthday, setUserBirthday] = useState(data.birthdate);
  const [userEducation, setUserEducation] = useState(data.education);
  const [userCareer, setUserCareer] = useState(data.career);

  const SetPrevVal = () =>
  {
    setUserName(data.name);
    setUserSurname(data.surname);
    setUserPhone(data.phone);
    setUser2FA(data.twoFactorAuth);
    setUserState(data.state);
    setUserCity(data.city);
    setUserReligion(data.religion);
    setUserSex(data.sex);
    setUserBirthday(data.birthdate);
    setUserEducation(data.education);
    setUserCareer(data.career);
  } 

  useEffect(() => 
  {
    SetPrevVal();
  }, [data]);

  useEffect(() => 
  {
    if (editMode) SetPrevVal();
  }, [editMode]);


  const changeEditMode = () =>
  {
      setEditMode(!editMode);
  }

  const sendChanges = async () =>
  {
    const selfInfo = apiPath.UpdateUser;
    const data = {
      name: userName,
      surname: userSurname,
      phone: userPhone,
      twoFactorAuth: user2FA,
      state: userState,
      city: userCity,
      religion: userReligion,
      sex: userSex,
      birthdate: userBirthday,
      education: userEducation,
      career: userCareer,
    }

    try
    {
        var token = GetFromStorage(accessTokenTag);
        const response = await PrivateAPI.put(selfInfo, data,
          {
              headers: { Authorization: `Bearer ${token}` },
          }
        );
        
        consoleLog("update status:" + response.data);
        NotificationManager.success("Údaje byly úspěšně změněny", "Změna profilu", 4000);
        changeEditMode();
        refresh();
    }
    catch (err)
    {
        NotificationManager.error("nelze načíst data", "BaseInfo()", 10000);
        consoleLog("topNav error: " + err);
    }
  }

  const Get2FAMethods = async () =>
  {
    try
    {
      const path = apiPath.MFAMethods.path; 
      const response = await PublicAPI.get(path);
      ConsoleOut(consoleType.log, fileName, "get mfa" + response.data);
      SetMfaTypes(response.data);
    }
    catch (err)
    {
        NotificationManager.error("nelze načíst typy 2FA", "Get2FAMethods()", 10000);
        consoleLog("topNav error: " + err);
    }
  }

  useEffect(() => 
  {
    Get2FAMethods();
  }, []);

  const pohlaviMap = (value) => {return value == 0 ? "muž" : value == 1 ? "žena" : "neuvedeno"} 
  const  pohlaviValues = ["Muž", "Žena"];

  return (
    <div className="profile-card">

      <ProfilDataCardInput
        header="Jméno"
        value={userName}
        editMode={editMode} 
        onChange={setUserName} />

      <ProfilDataCardInput 
        header="Příjmení" 
        value={userSurname} 
        editMode={editMode} 
        onChange={setUserSurname} />

      <ProfilDataCardButton 
        header="Email"
        value={data?.email} 
        editMode={editMode} 
        onClick={emailChange} 
        btnVal="Změnit" />

      <ProfilDataCardInput 
        header="Telefon" 
        value={userPhone} 
        editMode={editMode} 
        onChange={setUserPhone} />

      <ProfilDataCardSelect 
        header="2FA" 
        editMode={editMode} 
        selected={user2FA == null ? "" : user2FA} 
        value={user2FA == null ? "žádné" : user2FA} 
        values={mfaTypes}
        onChange={setUser2FA} />

      <ProfilDataCardInput 
        header="Stát" 
        value={userState} 
        editMode={editMode} 
        onChange={setUserState} />

      <ProfilDataCardInput 
        header="Město" 
        value={userCity} 
        editMode={editMode} 
        onChange={setUserCity} />

      <ProfilDataCardSelect 
        header="Pohlaví" 
        editMode={editMode} 
        selected={userSex} 
        value={pohlaviMap(userSex)} 
        values={pohlaviValues}
        onChange={setUserSex} />

      <ProfilDataCardCalendar 
        header="Datum narození"
        editMode={editMode}
        value={ConvertDate(userBirthday)}
        dival={new Date(userBirthday).toLocaleDateString()}
        max={(new Date()).getDate()}
        onChange={setUserBirthday}
      />

      <ProfilDataCardInput 
        header="Náboženské vyznání" 
        value={userReligion} 
        editMode={editMode} 
        onChange={setUserReligion} />
      
      <ProfilDataCardInput 
        header="Dosažené vzdělání" 
        value={userEducation} 
        editMode={editMode} 
        onChange={setUserEducation} />
      
      <ProfilDataCardInput 
        header="Profese" 
        value={userCareer} 
        editMode={editMode} 
        onChange={setUserCareer} />
      
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
