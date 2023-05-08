import LogoConnection from "../../Components/Elements/logoConnection/LogoConnection";
import { StackElement, StackElementLine } from "../../Components/Elements/StackItems/StackElement";
import { StackItem, StackOfItems } from "../../Components/Elements/StackItems/StackItems";
import FormPageLayout from "../../Components/FormPageLayout";

// ICONS
import PublicIcon from "../../Assets/Images/icons/world.png";
import UserIcon from "../../Assets/Images/Sample_User_Icon.png";

// STYLE
import "./OAuthConfirmView.css";
import SendButton from "../../Components/SendButton";
import { GetUrlParams } from "../../Services/AjaxService";
import { Link } from "react-router-dom";

const OAuthConfirmView = ({
    data = {},
    changeProfile = () => {},
}) =>
{
    const { 
        appName = "App", 
        appLogo = "",
        ownerName = "Jmeno Příjmení",
        userName = "Jméno1 Příjmení1",
        callbackUri = "http://google.com",
        code = "123",
        state = "xyz"
    } = data
    const name = "Autorizace aplikace " + appName;
    
    const HandlSubmit = () =>
    {
        const stateVal = (GetUrlParams()).get("state");
        const state = stateVal ? `&state=${stateVal}` : "";
        const redirectUrl = `${callbackUri}?code=${code}${state}`;
        console.log("redirect-url:", redirectUrl);
        window.location.replace(redirectUrl);
    }
    
    return (
        <div className="OAuthConfirmView">
            <FormPageLayout name={name} handlSubmit={HandlSubmit}>
                <div className="ConfirmIlustration">
                    <LogoConnection logoPath={appLogo == "" ? undefined : 'data:image/png;base64,' + appLogo} />
                </div>
                <StackOfItems>
                        <StackItem>

                            <StackElement>
                                <StackElementLine
                                    logoPath={UserIcon}
                                    header={"Aplikace vlastněná " + ownerName}
                                    text={"chce přistoupit k účtu uživatele " + userName}
                                />
                                <StackElementLine
                                    logoPath={PublicIcon}
                                    header={"Pouze veřejná data"}
                                    text={"omezený přístup k vaším datům"}
                                />
                            </StackElement>
                            
                        </StackItem>


                    </StackOfItems>

                    <div className="OAuthAccount" onClick={changeProfile}>
                        <p>Přihlásit se jiným účtem</p>
                    </div>

                    <SendButton text="Autorizovat aplikaci" />

                    <div className="OAuthRedirect">
                        <p>Po autorizování bude přesměrování na</p>
                        <p className="OAuthRedirect">{callbackUri}</p>
                    </div>



            </FormPageLayout>
        </div>
    );
}

export default OAuthConfirmView;