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
    providerPaths:
    {
        usrProviders: 
        {
            method: methodType.GET,
            path: "/api/Account/user",
            access: accessType.PRIVATE,
        },
        allProviders:
        {
            method: methodType.GET,
            path: "/api/Account",
            access: accessType.PUBLIC,
        },
    },

    checkProviderCode:
    {
        method: methodType.GET,
        path: "/api/Account/",
        access: accessType.PUBLIC,
    },
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
    confirmEmail:
    {
        method: methodType.GET,
        path: "/api/Auth/confirmEmail",
        access: accessType.PUBLIC,
    },
    refresh:        "/api/Auth/Refresh",
    recovery:
    {
        method: methodType.GET,
        path: "/api/Auth/recovery/{email}",
        access: accessType.PUBLIC
    },
    recaptcha:
    {
        method: methodType.GET,
        path: "/api/Auth/reCaptcha?token={token}",
        access: accessType.PUBLIC
    },
    changePwd:      "/api/Auth/password",
    loginSSO: // přihlášení pomocí SSO
    {
        method: methodType.POST,
        path: "/api/Auth/Login/SSO/{provider}",
        access: accessType.PUBLIC
    },
    loginBasic:
    {
        method: methodType.POST,
        path: "/api/Auth/Login/Basic",
        access: accessType.PUBLIC
    },
    MFAMethods:
    {
        method: methodType.GET,
        path: "/api/Auth/MFA",
        access: accessType.PUBLIC
    },
    MFACheck:
    {
        method: methodType.POST,
        path: "/api/Auth/MFA/{method}",
        access: accessType.PUBLIC
    },
    GAgenerate:
    {
        method: methodType.POST,
        path: "/api/Auth/MFA/GA/GenerateQR",
        access: accessType.PRIVATE
    },
    GAverifi:
    {
        method: methodType.POST,
        path: "/api/Auth/MFA/GA/VerifiQR",
        access: accessType.PRIVATE
    },


    /* User path */
    registration:
    {
        method: methodType.POST,
        path: "/api/User",
        access: accessType.PUBLIC
    },
    selfInfo:       "/api/User",
    UpdateUser:     "/api/User",
    UploadPhoto:
    {
        method: methodType.PATCH,
        path: "/api/User/Photo",
        access: accessType.PRIVATE
    },
    GetPhoto:
    {
        method: methodType.GET,
        path: "/api/User/Photo",
        access: accessType.PRIVATE
    },

    /* App path */
    ApplicationPath:
    {
        Filters:
        {
            method: methodType.GET,
            path: "/api/App/Filters",
            access: accessType.PUBLIC
        },
        Types:
        {
            method: methodType.GET,
            path: "/api/App/Types",
            access: accessType.PUBLIC
        },
        Add:
        {
            method: methodType.POST,
            path: "/api/App/",
            access: accessType.PRIVATE
        },
        List:
        {
            method: methodType.GET,
            path: "/api/App/",
            access: accessType.PRIVATE
        },
        FiltredList:
        {
            method: methodType.POST,
            path: "/api/App/AppList",
            access: accessType.PRIVATE
        },
        Detail:
        {
            
            method: methodType.GET,
            path: "/api/App/{AId}",
            access: accessType.PRIVATE
        },
        Update:
        {  
            method: methodType.PUT,
            path: "/api/App/{AId}",
            access: accessType.PRIVATE
        },
        Access:
        {  
            method: methodType.GET,
            path: "/api/App/{AId}/Access",
            access: accessType.PRIVATE
        },
    },

    AppUsrPath:
    {
        add:
        {  
            method: methodType.POST,
            path: "/api/AppUser/{AppId}",
            access: accessType.PRIVATE
        },
        leave:
        {
            method: methodType.DELETE,
            path: "/api/AppUser/{AppId}",
            access: accessType.PRIVATE
        }
    },

    OAuthPath:
    {
        Code:
        {
            method: methodType.POST,
            path: "/api/OAuth/code",
            access: accessType.PUBLIC,
        },
    }
};

export const setApiPathVar = (key, path, value) =>
{
    return path.replace(key, value);
}