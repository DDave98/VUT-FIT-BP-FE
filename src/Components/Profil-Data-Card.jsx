import PropTypes from "prop-types";
import { useState, useEffect } from 'react';
import { telRegex } from "../Constants/regex";
//import "../Styles/PerPage.css";

/// funkce komponenta, která představuje pravou stranu stránky profil
/// přijme objekt získaný od serveru
const ProfilDataCard = ({data}) => {

    const [editMode, setEditMode] = useState(true);

    const changeEditMode = () =>
    {
        setEditMode(!editMode);
    }

    const ChangeDateFormat = (date) =>
    {
      let newDate = new Date(date);
      let newnew = newDate.getFullYear() + "-" + newDate.getMonth().toPrecision(2) + "-11";
      console.log("aaaaaaaaa", newnew);
      return newnew;
    }

  return (
    <div className="profile-card">
      <div className="cardLine">
        <h6 className="">Jméno</h6>
        {
            editMode ? 
            <div className="cardLineData">{data?.name}</div>
            :<input type="text" value={data?.name} required/>
        }
      </div>
      <hr />

      <div className="cardLine">
        <h6 className="">Příjmení</h6>
        {
            editMode ? 
            <div className="cardLineData">{data?.surname}</div>
            :<input type="text" value={data?.surname} required/>
        }
      </div>
      <hr />

      <div className="cardLine">
        <h6 className="">Email</h6>
        {
            editMode ? 
            <div className="cardLineData">{data?.email}</div>
            :<input type="text" value={data?.email} required />
        }
      </div>
      <hr />

      <div className="cardLine">
        <h6 className="">Telefon</h6>
        {
            editMode ? 
            <div className="cardLineData">{data?.phone}</div>
            :<input type="tel" value={data?.phone} pattern={telRegex}/>
        }
      </div>
      <hr />

      <div className="cardLine">
        <h6 className="">2FA</h6>
        {
            editMode ? 
            <div className="cardLineData">{data?.twoFactorAuth != "none" ? "Ano" : "Ne"}</div>
            :<input type="checkbox" value={data?.twoFactorAuth} disabled/>
        }
      </div>
      <hr />

      <div className="cardLine">
        <h6 className="">Město</h6>
        {
            editMode ? 
            <div className="cardLineData">{data?.city}</div>
            :<input type="input" value={data?.city} />
        }
      </div>
      <hr />

      <div className="cardLine">
        <h6 className="">Stát</h6>
        {
            editMode ? 
            <div className="cardLineData">{data?.state}</div>
            :<input type="text" value={data?.state} />
        }
      </div>
      <hr />

      <div className="cardLine">
        <h6 className="">PSČ</h6>
        {
            editMode ? 
            <div className="cardLineData">{"TODO PSC"}</div>
            :<input type="input" value={"PSC"} />
        }
      </div>
      <hr />

      <div className="cardLine">
        <h6 className="">Pohlaví</h6>
        {
            editMode ? 
            <div className="cardLineData">{data.sex == 0 ? "muž" : data.sex == 1 ? "žena" : "neuvedeno"}</div>
            :<select name="gender" id="gender" onChange={null} select={data.sex}>
                <option value="0">Muž</option>
                <option value="1">Žena</option>
            </select>
        }
      </div>
      <hr />

      <div className="cardLine">
        <h6 className="">Datum narození</h6>
        {
            editMode ? 
            <div className="cardLineData">{new Date(data?.birthdate).toLocaleDateString()}</div>
            :<input type="date" value={ChangeDateFormat(data.birthdate)} max={(new Date()).getDate()} onChange={(e) => (e) => console.log(e.target.value) /*setBirth(e.value)*/} />
        }
      </div>
      <hr />

      <div className="cardLine">
        <h6 className="">Náboženské vyznání</h6>
        {
            editMode ? 
            <div className="cardLineData">{data?.religion == "" ? "-" : data?.religion}</div>
            :<input type="text" value={data?.religion} />
        }
      </div>
      <hr />

      <div className="cardLine">
        <h6 className="">Dosažené vzdělání</h6>
        {
            editMode ? 
            <div className="cardLineData">{"edu"}</div>
            :<input type="text" value={"edu"} />
        }
      </div>
      <hr />

      <div className="cardLine">
        <h6 className="">Profese</h6>
        {
            editMode ? 
            <div className="cardLineData">{"job"}</div>
            :<input type="text" value={"job"} />
        }
      </div>
      <hr />

      <div className="cardLineBottom">
        {
            editMode ?
            <button className="btn-primary btn" onClick={changeEditMode}>
            Upravit
            </button>
            : <>
                <button className="btn-primary btn">
                    Uložit změny
                </button>
                <button className="btn-secondary btn" onClick={changeEditMode}>
                    Zrušit
                </button>
            </>
        }
      </div>
    </div>
  );
};

ProfilDataCard.propTypes = {
  //isabled: PropTypes.bool,
};

export default ProfilDataCard;
