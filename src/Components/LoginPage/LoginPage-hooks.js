import 
{
    apiPath,
    NotificationManager,
    PublicAPI,
} from "./LoginPage-imports";
import { consoleLog, ConsoleOut, consoleType } from "../../Services/DebugService";

const fileName = "LoginPageHooks";

// custom hook to handl submit buton on basic auth form
export const useBasicAuthSubmit = () =>
{
    const handleSubmit = async (isValid, email, password, setOnSuccess, setLoadMode) =>
    {
    
        if (!isValid)   // pokud vstupní pole jsou nevalidní
        {
            NotificationManager.error("Nevalidní vstup");
            return;
        }
    
        // proces zpracování
        setLoadMode(true);
    
        const loginPath = apiPath.loginBasic.path;
        const loginData = 
        {
            Password: password,
            Login: email
        };
        
        try
        {
            const response = await PublicAPI.post(
                loginPath,
                JSON.stringify(loginData)
            );
    
            const token = response.data;
            setOnSuccess(token);
        }
        catch (err)
        {
            var errTitle = "Nastala chyba při zpracování";
            var errMessage = "...";
            if (err == null) errMessage = "žádná odpověď od serveru, zkontrolujte prosím připojení.";
            else if (err.response?.status == 400) errMessage = "některý z uvedených parametrů je neplatný";
            else errMessage = "Přihlášení se nezdařilo";
    
            NotificationManager.error(errMessage, errTitle, 10000);
            consoleLog("login form error: " + err);
        }
        finally
        {
            setLoadMode(false);
        }
    }

    return handleSubmit;
}

export const useSSOAuthSubmit = () =>
{
    const CheckCode = async (code, name) =>
    {
        if (code == null) return;

        // ověření kódu
        try
        {
            const path = apiPath.loginSSO.path + name;
            var response = await PublicAPI.post( path, JSON.stringify(code));
            const token = response.data;
            ConsoleOut(consoleType.log, fileName, "Server token: " + token);
            return(token);
        }
        catch (err)
        {
            const title = "Ověření SSO";
            var message = "";
            if (err == null) message = "žádná odpověď od serveru, zkontrolujte prosím připojení.";
            else if (err.response?.status == 400) message = "nelze zpracovat (400)";
            else message = "Přihlášení se nezdařilo";
            ConsoleOut(consoleType.error, fileName, message);
            NotificationManager.error(message, title, 10000);
        }
    }

    return CheckCode;
}