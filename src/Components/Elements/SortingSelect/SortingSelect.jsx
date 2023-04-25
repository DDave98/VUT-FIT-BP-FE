import DropDownSelect from "../DropDownSelect/DropDownSelect";
import "./SortingSelect.css";

const SortingSelect = (
{
    options,
    setSelected,
    setDirection 
}) =>
{
    console.log(options);
    return (
        <div className="SortingSelect">
            {/* <!-- řazeni podle sloupce --> */}
            <DropDownSelect 
                options={options}
                label="Řadit podle:"
                onSelectedChange={setSelected}
                name="AppColumnSelect"
                />
        </div>
    );
}

export default SortingSelect;