import { PublicAPI } from '../Services/AjaxService';


const SocialIconPanel = () =>
{
    const socialIconStyle = 'h-10 hover:border-sky-500 hover:ring-2 hover:border-transparent';

    const iconPaths = {
        "/api/Auth/authenticate/facebook" : require ('../Assets/Images/socialIcons/facebook.png'),
        "/api/Auth/authenticate/github" : require ('../Assets/Images/socialIcons/github.png'),
        "/api/Auth/authenticate/google" : require ('../Assets/Images/socialIcons/google.png'),
        "/api/Auth/authenticate/instagram" : require ('../Assets/Images/socialIcons/instagram.png'),
        "/api/Auth/authenticate/linkedin" : require ('../Assets/Images/socialIcons/linkedin.png'),
        "/api/Auth/authenticate/microsoft" : require ('../Assets/Images/socialIcons/microsoft.png'),
    };

    const LogIn = async (e) =>
    {
        console.log(e.target.name);

        try
        {
            await PublicAPI.get(e.target.name)
        }
        catch (err)
        {
            var errTitle = "Nastala chyba při zpracování";
            var errMessage = "...";
            if (err == null) errMessage = "žádná odpověď od serveru, zkontrolujte prosím připojení.";
            else if (err.response?.status == 400) errMessage = "zadaný přihlašovací provider neexistuje";
            else errMessage = "Operace se nezdařila";

            console.log("socialpanel form error: ", err);
        }
    }

    return (
        <>
            <div id='loginSocialIcons' className="flex items-baseline justify-evenly">
                {
                    Object.entries(iconPaths).map(([key, value]) => (
                        <img
                            src={value}
                            key={key}
                            name={key}
                            className={socialIconStyle}
                            onClick={LogIn}
                        />
                    ))
                }
            </div>
        </>
    )
}

export default SocialIconPanel;