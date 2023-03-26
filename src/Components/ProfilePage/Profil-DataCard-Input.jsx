import { 
  useState, 
  useEffect, 
  PropTypes
} from "./Profile-Import";

const ProfilDataCardInput = ({value, header, editMode, onChange}) =>
{
  return (
    <>
        <div className="cardLine">
        <h6>{header}</h6>
            {
                editMode ? 
                <div className="cardLineData">{value}</div>
                :<input type="text" value={value} onChange={(e) => onChange(e.target.value)}/>
            }
        </div>
        <hr />
    </>
  );
};

ProfilDataCardInput.propTypes = {
  //isabled: PropTypes.bool,
};

export default ProfilDataCardInput;
