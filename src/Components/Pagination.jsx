import PropTypes from 'prop-types';
import { useState } from 'react';
import { useEffect } from 'react';
import { act } from 'react-dom/test-utils';
import { Pagination as PaginationUi } from 'semantic-ui-react';
//import "../Styles/Pagination.css";

const Pagination = (
{
    totalPages = 1,
    disabled = false,
    actualPage,
    onChange
}) =>
{
    const [actualState, setState] = useState(1);

    const checkState = (newVal) =>
    {
        if (newVal <= 0 || newVal > totalPages) 
        {
            console.error("Pagination | hodnota mimo rozsah:", newVal);
            return false;
        }
        else return true;
    }

    const handlChange = (e) =>
    {
        switch(e.target.text)
        {
            case '⟨': 
                if (checkState(actualState - 1))
                    setState(actualState - 1);
                break;

            case "«":
                setState(1);
                break;

            case '⟩': 
                if (checkState(actualState + 1))
                    setState(actualState + 1);
                break;
                
            case "»": 
                setState(totalPages);
                break;

            default: // číslo
                setState(Number(e.target.text));
                break;
        }
    }

    useEffect(() => 
    {
        onChange(actualState);
    }, [actualState]);

    useEffect(() => 
    {   // v případě změny stránky z default
       setState(actualPage);
    }, []);

    return (
        <div className='PaginationContainer'>
            <div className='PaginationItem'>
                <PaginationUi
                    boundaryRange={0}           // viditelná na začátku a na konci
                    siblingRange={2}            // počet možných sourozenců
                    defaultActivePage={1}       // výchozí aktivní
                    ellipsisItem={null}         //
                    totalPages={totalPages}     // celkový poočet stran
                    onPageChange={handlChange}  // změna stránky
                    disabled={disabled}         // vypnutí
                    activePage={actualPage}     // aktivní stránka
                />
            </div>
        </div>
    )
}

Pagination.propTypes = 
{
    disabled: PropTypes.bool,
    totalPages: PropTypes.number
}

export default Pagination;