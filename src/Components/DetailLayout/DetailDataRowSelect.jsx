import { useEffect } from "react";
import { useState } from "react";
import DetailDataRow from "./DetailDataRow";
import "./DetailRow.css";

const DetailDataRowSelect = ({
    header, value, editMode = false, onChange,
    options, selected
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
        onChange(actualState);
    }, [actualState]);

    useEffect(() => 
    {
        setState(value);
    }, [value]);

    const optionElements = Object.values(options).map((opt) => (
        <option value={opt} key={opt}>{opt}</option>
    ));

    const editElement = (
    <select 
        className="DetailDataRowSelect" 
        onChange={handlChange}
        select={selected}
        value={actualState}>
        {optionElements}
    </select>)

    const showElement = <p className="DetailDataRowText">{value}</p>

    return (
        <DetailDataRow header={header}>
            {editMode ? editElement : showElement}
        </DetailDataRow>
    );
}

export default DetailDataRowSelect;