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

export const usePublicApi = () =>
{
    const GenerateError = ErrGen;
    const GenerateParams = ParamGen;

    const SendRequest = async (param, errMsg) =>
    {
        var {path, method, body, headers, access} = param;
        const {errorMessage, errorHeader} = errMsg;
        var response = null;

        headers = headers != undefined ? headers : {};

        if (access == accessType.PRIVATE)
        {
            const token = GetFromStorage(accessTokenTag);
            headers.Authorization = `Bearer ${token}`;
        }

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
            ConsoleOut(consoleType.error, "usePublicApi", "error: " + JSON.stringify(error));
            if (error == null) errorMessage = "žádná odpověď od serveru, zkontrolujte prosím připojení.";
            NotificationManager.error(errorMessage, errorHeader, 10000);
        }

        return response;
    }

    return [SendRequest, GenerateParams, GenerateError];
}