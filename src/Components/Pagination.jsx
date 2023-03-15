import PropTypes from 'prop-types';
import { Pagination as PaginationUi } from 'semantic-ui-react';
//import "../Styles/Pagination.css";

const Pagination = (
{
    totalPages,
    disabled,

}) =>
{
    return (
        <div className='PaginationContainer'>
            <div className='PaginationItem'>
                <PaginationUi
                    boundaryRange={0}
                    siblingRange={2}
                    defaultActivePage={1}
                    ellipsisItem={null}
                    totalPages={totalPages ?? 1}
                    onPageChange={""}
                    disabled={disabled ?? false}
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