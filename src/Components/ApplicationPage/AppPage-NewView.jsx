import { useEffect } from "react";
import { useState } from "react";
import { domainRegex } from "../../Constants/regex";
import { usePublicApi } from "../../Hooks/usePublicAPI";
import { GetIcoByName } from "../../Services/GeneralFunctions";
import DetailControlRow from "../DetailLayout/DetailControlRow";
import DetailDataRow from "../DetailLayout/DetailDataRow";
import DetailDataRowInput from "../DetailLayout/DetailDataRowInput";
import DetailDataRowSelect from "../DetailLayout/DetailDataRowSelect";
import DetailWindow from "../DetailLayout/DetailWindow";
import DetailWindowCard from "../DetailLayout/DetailWindowCard";
import DetailWindowColumn from "../DetailLayout/DetailWindowColumn";
import ButtonSecondary from "../Elements/Buttons/ButtonSecondary";
import DropDownSelect from "../Elements/DropDownSelect/DropDownSelect";
import ProfilePhoto from "../Elements/ProfilePhoto/ProfilePhoto";
import SocialProfileCheckBox from "../Elements/SocialProfileStatus/SocialProfileCheckBox";
import { StackItem, StackOfItems } from "../Elements/StackItems/StackItems";
import { accessTokenTag, apiPath, GetFromStorage, NotificationManager } from "../ProfilePage/Profile-Import";

const AppPageNewView = ({returnBack}) =>
{
    const [domena, setDomena] = useState("");
    const [name, setName] = useState("");
    const [visibility, setVisibility] = useState("veřejné");
    const [type, setType] = useState("");

    const [photo, setPhoto] = useState(null);
    const [provider, setProvider] = useState([]);
    const [checkboxes, setCheckboxes] = useState(<></>);
    const [AppTypes, setApptypes] = useState([]);

    const [SendRequest, GenerateParams, GenerateError] = usePublicApi();

    const onClickHandler = () =>
    {
        var val = window.confirm("Opravdu chcete opustit stánku?\nPřípadné změny nebudou uložené");
        if (val) returnBack();
    }

    const Create = async () =>
    {
        // udělat check
        const newApp =
        {
            Name: name,
            ico: "",
            Domain: domena,
            isPublic: visibility == "veřejné",
            Type: type
        }
        const errorMessage = "Aplikace s daným názvem nebo doménou existuje";
        const errorTitle = "Nelze přidat novou aplikaci";
        const error = GenerateError(errorMessage, errorTitle);
        const params = GenerateParams(apiPath.ApplicationPath.Add, newApp);
        const response = await SendRequest(params, error);
        if (response != undefined)
        {
            NotificationManager.success("Aplikace byla vytvožena");
            returnBack();
        }

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
        // načíst všechny providery
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
        const errorMessage = "Chyba při načístání typů aplikace";
        const errorTitle = "Nelze načíst typy aplikace";
        const error = GenerateError(errorMessage, errorTitle);
        const params = GenerateParams(apiPath.ApplicationPath.Types);
        const response = await SendRequest(params, error);
        if(response != undefined)  
        {
            const values = Object.values(response.data);
            setApptypes(values);
            setType(values[0]);
        }
    }

    useEffect(() => 
    {
        loadSocialAccount();
        loadApplicationTypes();
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

                        <DetailDataRowInput 
                            header="Vlastník"
                            editMode={false}
                            value="Přihlášený Uživatel"
                        />

                        <DetailDataRowInput 
                            header="Jméno"
                            editMode={true}
                            onChange={setName}
                            required
                        />

                        <DetailDataRowInput 
                            header="Doména"
                            editMode={true}
                            onChange={setDomena}
                            expresion={domainRegex}
                        />

                        <DetailDataRowSelect
                            header="Typ:"
                            editMode={true}
                            options={AppTypes}
                            selected="auto"
                            onChange={() => console.log()}
                        />

                        <DetailDataRowSelect
                            header="Viditelnost:"
                            editMode={true}
                            options={["veřejné", "soukromé"]}
                            selected={"veřejné"}
                            onChange={() => console.log()}
                        />

                        <DetailControlRow>
                            <ButtonSecondary text="Vytvořit" onClick={Create} />
                        </DetailControlRow>

                    </DetailWindowCard>
                </DetailWindowColumn>
            </DetailWindow>
        </div>
    );
}

export default AppPageNewView;