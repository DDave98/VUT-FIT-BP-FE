import PropTypes from "prop-types";
import { useState, useEffect } from 'react';

const ProfilDataCardInput = ({value, header, editMode, onChange}) =>
{

  const [val, setVal] = useState(value);

  const valueChange = (newVal) =>
  {
    setVal(newVal.target.value);
    onChange(newVal.target.value);
  }

  // effect runs on component mount
  useEffect(() => 
  {
    setVal(value);
  }, [value]);

  return (
    <>
        <div className="cardLine">
        <h6>{header}</h6>
            {
                editMode ? 
                <div className="cardLineData">{val}</div>
                :<input type="text" value={val} required onChange={(e) => valueChange(e)}/>
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
