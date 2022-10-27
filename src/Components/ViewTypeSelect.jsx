import PropTypes from 'prop-types';
import "../Styles/ViewTypeSelect.css";

const ViewTypeSelect = (
{
}) =>
{

    return (
        <div className='ViewTypeSelect'>
            {'Typ zobrazení: '}
            <div className='VTSbutton'>
                <input type="radio" id="radio1" name="radios" value="all" className='VTSinput' checked />
                <label for="radio1" className='VTSlabel'>Inline</label>
            </div>
            <div className='VTSbutton'>
                <input type="radio" id="radio2" name="radios"value="false" className='VTSinput' />
                <label for="radio2" className='VTSlabel'>Block</label>
            </div>
        </div>
    )
}

ViewTypeSelect.propTypes = 
{

}

export default ViewTypeSelect;