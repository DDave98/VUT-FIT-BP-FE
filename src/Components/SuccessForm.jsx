import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import FormPageLayout from '../Components/FormPageLayout';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const SuccessForm = ({LinkPath, title, buttonText}) =>
{

    const buttonStyleClass = "px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900 w-full disabled:opacity-50 disabled:bg-gray-400";
    const iconStyle = "m-auto p-10 text-2xl font-bol w-20 h-20 mb-8 mt-16 border-solid border-2 border-green-600 rounded-full block text-green-600";

    return (
        <FormPageLayout name={title}>
            <FontAwesomeIcon icon={faCheck} className={iconStyle}/>
            <div className="flex items-baseline justify-between mb-6 text-center">
            <Link to={LinkPath} className={buttonStyleClass} >{buttonText}</Link>
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