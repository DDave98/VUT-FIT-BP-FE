import "./LogoConnection.css";
import AFlogo from "../../../Assets/Images/vut.cz.png";
import Applogo from "../../../Assets/Images/socialIcons/web.bmp";

const LogoConnection = ({
    logoPath = Applogo
}) =>
{
    return (
        <div className="LogoConenction">
            <img className="ConnectLogo" alt="logo" src={logoPath} />
            <div className="ConnectionLine">
                <img alt="success" src="https://cdn.onlinewebfonts.com/svg/img_86348.png" />
            </div>
            <img className="ConnectLogo" alt="logo" src={AFlogo} />
        </div>
    );
}

export default LogoConnection;