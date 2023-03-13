import PropTypes from "prop-types";
import { useState, useEffect } from 'react';
import { telRegex } from "../Constants/regex";
//import "../Styles/PerPage.css";

/// funkce komponenta, která představuje pravou stranu stránky profil
/// přijme objekt získaný od serveru
const ProfilRightCard = () => {

    const [editMode, setEditMode] = useState(false);

    /// zatím provizorně
    const [name, setName] = useState("David");
    const [surname, setSurname] = useState("Michalica");
    const [email, setEmail] = useState("fip@jukmuh.al");
    const [tel, setTel] = useState("+420 123 456 789");
    const [MFA, setMFA] = useState(false);
    const [city, setCity] = useState("Brno");
    const [state, setState] = useState("Cze");
    const [PSC, setPSC] = useState("612 00");
    const [gender, setGender] = useState("muž");
    const [birth, setBirth] = useState("13.11.1998");
    const [relig, setRelig] = useState("");
    const [edu, setEdu] = useState("Střední škola s maturitou");
    const [job, setJob] = useState("Programátor");

    const changeEditMode = () =>
    {
        setEditMode(!editMode);
    }

    const handleChange = (e) => 
    {
        setGender(e.target.value);
    }

  return (
    <div className="profile-card">
      <div className="cardLine">
        <h6 className="">Jméno</h6>
        {
            editMode ? 
            <div className="cardLineData">{name}</div>
            :<input type="text" value={name} required/>
        }
      </div>
      <hr />

      <div className="cardLine">
        <h6 className="">Příjmení</h6>
        {
            editMode ? 
            <div className="cardLineData">{surname}</div>
            :<input type="text" value={surname} required/>
        }
      </div>
      <hr />

      <div className="cardLine">
        <h6 className="">Email</h6>
        {
            editMode ? 
            <div className="cardLineData">{email}</div>
            :<input type="text" value={email} required />
        }
      </div>
      <hr />

      <div className="cardLine">
        <h6 className="">Telefon</h6>
        {
            editMode ? 
            <div className="cardLineData">{tel}</div>
            :<input type="tel" value={tel} pattern={telRegex}/>
        }
      </div>
      <hr />

      <div className="cardLine">
        <h6 className="">2FA</h6>
        {
            editMode ? 
            <div className="cardLineData">{MFA ? "Ano" : "Ne"}</div>
            :<input type="checkbox" value={MFA} disabled/>
        }
      </div>
      <hr />

      <div className="cardLine">
        <h6 className="">Město</h6>
        {
            editMode ? 
            <div className="cardLineData">{city}</div>
            :<input type="input" value={city} />
        }
      </div>
      <hr />

      <div className="cardLine">
        <h6 className="">Stát</h6>
        {
            editMode ? 
            <div className="cardLineData">{state}</div>
            :<input type="text" value={state} />
        }
      </div>
      <hr />

      <div className="cardLine">
        <h6 className="">PSČ</h6>
        {
            editMode ? 
            <div className="cardLineData">{PSC}</div>
            :<input type="input" value={PSC} />
        }
      </div>
      <hr />

      <div className="cardLine">
        <h6 className="">Pohlaví</h6>
        {
            editMode ? 
            <div className="cardLineData">{gender}</div>
            :<select name="gender" id="gender" onChange={handleChange} select={gender}>
                <option value="muž">Muž</option>
                <option value="žena">Žena</option>
            </select>
        }
      </div>
      <hr />

      <div className="cardLine">
        <h6 className="">Datum narození</h6>
        {
            editMode ? 
            <div className="cardLineData">{birth}</div>
            :<input type="date" value={birth} max={(new Date()).getDate()} onChange={(e) => setBirth(e.value)} />
        }
      </div>
      <hr />

      <div className="cardLine">
        <h6 className="">Náboženské vyznání</h6>
        {
            editMode ? 
            <div className="cardLineData">{relig == "" ? "-" : relig}</div>
            :<input type="text" value={relig} />
        }
      </div>
      <hr />

      <div className="cardLine">
        <h6 className="">Dosažené vzdělání</h6>
        {
            editMode ? 
            <div className="cardLineData">{edu}</div>
            :<input type="text" value={edu} />
        }
      </div>
      <hr />

      <div className="cardLine">
        <h6 className="">Profese</h6>
        {
            editMode ? 
            <div className="cardLineData">{job}</div>
            :<input type="text" value={job} />
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

ProfilRightCard.propTypes = {
  //isabled: PropTypes.bool,
};

export default ProfilRightCard;
