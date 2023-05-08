import { useEffect } from "react";
import { useState } from "react";
import OAuthConfirmView from "../../Component-Views/OAuthPage/OAuthConfirmView";
import OAuthLoginForm from "../../Component-Views/OAuthPage/OAuthLoginForm";
import OAuthRejectView from "../../Component-Views/OAuthPage/OAuthRejectView";
import { apiPath } from "../../Constants/apiPath";
import { accessTokenTag } from "../../Constants/storageTag";
import { usePublicApi } from "../../Hooks/usePublicAPI";
import { GetFromStorage } from "../../Services/StorageService";


const GetUrlParams = () =>
{
    // získání parametrů z url
    const queryString = window.location.search;             // get query string (?...)
    const urlParams = new URLSearchParams(queryString);     // get url params as list
    return urlParams;
}

const OAuthPage = () =>
{
    // na začátku kontrolovat zda není dostupný token
    // pokud ano, kontrolovat platnost
    // připadně se pokusit ho obnovit
    // pokud je platný/obnovený -> dovolit uživateli kliknout na tlačístko "přihlásit se jako"
    // a malým pod tím "přihlásit se jiným účtem"
    
    // na začátku načíst parametry v url

    const errtypes = {1: "Invalid_request", 2: "User_Not_Allowerd"};
    const p = {clientId: "", redirectUri: "", scope: "", state: "", responseType: ""};
    
    const missingMsg = "Vyžadovaný parametr chybí: ";
    const wrongMsg = "Parametr má nevalidní hodnotu: ";
    const expMsg = " Očekává se hodnota: ";
    const usrMgs = "Uživatel nemá povolený přístup do této aplikace"

    const [OAuthResponse, setOAuthResponse] = useState({});
    const [{errType, errItem, errCode}, setError] = useState({});
    const [actualView, SetView] = useState(<></>);

    const [SendRequest, GenerateParams, GenerateError] = usePublicApi();

    const SendParams = async (urlParams) =>
    {
        const token = GetFromStorage(accessTokenTag);
        const data = {
            "clientId": urlParams.get("client_id"),
            "redirectUri": urlParams.get("redirect_uri"),
            "scope": urlParams.get("scope"),
            "responseType": urlParams.get("response_type"),
            "token": token == false? "" : token,
        }
        const errorMessage = "Chyba při ověření aplikace";
        const errorTitle = "Nelze ověřit aplikaci";
        const error = GenerateError(errorMessage, errorTitle);
        const params = GenerateParams(apiPath.OAuthPath.Code, data);
        const response = await SendRequest(params, error);
        if(response != undefined) 
        {
            var responseData = response.data;
            // pokud parametry jsou špatný -> RejectView
            if (responseData.status == 400)
                setError({errType: errtypes[1], errItem: responseData.note, errCode: 400})

            // pokud token není platný -> LoginFormView
            if (responseData.status == 401)
                SetView(LoginFormView);

            // pokud uživatel není součástí aplikace
            if (responseData.status == 403)
                setError({errType: errtypes[2], errItem: usrMgs, errCode: 403})

            // pokud je vše ok -> ConfirmView
            if (responseData.status == 200)
                setOAuthResponse(responseData.data)
        }
    }

    const ChangeProfile = () =>
    {
        console.log("aaa");
        SetView(LoginFormView);
    }

    const CheckParams = (urlParams) =>
    {
        const type = errtypes[1];
        var item = "";

        // pokud parametry jsou špatný -> RejectView
        if (!urlParams.has("client_id")) item = missingMsg +"client_id";
        else if (!urlParams.has("redirect_uri")) item = missingMsg+ "redirect_uri";
        else if (!urlParams.has("scope")) item = missingMsg + "scope";
        else if (!urlParams.has("response_type")) item = missingMsg + "response_type";
        else if (urlParams.get("response_type") != "code") 
        {
            item = wrongMsg + "response_type=" + urlParams.get("response_type") + expMsg + "code";
        }
        else return true;
        
        setError({errType: type, errItem: item, errCode: 400});
        return false; // některý z povinných parametrů chybí
    }

    const onLogin = () =>
    {
        const urlParams = GetUrlParams();

        if (CheckParams(urlParams))
        {
            // poslat požadavek na kontrolu parametrů + kontrola tokenu
            SendParams(urlParams);
        }
    }

    const RejectView = <OAuthRejectView message={errItem} errType={errType} errCode={errCode}/>;
    const ConfirmView = <OAuthConfirmView data={OAuthResponse} changeProfile={ChangeProfile}/>;
    const LoginFormView = <OAuthLoginForm onSuccess={onLogin} />;

    useEffect(() => 
    {
        if (Object.keys(OAuthResponse).length != 0)
        {
            SetView(ConfirmView);
        }
    }, [OAuthResponse]);

    useEffect(() => 
    {
        if (errType != undefined &&  errItem != undefined &&  errCode != undefined)
        {
            console.log(errType, errItem, errCode);
            SetView(RejectView); // pokud chybí parametry
        }
    }, [errType, errItem, errCode]);


    useEffect(() => 
    {
        const urlParams = GetUrlParams();

        if (CheckParams(urlParams))
        {
            // poslat požadavek na kontrolu parametrů + kontrola tokenu
            SendParams(urlParams);
        }
    }, []);

    return (
        <div className="OAuthPage">
          {actualView}  
        </div>
    )
}

export default OAuthPage;