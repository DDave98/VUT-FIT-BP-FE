import PropTypes from 'prop-types';

const BreakLine = ({id, children}) =>
{
    return <>
        <div id={id} className="relative flex py-5 items-center">
            <div className="flex-grow border-t border-gray-400"></div>
            <span className="flex-shrink mx-4 text-gray-400">{children}</span>
            <div className="flex-grow border-t border-gray-400"></div>
        </div>
    </>
}

BreakLine.propTypes = {
    id: PropTypes.string,
}

export default BreakLine;