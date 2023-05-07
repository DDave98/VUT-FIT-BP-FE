import Applogo from "../../../Assets/Images/socialIcons/web.bmp";
import "./StackElement.css";

const StackElement = ({children}) =>
{
    return (
        <div className="StackElement">
            {children}
        </div>
    )
}

const StackElementLine= ({logoPath = Applogo, header = "header", text = "txt"}) =>
{
    return (
        <div className="StackElementLine">
            <img src={logoPath} className="ElementLineLogo" />
            <div className="StackLineContent">
                <h3 className="StackLineContentHeader">{header}</h3>
                <p className="StackLineContentText">{text}</p>
            </div>
        </div>
    )
}

export { StackElement, StackElementLine}