import FormPageLayout from "../../Components/FormPageLayout";
import "./OAuthRejectView.css";

const OAuthRejectView = ({
    errCode = 0,
    errType="",
    message = "",
}) =>
{
    const name = "Autorizační chyba"
    return (
        <div className="OAuthRejectView">
            <FormPageLayout name={name}>
                <h4 className="RejectHeader">Chyba {errCode}: {errType}</h4>
                <p className="RejectDescription">{message}</p>
            </FormPageLayout>
        </div>
    );
}

export default OAuthRejectView;