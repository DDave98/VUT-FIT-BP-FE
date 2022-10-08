import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import { GetFromStorage } from "../Services/StorageService";
import { accessTokenTag } from "../Constants/storageTag";
import { loginPath } from "../Constants/pagesPath";

const RequireAuth = () =>
{
    //const { auth } = useAuth();         // token saved into page instance memory
    const location = useLocation();
    const token = GetFromStorage(accessTokenTag); // auth?.token;
    //console.log(auth?.token);
    return (
        token
        ? <Outlet />
        : <Navigate to={loginPath} state={{from: location}} replace />
    );
}

export default RequireAuth;