import PropTypes from 'prop-types';
//import "../Styles/MatchCounter.css";

const MatchCounter = (
{
    count
}) =>
{

    return (
        <div className='MatchCounterContainer inline-block w-full'>
            {'Počet výsledků: '}{count}
        </div>
    )
}

MatchCounter.propTypes = 
{
    count: PropTypes.number,
}

export default MatchCounter;