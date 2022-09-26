import "./pagesPath";
import HomePage from "../Pages/HomePage";
import LoginPage from "../Pages/auth/LoginPage";
import NotFoundPage from "../Pages/404";
import AppPage from "../Pages/AppPage";
import LogPage from "../Pages/LogPage";
import ProfilePage from "../Pages/ProfilePage";
import SettingPage from "../Pages/SettingPage";
import UserPage from "../Pages/UserPage";
import ErrorPage from "../Pages/ErrorPage";
import RegistrationPage from "../Pages/auth/RegisterPage";

import * as path from "./pagesPath";

const appRoutesList = 
[
    {
        path: path.homePath,
        component: HomePage,
        children: [],
    },
    {
        path: path.loginPath,
        component: LoginPage,
        children: [],
    },
    {
        path: path.notFoundPath,
        component: NotFoundPage,
        children: [],
    },
    {
        path: path.appPath,
        component: AppPage,
        children: [],
    },
    {
        path: path.logPath,
        component: LogPage,
        children: [],
    },
    {
        path: path.profilePath,
        component: ProfilePage,
        children: [],
    },
    {
        path: path.settingPath,
        component: SettingPage,
        children: [],
    },
    {
        path: path.userPath,
        component: UserPage,
        children: [],
    },
    {
        path: path.errorPath,
        component: ErrorPage,
        children: [],
    },
    {
        path: path.registerPath,
        component: RegistrationPage,
        children: [],
    }
];

export default appRoutesList;