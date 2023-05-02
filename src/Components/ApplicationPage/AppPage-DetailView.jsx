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

const AppPageDetailView = ({returnBack, appID}) =>
{
    // nove hodnoty
    const detailObj = {"name":null,"ico":null,"clientId":null,"domain":null,"type":null,"isPublic":false,"ownerI":null}
    const [domena, setDomena] = useState("");
    const [name, setName] = useState("");
    const [visibility, setVisibility] = useState("veřejné");
    const [type, setType] = useState("");

    // puvodni data
    const [photo, setPhoto] = useState("");
    const [provider, setProvider] = useState([]);
    const [checkboxes, setCheckboxes] = useState(<></>);
    const [AppTypes, setApptypes] = useState([]);
    const [detail, setDetail] = useState(detailObj);

    const [SendRequest, GenerateParams, GenerateError] = usePublicApi();

    const onClickHandler = () =>
    {
        var val = window.confirm("Opravdu chcete opustit stánku?\nPřípadné změny nebudou uložené");
        if (val) returnBack();
    }

    const Update = async () =>
    {
        const urlParams = [appID];
        const data = {
            "name": name,
            "Ico": photo,
            "domain": domena,
            "isPublic": visibility == "veřejné",
            "type": type
        }
        const errorMessage = "Chyba při aktualizaci dat";
        const errorTitle = "Nelze aktualizovat detail aplikace";
        const error = GenerateError(errorMessage, errorTitle);
        const params = GenerateParams(apiPath.ApplicationPath.Update, data, urlParams);
        const response = await SendRequest(params, error);
        if(response != undefined) 
        {
            setDetail(response.data);
            setDetail(response.data);
            NotificationManager.success("Záznam byl aktualizován");
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

    const LoadApplicationProfile = async () =>
    {
        const urlParams = [appID];
        const errorMessage = "Chyba při načístání detailu aplikace";
        const errorTitle = "Nelze načíst detail aplikace";
        const error = GenerateError(errorMessage, errorTitle);
        const params = GenerateParams(apiPath.ApplicationPath.Detail, null, urlParams);
        const response = await SendRequest(params, error);
        if(response != undefined) setDetail(response.data);
        else {
            returnBack();
        }
    }

    const loadApplicationTypes = async () =>
    {
        const errorMessage = "Chyba při načístání typů aplikace";
        const errorTitle = "Nelze načíst typy aplikace";
        const error = GenerateError(errorMessage, errorTitle);
        const params = GenerateParams(apiPath.ApplicationPath.Types);
        const response = await SendRequest(params, error);
        if(response != undefined) setApptypes(Object.values(response.data));
    }

    const loadSocialAccount = async () =>
    {
        // načíst všechny providery dané aplikace TODO
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

    const GenerateNewAppAccess = async () =>
    {
        const urlParams = [appID];
        const errorMessage = "Chyba při generování nového přísupu";
        const errorTitle = "Nelze vygenerovat nový přístup";
        const error = GenerateError(errorMessage, errorTitle);
        const params = GenerateParams(apiPath.ApplicationPath.Access, null, urlParams);
        const response = await SendRequest(params, error);
        if(response != undefined) 
        {
            console.log(response.data);
            // zobrazit okno s údaji a poznamkou že po zavření ClientSecret nebude zobrazitelný
        }
    }

    useEffect(() => 
    {
        LoadApplicationProfile();
        loadApplicationTypes();
        loadSocialAccount(); // toto smazat a načítat z profilu detailu
    }, []);

    useEffect(() => 
    {
        GenerateChaceboxes();
    }, [provider]);

    return (
        <div className="AppPageDetailView">

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
                        Prototyp
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
                            value={detail.ownerI?.name + " " + detail.ownerI?.surname}
                        />

                        <DetailDataRowInput 
                            header="ClientId"
                            editMode={false}
                            value={detail.clientId}
                        />

                        <DetailDataRowInput 
                            value={detail.name}
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
                            value={detail.domain}
                            required
                        />

                        <DetailDataRowSelect
                            value={detail.type}
                            header="Typ"
                            editMode={true}
                            options={Object.values(AppTypes)}
                            selected={detail.type}
                            onChange={setType}
                            required
                        />

                        <DetailDataRowSelect
                            header="Viditelnost:"
                            editMode={true}
                            options={["veřejné", "soukromé"]}
                            selected={detail.isPublic ? "veřejné" : "soukromé"}
                            value={detail.isPublic ? "veřejné" : "soukromé"}
                            onChange={setVisibility}
                            required
                        />

                        <DetailControlRow>
                            <ButtonSecondary 
                                text="Aktualizovat" 
                                onClick={Update} 
                            />
                            <ButtonSecondary 
                                text="Zobrazit seznam uživatelů" 
                                onClick={() => {}} 
                            />
                        </DetailControlRow>

                    </DetailWindowCard>
                    <DetailWindowCard>
                        <DetailControlRow>
                            <ButtonSecondary 
                                text="Nové připojení" 
                                onClick={GenerateNewAppAccess} 
                            />
                            <ButtonSecondary 
                                text="Smazat Aplikaci" 
                                onClick={() => {}} 
                            />
                        </DetailControlRow> 
                    </DetailWindowCard>
                </DetailWindowColumn>
            </DetailWindow>
        </div>
    );
}

export default AppPageDetailView;