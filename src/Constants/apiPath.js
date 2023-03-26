//export const baseApiURL = new URL("https:\/\/authframe-api.herokuapp.com");
export const baseApiURL = "https://localhost:7155";

export const apiPath=
{
    /* Auth path */
    authenticate:   "/api/Auth/authenticate",
    confirmEmail:   "/api/Auth/confirmEmail",
    refresh:        "/api/Auth/Refresh",
    recovery:       "/api/Auth/recovery",
    recaptcha:      "/api/Auth/reCaptcha",
    changePwd:      "/api/Auth/password",

    /* User path */
    registration:   "/api/User/Registration",
    selfInfo:       "/api/User",
    UpdateUser:     "/api/User",
    UploadPhoto:    "/api/User/Photo",
    GetPhoto:       "/api/User/Photo",
};