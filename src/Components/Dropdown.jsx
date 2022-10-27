import { Dropdown as DropdownUI } from 'semantic-ui-react'
import PropTypes from 'prop-types';

const Dropdown = (
{

}) =>
{
  const options = [
    { key: 'aplikace 1', value: 'aplikace 1', text: 'aplikace 1'},
    { key: 'aplikace 2', value: 'aplikace 2', text: 'aplikace 2'},
    { key: 'aplikace 3', value: 'aplikace 3', text: 'aplikace 3'},
  ]

  const handleChange = (e, { value }) => 
  {
    console.log("dropdown: ", value);
  }

    return (
        <>
          <DropdownUI
            placeholder='Aplikace'
            icon='filter'
            floating
            labeled
            button
            search
            className='icon'
            defaultValue={options[0].value}
            options={options}
        />
      </>
    )
}

Dropdown.propTypes = 
{
    //setOnSuccess: PropTypes.func.isRequired,
}

export default Dropdown;