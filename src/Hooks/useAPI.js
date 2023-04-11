/*
const useAPI = () =>
{
    const GenerateError = ErrGen;
    const GenerateParams = ParamGen;
    const Logout = useLogout;

    const SendRequest = async (param, errMsg) =>
    {
        const {path, method, body, headers, isPrivate} = param;
        const {errorMessage, errorHeader} = errMsg;

        var response = null;

        if (isPrivate)
        {
            var token = GetFromStorage(accessTokenTag);
            headers.Authorization = `Bearer ${token}`
        }

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
}*/