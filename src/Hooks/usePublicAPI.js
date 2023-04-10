import { NotificationManager } from "react-notifications";
import { methodType } from "../Constants/apiPath";
import { urlParamRegex } from "../Constants/regex";
import { PublicAPI } from "../Services/AjaxService";
import { ConsoleOut, consoleType } from "../Services/DebugService";

export const usePublicApi = () =>
{
    const GenerateUrl = (path, params) =>
    {
        ConsoleOut(consoleType.log, "GenerateUrl", "path:" + path + " params:" + JSON.stringify(params));
        
        if (params == undefined || params.length <= 0)
            return path; // žádné parametry
        
        var newPath = path;
        params.forEach(param => 
        {
            newPath = newPath.replace(urlParamRegex, param);
        });

        ConsoleOut(consoleType.log, "GenerateUrl", "path:" + path + " url:" + newPath);
        return newPath;
    };

    const GenerateError = (message, title) =>
    {
        return {
            errorMessage: message,
            errorTitle: title
        }
    }

    const GenerateParams = (apiPathObj, data = null, urlParams = null, headers = null) =>
    {
        ConsoleOut(consoleType, "GenerateParams", "urlParams-" + JSON.stringify(urlParams) + "path-" + apiPathObj.path);
        const url = GenerateUrl(apiPathObj.path, urlParams);
        return {
            path: url,
            method: apiPathObj.method,
            headers: headers,
            body: JSON.stringify(data)
        }
    }

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
            if (error == null) errorMessage = "žádná odpověď od serveru, zkontrolujte prosím připojení.";
            NotificationManager.error(errorMessage, errorHeader, 10000);
            ConsoleOut(consoleType.error, "usePublicApi", "error: " + JSON.stringify(error));
        }

        return response;
    }

    return [SendRequest, GenerateParams, GenerateError];
}