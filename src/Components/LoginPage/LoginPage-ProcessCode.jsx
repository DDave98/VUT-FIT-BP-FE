import Loader from "../Loader";

import {
    PropTypes,
    Link,
    NotificationManager,
    PublicAPI,
    apiPath,
    FormPageLayout,
    useEffect,
    GetFromStorage,
    DeleteFromStorage,
    providerTag
} from "./LoginPage-imports";

const ProcessCode = ({
    code = "",
    onFail,
    onSucc
}) =>
{
    const checkCode = async () =>
    {
        try
        {
            const provider = GetFromStorage(providerTag);
            const path = apiPath.checkProviderCode + provider;
            const response = await PublicAPI.post(
                path,
                JSON.stringify(code)
            );

            const token = response.data;
            onSucc();
        }
        catch (err)
        {
            var errTitle = "Nastala chyba při zpracování";
            var errMessage = "...";
            if (err == null) errMessage = "žádná odpověď od serveru, zkontrolujte prosím připojení.";
            else errMessage = "ověření kódu se nezdařilo";

            NotificationManager.error(errMessage, errTitle, 10000);
            console.log("OAuth code check error: ", err);
            DeleteFromStorage(providerTag);
            onFail();
        }
    }

    useEffect(() => 
    {
        checkCode();
    }, [])

    const formName = "Zpracování";

    return (
        <>
            <FormPageLayout name={formName}>
                <div className="formLoader">
                    <Loader />
                    <p>{code}</p>
                </div>
            </FormPageLayout>
            <Loader />
        </>
    );
}

export default ProcessCode;