/**
 * layout pro celostránkový formulář
 */

import React  from "react";
import PropTypes from 'prop-types';

const FormPageLayout = ({name , ...props}) =>
{
    return (
        <div className="px-8 py-6 mt-4 mb-4 text-left bg-white shadow-lg xl:w-1/4">
            <h3 className="text-2xl font-bold text-center">{name}</h3>
            <form action="" className="mt-4">
                {props.children}
            </form>
        </div>
    );
}

FormPageLayout.propTypes = 
{
    name: PropTypes.string.isRequired,
}

export default FormPageLayout;