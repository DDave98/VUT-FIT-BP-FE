import { useEffect, useState } from "react";
import "./DropDownSelect.css";

const DropDownSelect = (
{
    name,
    label,
    options = {},
    onSelectedChange
}) =>
{
    const [actualState, setState] = useState(0);


    const handlChange = (e) =>
    {
        //console.log(Number(e.target.value));
        setState(Number(e.target.value));
    }

    useEffect(() => 
    {
        onSelectedChange(actualState);
    }, [actualState]);

    return (
        <>
            {/* <!-- řazeni podle typu --> */}
            <div className="DropDownSelect">
            <label htmlFor={name}>{label}</label>
                <select name={name} value={actualState} onChange={handlChange} id="cars">
                    {
                        Object.keys(options).map((opt) => (
                            <option value={opt} key={opt}>{options[opt]}</option>
                        ))
                    }
                </select>
            </div>
        </>
    )
}

export default DropDownSelect;