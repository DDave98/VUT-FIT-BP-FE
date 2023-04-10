//export const baseApiURL = new URL("https:\/\/authframe-api.herokuapp.com");
export const baseApiURL = "https://localhost:7155";

const methodType =
{
    GET: "GET",
    POST: "POST",
    PUT: "PUT",
    DELETE: "DELETE",
    PATCH: "PATCH",
}

export const apiPath=
{
    /* Provider path */
    allProviders: "/api/Account",
    usrProviders: "/api/Account/user",
    checkProviderCode: "/api/Account/",
    addUserAccountProvider: 
    {
        method: methodType.PUT,
        path: "/api/Account/", // {provider}
    },
    delUserAccountProvider: 
    {
        method: methodType.DELETE,
        path: "/api/Account/", // {provider}
    },

    /* Auth path */
    confirmEmail:   "/api/Auth/confirmEmail",
    refresh:        "/api/Auth/Refresh",
    recovery:       "/api/Auth/recovery",
    recaptcha:      "/api/Auth/reCaptcha",
    changePwd:      "/api/Auth/password",
    loginSSO: // přihlášení pomocí SSO
    {
        method: methodType.POST,
        path: "/api/Auth/Login/SSO/", // {provider}
    },
    loginBasic:
    {
        method: methodType.POST,
        path: "/api/Auth/Login/Basic",
    },
    MFAMethods:
    {
        method: methodType.GET,
        path: "/api/Auth/MFA",
    },
    MFACheck:
    {
        method: methodType.POST,
        path: "/api/Auth/MFA/", // {method}
    },


    /* User path */
    registration:   "/api/User/Registration",
    selfInfo:       "/api/User",
    UpdateUser:     "/api/User",
    UploadPhoto:    "/api/User/Photo",
    GetPhoto:       "/api/User/Photo",
};

export const setApiPathVar = (key, path, value) =>
{
    return path.replace(key, value);
}