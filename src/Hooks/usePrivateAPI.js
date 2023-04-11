import { 
    GenerateError as ErrGen, 
    GenerateParams as ParamGen, 
    GenerateUrl as UrlGen, 
    PrivateAPI 
} from "../Services/AjaxService";
import { useEffect } from "react";
import useRefreshToken from "./useRefreshToken";
import useAuth from "./useAuth";
import useLogout from "./useLogout";
import { GetFromStorage } from "../Services/StorageService";
import { accessTokenTag } from "../Constants/storageTag";

/* YT tutorial
const usePrivateAPI = () =>
{
    const refresh = useRefreshToken();
    const { auth } = useAuth();

    useEffect(() =>
    {
        const requestIntercept = PrivateAPI.interceptors.request.use(
            config => 
            {
                if (!config.headers['Authorization'])
                {
                    config.headers['Authorization'] = 'Bearer ' + auth;
                }
                return config;
            }, (error) => Promise.reject(error)
        );

        const responseIntercept = PrivateAPI.interceptors.response.use(
            (response) => {return response},
            (error) =>
            {
                if(error.response?.status === 403 && !prevRequest?.sent)
                {
                    prevRequest.sent = true;
                    const newAccessToken = await refresh();
                    prevRequest.headers['Authorization'] = 'Bearer' + newAccessToken;
                    return PrivateAPI(prevRequest);
                }

                return Promise.reject(error);

                switch(error.response?.status)
                {
                    case 401:
                        return Logout();
                    case 403:

                        break;
                    default:
                        console.log("error: ", error.response, " message: ", error.response);
                }
                
            }
        );

        return () =>
        {
            PrivateAPI.interceptors.response.eject(responseIntercept);
        }
    }, [auth, refresh])
}*/

const usePrivateAPI = () =>
{
    const GenerateError = ErrGen;
    const GenerateParams = ParamGen;
    const Logout = useLogout;

    const SendRequest = async (param, errMsg) =>
    {
        const {path, method, body, headers} = param;
        const {errorMessage, errorHeader} = errMsg;
        var response = null;

        var token = GetFromStorage(accessTokenTag);
        headers.Authorization = `Bearer ${token}`

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
            if(error?.response?.status === 401) errorMessage = "Uživatel není autorizovaný.";
            NotificationManager.error(errorMessage, errorHeader, 10000);
            ConsoleOut(consoleType.error, "usePublicApi", "error: " + JSON.stringify(error));
            Logout();
        }

        return response;
    }

    return [SendRequest, GenerateParams, GenerateError];
}

export default usePrivateAPI;