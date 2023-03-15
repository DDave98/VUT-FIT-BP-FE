import PropTypes from 'prop-types';
//import "../Styles/PerPage.css";

const PerPage = (
{
    disabled,

}) =>
{
    const options = [
        {key: 10, text: 10, value: 10},
        {key: 30, text: 30, value: 30},
        {key: 50, text: 50, value: 50},
        {key: 90, text: 90, value: 90},
    ]

    return (
    <div className="sorting-dropdown">
        {/*<div className='PerPageContainer w-full'>
            {'Zobrazit na stránku: '}
            <DropdownUI
                compact
                selection
                options={options}
                defaultValue={options[0].value}
                disabled={disabled ?? false}
            />
    </div>*/}
    <label for="cars">počet na stránku:</label>
    <select name="cars" id="cars">
        <option value="opel">10</option>
        <option value="volvo">20</option>
        <option value="saab">50</option>
        <option value="saab">100</option>
    </select>
    </div>
    )
}

PerPage.propTypes = 
{
    disabled: PropTypes.bool,
}

export default PerPage;