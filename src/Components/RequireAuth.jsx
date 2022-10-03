import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import { loginPath } from "../Constants/pagesPath";

const RequireAuth = () =>
{
    const { auth } = useAuth();         // token saved into page instance memory
    const location = useLocation();
    //console.log(auth?.token);
    return (
        auth?.token
        ? <Outlet />
        : <Navigate to={loginPath} state={{from: location}} replace />
    );
}

export default RequireAuth;