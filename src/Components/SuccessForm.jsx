import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import FormPageLayout from '../Components/FormPageLayout';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import "../Styles/SuccessForm.css"

const SuccessForm = ({LinkPath, title, buttonText}) =>
{

    return (
        <FormPageLayout name={title}>
            <FontAwesomeIcon icon={faCheck} className="SuccessFormIcon"/>
            <div className="flex items-baseline justify-between mb-6 text-center">
            <Link to={LinkPath} className="SuccessFormButton" >{buttonText}</Link>
            </div>
        </FormPageLayout>

    );
}

SuccessForm.propTypes = 
{
    LinkPath: PropTypes.string,
    title: PropTypes.string
}

export default SuccessForm;