import PropTypes from 'prop-types';
import "../Styles/BreakLine.css";

const BreakLine = ({id, children}) =>
{
    return <>
        <div id={id} className="breakLine">
            <div className="breakLineLeft"></div>
            <span className="breakLineText">{children}</span>
            <div className="breakLineRight"></div>
        </div>
    </>
}

BreakLine.propTypes = {
    id: PropTypes.string,
}

export default BreakLine;