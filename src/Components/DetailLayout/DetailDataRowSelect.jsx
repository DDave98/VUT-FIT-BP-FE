import DetailDataRow from "./DetailDataRow";
import "./DetailRow.css";

const DetailDataRowSelect = ({
    header, value, editMode = false, onChange,
    options, selected
}) =>
{
    const optionElements = options?.map((a) => (
        <option value={a} key={a}>{a}</option>
    ));

    const editElement = (
    <select 
        className="DetailDataRowSelect" 
        onChange={(e) => onChange(e.target.value)} 
        select={selected}>
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