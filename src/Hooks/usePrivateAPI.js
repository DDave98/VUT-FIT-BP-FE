import { PrivateAPI } from "../Services/AjaxService";
import { useEffect } from "react";
import useRefreshToken from "./useRefreshToken";
import useAuth from "./useAuth";

const usePrivateAPI = () =>
{
    const refresh = useRefreshToken();
    const { auth } = useAuth();

    useEffect(() =>
    {
        const requestIntercept = PrivateAPI.interceptors.request.use(
            config => 
            {
                if (!config.headers['Authorization'])
                {
                    config.headers['Authorization'] = 'Bearer ' + auth;
                }
                return config;
            }, (error) => Promise.reject(error)
        );

        const responseIntercept = PrivateAPI.interceptors.response.use(
            (response) => {return response},
            (error) =>
            {
                if(error.response?.status === 403 && !prevRequest?.sent)
                {
                    prevRequest.sent = true;
                    const newAccessToken = await refresh();
                    prevRequest.headers['Authorization'] = 'Bearer' + newAccessToken;
                    return PrivateAPI(prevRequest);
                }

                return Promise.reject(error);

                /*
                switch(error.response?.status)
                {
                    case 401:
                        return Logout();
                    case 403:

                        break;
                    default:
                        console.log("error: ", error.response, " message: ", error.response);
                }
                */
            }
        );

        return () =>
        {
            PrivateAPI.interceptors.response.eject(responseIntercept);
        }
    }, [auth, refresh])
}

export default useAxiosPrivate;