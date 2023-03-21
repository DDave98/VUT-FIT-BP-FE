import PropTypes from "prop-types";
import { useState, useEffect } from 'react';

const ProfilDataCardSelect = ({header, editMode, value, values, selected, onChange}) =>
{
    const [sel, setVal] = useState(selected);

    const valueChange = (newVal) =>
    {
      setVal(newVal.target.value);
      onChange(newVal.target.value);
    }
  
    // effect runs on component mount
    useEffect(() => 
    {
      setVal(selected);
    }, [selected]);

  return (
    <>
        <div className="cardLine">
        <h6 className="">{header}</h6>
        {
            editMode ? 
            <div className="cardLineData">{value}</div>
            :<select name="gender" id="gender" onChange={(e) => valueChange(e)} select={sel}>
                {
                    values.map((a) => (
                        <option value={a.value} key={a.value}>{a.name}</option>
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
