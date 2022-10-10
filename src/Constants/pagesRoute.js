import "./pagesPath";
import HomePage from "../Pages/HomePage";
import LoginPage from "../Pages/auth/LoginPage";
import NotFoundPage from "../Pages/404";
import AppPage from "../Pages/AppPage";
import LogPage from "../Pages/LogPage";
import ProfilePage from "../Pages/ProfilePage";
import SettingPage from "../Pages/SettingPage";
import UserPage from "../Pages/UserPage";
import RecoveryPage from "../Pages/RecoveryPage";
import RegistrationPage from "../Pages/auth/RegisterPage";

import * as path from "./pagesPath";
import ConfirmPage from "../Pages/ConfirmPage";

export const publicRoutes =
[
    {
        path: path.loginPath,
        component: <LoginPage />,
        children: [],
    },
    {
        path: path.notFoundPath,
        component: <NotFoundPage />,
        children: [],
    },
    {
        path: path.registerPath,
        component: <RegistrationPage />,
        children: [],
    },
    {
        path: path.confirmPath,
        component: <ConfirmPage />,
        children: [],
    },
    {
        path: path.recoveryPath,
        component: <RecoveryPage />,
        children: [],
    }    
];

export const privateRoutes =
[
    {
        path: path.homePath,
        component: <HomePage />,
        children: [],
    },
    {
        path: path.appPath,
        component: <AppPage />,
        children: [],
    },
    {
        path: path.logPath,
        component: <LogPage />,
        children: [],
    },
    {
        path: path.profilePath,
        component: <ProfilePage />,
        children: [],
    },
    {
        path: path.settingPath,
        component: <SettingPage />,
        children: [],
    },
    {
        path: path.userPath,
        component: <UserPage />,
        children: [],
    }
];