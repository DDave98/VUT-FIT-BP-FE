import { useEffect, useState } from "react";
import DetailDataRow from "./DetailDataRow";
import "./DetailRow.css";

const DetailDataRowInput = ({header, value, required = false, editMode = false, onChange, expresion}) =>
{
    const [valid, setValid] = useState(true);
    const [state, setState] = useState("");
    const [color, setColor] = useState("")

    const handlChange = (e) =>
    {
        var test = true;
        const val = e.target.value;
        setState(() => val);
        onChange(() => val);

        if (expresion != undefined)
            test = expresion?.test(value);

        const reTest1 = test && required == true && value.lenght > 0;
        const reTest2 = test &&  required == false;
        setValid(reTest1 || reTest2);
    }

    useEffect(() => 
    {   // prvnotní inicializace
        setState(value);
    }, []);

    const editElement = <input 
        className={"DetailDataRowInput" + color} 
        type="text" value={state} 
        onChange={handlChange} required={required} />

    const showElement = <p className="DetailDataRowText">{value}</p>
    
    return (
        <DetailDataRow header={header}>
            {editMode ? editElement : showElement}
            {editMode && required ? "*" : ""}
        </DetailDataRow>
    );
}

export default DetailDataRowInput;