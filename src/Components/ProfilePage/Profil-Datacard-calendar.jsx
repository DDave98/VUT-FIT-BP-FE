import { 
  useState, 
  useEffect, 
  PropTypes
} from "./Profile-Import";

const ProfilDataCardCalendar = ({header, editMode, value, dival, max, onChange}) =>
{
    const [val, setVal] = useState(value);
    const [valdiv, setValDiv] = useState(dival);

    const valueChange = (newVal) =>
    {
        setVal(newVal.target.value);
        setValDiv(new Date(newVal.target.value).toLocaleDateString());
        onChange(newVal.target.value);
    }

    // effect runs on component mount
    useEffect(() => 
    {
        setVal(value);
        setValDiv(dival);
    }, [value, dival]);

  return (
    <>
        <div className="cardLine">
        <h6 className="">{header}</h6>
        {
            editMode ? 
            <div className="cardLineData">{valdiv}</div>
            :<input 
                type="date"
                value={value}
                max={max}
                onChange={(e) => valueChange(e)} 
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
