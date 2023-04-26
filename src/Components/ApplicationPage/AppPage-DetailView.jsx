
import DetailWindow from "../DetailLayout/DetailWindow";
import DetailWindowCard from "../DetailLayout/DetailWindowCard";
import DetailWindowColumn from "../DetailLayout/DetailWindowColumn";
import ButtonSecondary from "../Elements/Buttons/ButtonSecondary";

const AppPageDetailView = ({returnBack}) =>
{
    return (
        <div className="AppPageDetailView">

            <div className="FlexSpaceBetween">
                <div></div>
                <ButtonSecondary text="Zpět na přehled" onClick={returnBack}/>
            </div>

            <DetailWindow>
                <DetailWindowColumn psize="20%" >
                    <DetailWindowCard>
                        Profil Aplikace
                    </DetailWindowCard>
                    <DetailWindowCard>
                        Povolené SSO
                    </DetailWindowCard>
                </DetailWindowColumn>
                <DetailWindowColumn psize="80%" >
                    <DetailWindowCard>
                        Data detailu aplikace
                    </DetailWindowCard>
                </DetailWindowColumn>
            </DetailWindow>
        </div>
    );
}

export default AppPageDetailView;