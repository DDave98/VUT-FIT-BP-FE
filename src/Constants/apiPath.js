export const baseApiURL = new URL("https:\/\/authframe-api.herokuapp.com");

export const apiPath=
{
    /* Auth path */
    "authenticate":   "/api/Auth/authenticate",
    "confirmEmail":   "/api/Auth/confirmEmail",
    "refresh":        "/api/Auth/Refresh",
    "recovery":       "/api/Auth/recovery",
    "recaptcha":      "/api/Auth/reCaptcha",

    /* User path */
    "registration":   "/api/User/Registration",
    "selfInfo":       "/api/User",
    "UpdateUser":       "/api/User"
};