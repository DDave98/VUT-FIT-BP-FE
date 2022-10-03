import { PublicAPI } from "../Services/AjaxService";
import useAuth from "./useAuth";

const useRefreshToken = () =>
{
    const {setAuth} = useAuth();

    const refresh = async () =>
    {
        const response = await PublicAPI.get('/refresh', {withCredentials: true});
        setAuth({response});
    }

    return refresh;
}

export default useRefreshToken;