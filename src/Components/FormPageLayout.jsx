/**
 * layout pro celostránkový formulář
 */

import PropTypes from 'prop-types';
import "../Styles/FormPagelayout.css";

const FormPageLayout = ({name, handlSubmit, ...props}) =>
{
    const handlSubmitEvent = async (e) => {
        e.preventDefault();
        await handlSubmit?.();
    }

    return (
        <div className="FormPagelayout">
            <div className="FormPagelayoutWindow">
                <h3 className="FormPagelayoutHeader">{name}</h3>
                <form 
                    onSubmit={handlSubmitEvent}
                    className="FormPagelayoutForm"
                >
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