/**
 * tato koponenta představuje submit, při stihnutí se zapne loading mode
 * rodičovský element tuto funkci může zapnout či vypnout
 */

import PropTypes from 'prop-types';
import Loader from './Loader';

const SendButton = (
{
    disabled = false, 
    text = "submit", 
    loadMode = false
}) =>
{
    const submitButtonStyle = "flex items-baseline justify-between mb-6 mt-2";
    const buttonStyleClass = "px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900 w-full disabled:opacity-50 disabled:bg-gray-400";
    const loaderDivStyle = "m-auto mt-2";
    return (
        <div className={submitButtonStyle}>
            {
                loadMode ? 
                <div className={loaderDivStyle}>
                    <Loader />
                </div> :
                <button
                    className={buttonStyleClass}
                    disabled={disabled}
                >
                    {text}
                </button>
            }
        </div>
    );
}

SendButton.propTypes = 
{
    text: PropTypes.string,
    disabled: PropTypes.bool,
    loadMode: PropTypes.bool
}

export default SendButton;