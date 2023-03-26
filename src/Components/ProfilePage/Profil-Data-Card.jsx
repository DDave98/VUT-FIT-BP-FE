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

  const [userName, setUserName] = useState(editData.name);
  const [userSurname, setUserSurname] = useState(editData.surname);
  const [userPhone, setUserPhone] = useState(editData.phone);
  const [user2FA, setUser2FA] = useState(editData.twoFactorAuth);
  const [userState, setUserState] = useState(editData.state);
  const [userCity, setUserCity] = useState(editData.city);
  const [userReligion, setUserReligion] = useState(editData.religion);
  const [userSex, setUserSex] = useState(editData.sex);
  const [userBirthday, setUserBirthday] = useState(editData.birthdate);
  const [userEducation, setUserEducation] = useState(editData.education);
  const [userCareer, setUserCareer] = useState(editData.career);

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

      <ProfilDataCardInput 
        header="2FA" 
        value={user2FA != "none" ? "Ano" : "Ne"} 
        editMode={editMode} 
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
