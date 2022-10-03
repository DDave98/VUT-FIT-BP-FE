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
        const responseIntercept = PrivateAPI.interceptors.response.use(
            (response) => {return response},
            (error) =>
            {
                switch(error.response.status)
                {
                    case 401:
                        return Logout();
                    default:
                        console.log("error: ", error.response, " message: ", error.response);
                }
            }
        );
        
    }, [auth])
}

export default useAxiosPrivate;