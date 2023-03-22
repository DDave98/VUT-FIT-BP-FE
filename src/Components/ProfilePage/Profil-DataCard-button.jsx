import PropTypes from "prop-types";
import { useState, useEffect } from 'react';
import "../../Styles/ProfilePageStyles/Profile-DataCard-button.css"

const ProfilDataCardButton = ({value, header, editMode, onClick, btnVal}) =>
{
  return (
    <>
        <div className="cardLine">
        <h6>{header}</h6>
            {
                editMode ? 
                <div className="cardLineData">{value}</div>
                :<button className="cardLine-button" onClick={onClick}>
                    {btnVal}
                </button>
            }
        </div>
        <hr />
    </>
  );
};

ProfilDataCardButton.propTypes = {
  //isabled: PropTypes.bool,
};

export default ProfilDataCardButton;
