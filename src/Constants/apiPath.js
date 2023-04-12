//export const baseApiURL = new URL("https:\/\/authframe-api.herokuapp.com");
export const baseApiURL = "https://localhost:7155";

export const methodType =
{
    GET: "GET",
    POST: "POST",
    PUT: "PUT",
    DELETE: "DELETE",
    PATCH: "PATCH",
}

export const accessType =
{
    PUBLIC: "public",
    PRIVATE: "private",
}

export const apiPath=
{
    /* Provider path */
    allProviders:
    {
        method: methodType.GET,
        path: "/api/Account",
        access: accessType.PUBLIC,
    },
    usrProviders: 
    {
        method: methodType.GET,
        path: "/api/Account/user",
        access: accessType.PRIVATE,
    },
    checkProviderCode: "/api/Account/",
    addUserAccountProvider: 
    {
        method: methodType.PUT,
        path: "/api/Account/", // {provider}
        access: accessType.PRIVATE,
    },
    delUserAccountProvider: 
    {
        method: methodType.DELETE,
        path: "/api/Account/{provider}",
        access: accessType.PRIVATE,
    },

    /* Auth path */
    confirmEmail:   "/api/Auth/confirmEmail",
    refresh:        "/api/Auth/Refresh",
    recovery:
    {
        method: methodType.GET,
        path: "/api/Auth/recovery/{email}",
    },
    recaptcha:
    {
        method: methodType.GET,
        path: "/api/Auth/reCaptcha?token={token}",
    },
    changePwd:      "/api/Auth/password",
    loginSSO: // přihlášení pomocí SSO
    {
        method: methodType.POST,
        path: "/api/Auth/Login/SSO/{provider}",
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
        path: "/api/Auth/MFA/{method}",
    },
    GAgenerate:
    {
        method: methodType.POST,
        path: "/api/Auth/MFA/GA/GenerateQR",
    },
    GAverifi:
    {
        method: methodType.POST,
        path: "/api/Auth/MFA/GA/VerifiQR",
    },


    /* User path */
    registration:
    {
        method: methodType.POST,
        path: "/api/User",
    },
    selfInfo:       "/api/User",
    UpdateUser:     "/api/User",
    UploadPhoto:    "/api/User/Photo",
    GetPhoto:       "/api/User/Photo",
};

export const setApiPathVar = (key, path, value) =>
{
    return path.replace(key, value);
}