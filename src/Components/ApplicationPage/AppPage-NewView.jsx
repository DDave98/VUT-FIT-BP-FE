import { useEffect } from "react";
import { useState } from "react";
import { usePublicApi } from "../../Hooks/usePublicAPI";
import { GetIcoByName } from "../../Services/GeneralFunctions";
import DetailDataRow from "../DetailLayout/DetailDataRow";
import DetailWindow from "../DetailLayout/DetailWindow";
import DetailWindowCard from "../DetailLayout/DetailWindowCard";
import DetailWindowColumn from "../DetailLayout/DetailWindowColumn";
import ButtonSecondary from "../Elements/Buttons/ButtonSecondary";
import DropDownSelect from "../Elements/DropDownSelect/DropDownSelect";
import ProfilePhoto from "../Elements/ProfilePhoto/ProfilePhoto";
import SocialProfileCheckBox from "../Elements/SocialProfileStatus/SocialProfileCheckBox";
import { StackItem, StackOfItems } from "../Elements/StackItems/StackItems";
import { apiPath } from "../ProfilePage/Profile-Import";

const AppPageNewView = ({returnBack}) =>
{
    const [photo, setPhoto] = useState(null);
    const [provider, setProvider] = useState([]);
    const [checkboxes, setCheckboxes] = useState(<></>);
    const [SendRequest, GenerateParams, GenerateError] = usePublicApi();

    const onClickHandler = () =>
    {
        var val = window.confirm("Opravdu chcete opustit stánku?\nPřípadné změny nebudou uložené");
        if (val) returnBack();
    }

    const GenerateChaceboxes = () =>
    {
        const components = Object.keys(provider).length == 0 ? <></> : 
        provider.map((obj, num) => (
            <StackItem key={num}>
                <SocialProfileCheckBox 
                    isChecked={obj.allowed}
                    onChange={onCheckBoxChange}
                    val={obj.name}
                >
                    {GetIcoByName(obj.name)}
                    {obj.name}
                </SocialProfileCheckBox>
            </StackItem>
        ));

        setCheckboxes(components);
    }

    const onCheckBoxChange = (e) =>
    {
        const name = e.target.value;        
        const change = provider;
        change.forEach(obj => obj.allowed = obj.name == name ? !obj.allowed : obj.allowed);
        setProvider(() => change);
        GenerateChaceboxes();
    }

    const loadSocialAccount = async () =>
    {
        // načíst všechny providery + co má uživatel přihlášené
        const errorMessage = "Chyba při načístání providerů";
        const errorTitle = "Nelze načíst providery";
        const error = GenerateError(errorMessage, errorTitle);
        const params = GenerateParams(apiPath.providerPaths.allProviders);
        const response = await SendRequest(params, error);
        if(response != undefined) 
        {
            const providerList = response.data.map((o) => 
            ({
                name: o.name, 
                allowed: true
            }));
    
            setProvider(() => providerList);
            GenerateChaceboxes();
        }
    }

    const loadApplicationTypes = async () =>
    {

    }

    useEffect(() => 
    {
        loadSocialAccount();
    }, []);

    useEffect(() => 
    {
        GenerateChaceboxes();
    }, [provider]);

    return (
        <div className="AppPageNewView">

            <div className="FlexSpaceBetween">
                <div></div>
                <ButtonSecondary text="Zpět na přehled" onClick={onClickHandler}/>
            </div>

            <DetailWindow>
                <DetailWindowColumn psize="30%" >

                    <DetailWindowCard>
                        <ProfilePhoto src={photo} alt="Profilová fotka" />
                        <div className="FlexSpaceBetween">
                            <ButtonSecondary text="Změnit fotku" onClick={null} />
                        </div>
                    </DetailWindowCard>

                    <DetailWindowCard>
                        <StackOfItems>
                        {
                            checkboxes
                        }
                        </StackOfItems>
                    </DetailWindowCard>

                </DetailWindowColumn>

                <DetailWindowColumn psize="70%" >
                    <DetailWindowCard>
                        <DetailDataRow header={"Jméno:"}>
                            <input type="text" />
                        </DetailDataRow>
                        <DetailDataRow header={"Doména:"}>
                            <input type="text" />
                        </DetailDataRow>
                        <DetailDataRow header={"Typ:"}>

                        </DetailDataRow>
                        <DetailDataRow header={"Viditelnost:"}>

                        </DetailDataRow>

                    </DetailWindowCard>
                </DetailWindowColumn>
            </DetailWindow>
        </div>
    );
}

export default AppPageNewView;