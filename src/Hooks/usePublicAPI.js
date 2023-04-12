import { NotificationManager } from "react-notifications";
import { methodType } from "../Constants/apiPath";
import { 
    GenerateError as ErrGen, 
    GenerateParams as ParamGen,
    PublicAPI 
} from "../Services/AjaxService";
import { ConsoleOut, consoleType } from "../Services/DebugService";

export const usePublicApi = () =>
{
    const GenerateError = ErrGen;
    const GenerateParams = ParamGen;

    const SendRequest = async (param, errMsg) =>
    {
        const {path, method, body, headers} = param;
        const {errorMessage, errorHeader} = errMsg;
        var response = null;

        try
        {
            switch (method)
            {
                case methodType.GET:
                    response = await PublicAPI.get(path, headers);
                    break;

                case methodType.POST:
                    response = await PublicAPI.post(path, body, headers);
                    break;

                case methodType.PUT:
                    response = await PublicAPI.put(path, body, headers);
                    break;

                case methodType.DELETE:
                    response = await PublicAPI.delete(path, headers);
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