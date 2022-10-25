import { externalLoginPath } from '../Constants/externalLoginPath';
import PropTypes from 'prop-types';
import "../Styles/SocialIconPanel.css";
import SocialIcon from './SocialIcon';

const SocialIconPanel = ({disabled}) =>
{
    return (
        <>
            <div
                disabled = {disabled} 
                id = 'loginSocialIcons'
                className = "SocialIconPanel"
            >
                {
                    externalLoginPath.map(({url, api}) => (
                        <SocialIcon
                            src={url}
                            name={api}
                        />
                    ))
                }
            </div>
        </>
    )
}

SocialIconPanel.propTypes = 
{
    disabled: PropTypes.bool,
}

export default SocialIconPanel;