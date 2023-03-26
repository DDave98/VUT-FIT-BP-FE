import { 
  useState, 
  useEffect, 
  PropTypes
} from "./Profile-Import";

const ProfilDataCardCalendar = ({header, editMode, value, dival, max, onChange}) =>
{
  return (
    <>
        <div className="cardLine">
        <h6 className="">{header}</h6>
        {
            editMode ? 
            <div className="cardLineData">{dival}</div>
            :<input 
                type="date"
                value={value}
                max={max}
                onChange={(e) => onChange(e.target.value)} 
            />
        }
      </div>
      <hr />
    </>
  );
};

ProfilDataCardCalendar.propTypes = {
  //isabled: PropTypes.bool,
};

export default ProfilDataCardCalendar;
