import "./DropDownSelect.css";

const DropDownSelect = (
{
    name,
    label,
    options = {},
    onSelectedChange
}) =>
{
    return (
        <>
            {/* <!-- řazeni podle typu --> */}
            <div className="DropDownSelect">
            <label for={name}>{label}</label>
                <select name={name} id="cars">
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