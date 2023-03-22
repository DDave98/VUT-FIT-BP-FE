import PropTypes from 'prop-types';
import "../Styles/Modal-Detail.css";

const ModalWindow = (
    { show, onClose, header, children }) =>
{

    const modalClass = show ? "modal" : "modalHide";

    return (
        <>
            {/*<!-- The Modal -->*/}
            <div id="myModal" className={modalClass}>

                {/* <!-- Modal content --> */}
                <div className="modal-content">

                    <div className="modal-header">
                        <span className="close" onClick={onClose}>
                            &times;
                        </span>
                        <h2>{header}</h2>
                    </div>

                    <div className="modal-body">
                        <div className="modal-body-content">
                            {children}
                        </div>
                    </div>

                    <div className="modal-footer">
                    </div>

                </div>

                </div>
        </>
    )
}

ModalWindow.propTypes = 
{
 //   disabled: PropTypes.bool,
}

export default ModalWindow;