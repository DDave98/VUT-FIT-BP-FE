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
    actualPage = 1,
    onChange
}) =>
{
    const [actualState, setState] = useState(1);

    const setNewState = (newVal) =>
    {
        if (newVal <= 0 || newVal > totalPages) 
        {
            console.error("Pagination | hodnota mimo rozsah:", newVal);
            setState(1);
        }
        else setState(newVal);
    }

    const handlChange = (e) =>
    {
        switch(e.target.text)
        {
            case '<': 
                setNewState(actualState - 1);
                break;

            case "<<": 
                setNewState(1);
                break;

            case '>': 
                setNewState(actualState + 1);
                break;
                
            case ">>": 
                setNewState(totalPages);
                break;

            default: // číslo
                setNewState(Number(e.target.text));
                break;
        }

        onChange(actualState);
    }

    useEffect(() => 
    {   // v případě změny stránky z default
       setState(actualPage); 
    }, []);

    return (
        <div className='PaginationContainer'>
            <div className='PaginationItem'>
                <PaginationUi
                    boundaryRange={0}
                    siblingRange={2}
                    defaultActivePage={1}
                    ellipsisItem={null}
                    totalPages={totalPages}
                    onPageChange={handlChange}
                    disabled={disabled}
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