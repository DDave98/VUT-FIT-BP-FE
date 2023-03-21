import PropTypes from "prop-types";

/// funkce komponenta, která představuje pravou stranu stránky profil
/// přijme objekt získaný od serveru
const ProfilDataCardEdit = ({editMode, changeEditMode, sendChanges}) =>
{
  return (
    <div className="cardLineBottom">
    {
        editMode ?
        <button className="btn-primary btn" onClick={changeEditMode}>
        Upravit
        </button>
        : <>
            <button className="btn-primary btn" onClick={sendChanges}>
                Uložit změny
            </button>
            <button className="btn-secondary btn" onClick={changeEditMode}>
                Zrušit
            </button>
        </>
    }
  </div>
  );
};

ProfilDataCardEdit.propTypes = {
  //isabled: PropTypes.bool,
};

export default ProfilDataCardEdit;
