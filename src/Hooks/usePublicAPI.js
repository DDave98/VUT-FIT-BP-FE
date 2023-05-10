import { NotificationManager } from "react-notifications";
import { accessType, methodType } from "../Constants/apiPath";
import { accessTokenTag } from "../Constants/storageTag";
import { 
    GenerateError as ErrGen, 
    GenerateParams as ParamGen,
    PublicAPI 
} from "../Services/AjaxService";
import { ConsoleOut, consoleType } from "../Services/DebugService";
import { GetFromStorage } from "../Services/StorageService";
import useLogout from "./useLogout";

export const usePublicApi = () =>
{
    const GenerateError = ErrGen;
    const GenerateParams = ParamGen;
    const handleLogout = useLogout();

    const SendRequest = async (param, errMsg) =>
    {
        var {path, method, body, headers, access} = param;
        const {errorMessage, errorHeader} = errMsg;
        var response = null;

        headers = headers != undefined ? headers : {};

        // pokud se jedná o zabezpečený endpoint - přidá se token
        if (access == accessType.PRIVATE)
        {
            const token = GetFromStorage(accessTokenTag);
            headers.Authorization = `Bearer ${token}`;
        }

        // http nastavení
        const httpSetting = { 
            headers: headers
        };

        try
        {
            switch (method)
            {
                case methodType.GET:
                    response = await PublicAPI.get(path, httpSetting);
                    break;

                case methodType.POST:
                    response = await PublicAPI.post(path, body, httpSetting);
                    break;

                case methodType.PUT:
                    response = await PublicAPI.put(path, body, httpSetting);
                    break;

                case methodType.DELETE:
                    response = await PublicAPI.delete(path, httpSetting);
                    break;

                default:
                    break;
            }
            
            ConsoleOut(consoleType.log, "usePublicApi", "response: " + JSON.stringify(response.data));
        }
        catch (error)
        {
            const httpCode = error?.response?.status;
            var errTypemsg = "";
            if (error == null) errorMessage = "žádná odpověď od serveru, zkontrolujte prosím připojení.";
            else switch (httpCode)
            {
                case 400: //Bad Request
                    // popis: Požadavek nemůže být vyřízen, poněvadž byl syntakticky nesprávně zapsán.
                    errTypemsg = "Data jsou v nesprávném tvaru (400).";
                    break;

                case 401: // Unauthorized
                    // popis: Používán tam, kde je vyžadována autorizace, ale nebyla zatím provedena.
                    // TODO: try refresh token
                    handleLogout();
                    errTypemsg = "Uživatel není přihlášen nebo token je po expiraci.";
                    break;

                case 402: // Payment Required
                    // popis: požadovaný obsah není k dispozici, dokud klient neprovede platbu
                    errTypemsg = "Obsah není dostupný, jelikož nebyla provedena platba.";
                    break;

                case 403: // Forbidden
                    // Požadavek byl legální, ale server odmítl odpovědět.
                    errTypemsg = "Operace byla odmítnuta.";
                    break;

                case 409: // Conflict
                    // Indikuje, že požadavek nemůže být splněn vzhledem ke konfliktu.
                    errTypemsg = "Nelze zpracovat data, jelikož jsou v konfliktu s aktuálními daty.";
                    break;

                case 451: // Unavailable For Legal Reasons
                    errTypemsg = "Data nejsou dostupná z právních důvodů.";
                    break;

                case 499: // Client Closed Request
                    errTypemsg = "Klient ukončil požadavek.";
                    break;

                case 500: // Internal Server Error
                    errTypemsg = "Chyba na straně serveru.";
                    break;

                case 501: // Not Implemented
                    errTypemsg = "Funkcionalita není implementovaná.";
                    break;

                case 0:
                    errTypemsg = "Server neodpovídá.";
                    break;

                default:
                    errTypemsg = "Nastala chyba (" + httpCode + ").";
                    break;
            }

            ConsoleOut(consoleType.error, "usePublicApi", "error: " + JSON.stringify(error));
            NotificationManager.error(errorMessage, errorHeader, 10000);
            NotificationManager.warning(errTypemsg, errorHeader, 10000);
        }

        // todo upravit a vracet v případě chyby taky něco 
        // např { response: ..., error: true, responseCode: 404 }
        // např { response: ..., error: false, responseCode: 200 }
        
        return response;
    }

    return [SendRequest, GenerateParams, GenerateError];
}