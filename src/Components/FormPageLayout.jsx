/**
 * layout pro celostránkový formulář
 */


import PropTypes from 'prop-types';

const FormPageLayout = ({name, handlSubmit, ...props}) =>
{
    const handlSubmitEvent = async (e) => {
        e.preventDefault();
        handlSubmit?.();
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="px-8 py-6 mt-4 mb-4 text-left bg-white shadow-lg xl:w-1/4">
                <h3 className="text-2xl font-bold text-center">{name}</h3>
                <form onSubmit={handlSubmitEvent} className="mt-4">
                    {props.children}

                </form>
            </div>
        </div>
    );
}

FormPageLayout.propTypes = 
{
    name: PropTypes.string,
    handlSubmit: PropTypes.func,
}

export default FormPageLayout;