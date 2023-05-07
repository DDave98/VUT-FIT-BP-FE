import { useEffect } from "react";
import { useState } from "react";
import OAuthLoginForm from "../../Component-Views/OAuthPage/OAuthLoginForm";
import OAuthRejectView from "../../Component-Views/OAuthPage/OAuthRejectView";

const OAuthPage = () =>
{
    // na začátku kontrolovat zda není dostupný token
    // pokud ano, kontrolovat platnost
    // připadně se pokusit ho obnovit
    // pokud je platný/obnovený -> dovolit uživateli kliknout na tlačístko "přihlásit se jako"
    // a malým pod tím "přihlásit se jiným účtem"
    
    // na začátku načíst parametry v url

    const [{clientId, redirectUri, scope, state, responseType}, setOAuthparams] = useState({});
    
    const RejectView = <OAuthRejectView />;
    const ConfirmView = <>vše ok</>;
    const LoginFormView = <OAuthLoginForm />;

    const [actualView, SetView] = useState(<></>);

    const SendParams = async () =>
    {
        // pokud parametry jsou špatný -> RejectView
        // pokud token není platný -> LoginFormView
        // pokud je vše ok -> ConfirmView
    }

    const CheckParams = (urlParams) =>
    {
        // pokud parametry jsou špatný -> RejectView
        if (
            !urlParams.has("client_id") || 
            !urlParams.has("redirect_uri") ||
            !urlParams.has("scope") ||
            !urlParams.has("response_type")
        ) return false; // některý z povinných parametrů chybí
    }

    useEffect(() => 
    {
        // získání parametrů z url
        const queryString = window.location.search;             // get query string (?...)
        const urlParams = new URLSearchParams(queryString);     // get url params as list

        if (CheckParams(urlParams))
        {
            setOAuthparams(
            {
                clientId: urlParams.get("client_id"),
                redirectUri: urlParams.get("redirect_uri"),
                scope: urlParams.get("scope"),
                state: urlParams.get("state"), // jediný volitelný
                responseType: urlParams.get("response_type"),
            });

            // poslat požadavek na kontrolu parametrů + kontrola tokenu
            SendParams();
        }

        SetView(RejectView); // pokud chybí parametry
    }, []);

    return (
        <div className="OAuthPage">
          {actualView}  
        </div>
    )
}

export default OAuthPage;