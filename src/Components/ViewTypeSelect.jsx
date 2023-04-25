import PropTypes from 'prop-types';
import { Icon } from 'semantic-ui-react'
import "../Styles/ViewTypeSelect.css";

const ViewTypeSelect = ({setShowType}) =>
{

    return (
        <div className='ViewTypeSelect'>
            <div className='VTSbutton' onClick={() => setShowType(true)}>
                <input type="radio" id="radio1" name="radios" value="all" className='VTSinput' checked />
                <label for="radio1" className='VTSlabel'>
                    <Icon name='bars' fitted />
                </label>
            </div>
            <div className='VTSbutton' onClick={() => setShowType(false)}>
                <input type="radio" id="radio2" name="radios"value="false" className='VTSinput' />
                <label for="radio2" className='VTSlabel'>
                    <Icon name='th' fitted />
                </label>
            </div>
        </div>
    )
}

ViewTypeSelect.propTypes = 
{

}

export default ViewTypeSelect;