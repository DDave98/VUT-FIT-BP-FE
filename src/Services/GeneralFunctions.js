import { fbIco, GithubIco, GitlabIcon, GoogleIcon, instaIco, LinkedinIcon, MicrosoftIco, twitterIco, webIco } from "../Constants/icons";

/// funkce převede format MySQL datetime na format pro input type="date"
export function ConvertDate(date)
{
    if (date.includes("T"))
        return date.split("T")[0];
    else 
        return date.split(" ")[0];
}

/// podle názvu vrátí svg ikonu
export const GetIcoByName = (name) =>
{
    switch(name)
    {
        case "Github": return GithubIco;
        case "Twitter": return twitterIco;
        case "Instagram": return instaIco;
        case "Facebook": return fbIco;
        case "Google": return GoogleIcon;
        case "Microsoft": return MicrosoftIco;
        case "Linkedin": return LinkedinIcon;
        case "Gitlab": return GitlabIcon;
        default: return webIco;
    }
}