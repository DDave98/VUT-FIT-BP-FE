import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useState } from 'react';
//import "../Styles/PerPage.css";

const PerPage = (
{
    disabled = false,
    onChange
}) =>
{
    const options = [
        {text: "10", value: 10},
        {text: "20", value: 20},
        {text: "50", value: 50},
        {text: "100", value: 90},
    ]

    const [actualState, setState] = useState(10);


    const handlChange = (e) =>
    {
        console.log(Number(e.target.value));
        setState(Number(e.target.value));
    }

    useEffect(() => 
    {
        onChange(actualState);
    }, [actualState]);

    return (
    <div className="sorting-dropdown">
        <label htmlFor="cars">počet na stránku:</label>
        <select name="cars" id="cars" value={actualState} onChange={handlChange}>
        {
            options.map((option) => (
                <option  key={option.value}  value={option.value}>
                    {option.text}
                </option>
            ))
        }
        </select>
    </div>
    )
}

PerPage.propTypes = 
{
    disabled: PropTypes.bool,
}

export default PerPage;