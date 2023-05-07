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

const OAuthConfirmView = ({
    data = {},
}) =>
{
    const { appName = "App", appUrl = "http://google.com" } = data
    const name = "Autorizace aplikace " + appName;
    
    const HandlSubmit = () =>
    {

    }
    
    return (
        <div className="OAuthConfirmView">
            <FormPageLayout name={name} handlSubmit={HandlSubmit}>
                <div className="ConfirmIlustration">
                    <LogoConnection logoPath={undefined} />
                </div>
                <StackOfItems>
                        <StackItem>

                            <StackElement>
                                <StackElementLine
                                    logoPath={UserIcon}
                                    header={"Aplikace vlastněná Uživatelem"}
                                    text={"chce přistoupit k účtu uživatele Jméno Příjmení"}
                                />
                                <StackElementLine
                                    logoPath={PublicIcon}
                                    header={"Pouze veřejná data"}
                                    text={"omezený přístup k vaším datům"}
                                />
                            </StackElement>
                            
                        </StackItem>


                    </StackOfItems>

                    <SendButton text="Autorizovat aplikaci" />

                    <div className="OAuthRedirect">
                        <p>Po autorizování bude přesměrování na</p>
                        <p className="OAuthRedirect">{appUrl}</p>
                    </div>

            </FormPageLayout>
        </div>
    );
}

export default OAuthConfirmView;