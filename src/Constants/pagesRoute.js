import "./pagesPath";
import HomePage from "../Pages/HomePage/HomePage";
import LoginPage from "../Pages/LoginPage/LoginPage";
import NotFoundPage from "../Pages/ErrorPages/404";
import { homePath, loginPath, notFoundPath } from "./pagesPath";

const appRoutesList = 
[
    {
        path: homePath,
        component: HomePage,
        children: [],
    },
    {
        path: loginPath,
        component: LoginPage,
        children: [],
    },
    {
        path: notFoundPath,
        component: NotFoundPage,
        children: [],
    },
];

export default appRoutesList;