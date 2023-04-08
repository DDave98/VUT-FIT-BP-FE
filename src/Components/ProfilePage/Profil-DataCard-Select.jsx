import { 
  useState, 
  useEffect, 
  PropTypes
} from "./Profile-Import";

const ProfilDataCardSelect = ({header, editMode, value, values, selected, onChange}) =>
{
  return (
    <>
        <div className="cardLine">
        <h6 className="">{header}</h6>
        {
            editMode ? 
            <div className="cardLineData">{value}</div>
            :<select name="gender" id="gender" onChange={(e) => onChange(e.target.value)} select={selected}>
                {
                    values.map((a) => (
                        <option value={a} key={a}>{a}</option>
                    ))
                }
            </select>
        }
      </div>
      <hr />
    </>
  );
};

ProfilDataCardSelect.propTypes = {
  //isabled: PropTypes.bool,
};

export default ProfilDataCardSelect;
