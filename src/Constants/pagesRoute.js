import "./pagesPath";
import HomePage from "../Pages/HomePage/HomePage";
import LoginPage from "../Pages/LoginPage/LoginPage";
import NotFoundPage from "../Pages/ErrorPages/404";
import AppPage from "../Pages/AppPage/AppPage";
import LogPage from "../Pages/LogPage/LogPage";
import ProfilePage from "../Pages/ProfilePage/ProfilePage";
import SettingPage from "../Pages/SettingPage/SettingPage";
import UserPage from "../Pages/UserPage/UserPage";

import {
    homePath,
    loginPath,
    notFoundPath,
    appPath,
    logPath,
    profilePath,
    settingPath,
    userPath
} from "./pagesPath";

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
    {
        path: appPath,
        component: AppPage,
        children: [],
    },
    {
        path: logPath,
        component: LogPage,
        children: [],
    },
    {
        path: profilePath,
        component: ProfilePage,
        children: [],
    },
    {
        path: settingPath,
        component: SettingPage,
        children: [],
    },
    {
        path: userPath,
        component: UserPage,
        children: [],
    },
];

export default appRoutesList;