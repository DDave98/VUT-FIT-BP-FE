import PropTypes from 'prop-types';
import "../Styles/Modal-Detail.css";

const ModalDetail = (
    { show, onClose, header, children }) =>
{

    const modalClass = show ? "modal" : "modalHide";

    const handleClose = () => 
    {
        onClose();
    };

    return (
        <>
            {/*<!-- The Modal -->*/}
            <div id="myModal" className={modalClass}>

                {/* <!-- Modal content --> */}
                <div className="modal-content">

                    <div className="modal-header">
                        <span className="close" onClick={handleClose}>
                            &times;
                        </span>
                        <h2>{header}</h2>
                    </div>

                    <div className="modal-body">

                    <div className="modal-body-content">

                        <div className="modal-info">

                        <div className="modal-info-left">
                            <div className="modal-oneline">
                            <h5>website:</h5>
                            <div>Ano</div>
                            </div>

                            <div className="modal-oneline">
                            <h5>Github:</h5>
                            <div>Ne</div>
                            </div>
                            
                            <div className="modal-oneline">
                            <h5>Twitter:</h5>
                            <div>Ne</div>
                            </div>

                            <div className="modal-oneline">
                            <h5>Instagram:</h5>
                            <div>Ne</div>
                            </div>

                            <div className="modal-oneline">
                            <h5>Facebook:</h5>
                            <div>Ne</div>
                            </div>

                            <div className="modal-oneline">
                            <label>Účet blokován: </label>
                            <input type="checkbox" disabled checked/>
                            </div>

                        </div>
                        
                        <div className="modal-info-right">
                            
                            <div className="modal-info-line modal-oneline">
                            <h5>Uživatelská role:</h5>
                            <div>Uživatel</div>
                            </div>

                            <div className="modal-info-line modal-oneline">
                            <h5>E-mail:</h5>
                            <div>Jméno Příjmení</div>
                            </div>

                            <div className="modal-info-line modal-oneline">
                            <h5>Telefon:</h5>
                            <div>(239) 816-9029 </div>
                            </div>

                            <div className="modal-info-line modal-oneline">
                            <h5>2FA:</h5>
                            <div>Ne</div>
                            </div>

                            <div className="modal-info-line modal-oneline">
                            <h5>Město:</h5>
                            <div>Brno</div>
                            </div>

                            <div className="modal-info-line modal-oneline">
                            <h5>Stát:</h5>
                            <div>Cze</div>
                            </div>

                            <div className="modal-info-line modal-oneline">
                            <h5>PSČ:</h5>
                            <div>612 00</div>
                            </div>

                            <div className="modal-info-line modal-oneline">
                            <h5>Pohlaví:</h5>
                            <div>Muž</div>
                            </div>

                            <div className="modal-info-line modal-oneline">
                            <h5>Narození:</h5>
                            <div>13. 11. 1998</div>
                            </div>

                            <div className="modal-info-line modal-oneline">
                            <h5>Vyznání:</h5>
                            <div>-</div>
                            </div>

                            <div className="modal-info-line modal-oneline">
                            <h5>vzdělání:</h5>
                            <div>Střední škola s maturitou </div>
                            </div>

                            <div className="modal-info-line modal-oneline">
                            <h5>Profese:</h5>
                            <div>Programátor</div>
                            </div>

                        </div>

                        </div>

                    </div>

                    </div>

                    <div className="modal-footer">
                    </div>

                </div>

                </div>
        </>
    )
}

ModalDetail.propTypes = 
{
 //   disabled: PropTypes.bool,
}

export default ModalDetail;