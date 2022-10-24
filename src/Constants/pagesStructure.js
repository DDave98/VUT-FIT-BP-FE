import HomePage from "../Pages/HomePage";
import LoginPage from "../Pages/LoginPage";
import NotFoundPage from "../Pages/404";
import AppPage from "../Pages/AppPage";
import LogPage from "../Pages/LogPage";
import ProfilePage from "../Pages/ProfilePage";
import SettingPage from "../Pages/SettingPage";
import UserPage from "../Pages/UserPage";
import RecoveryPage from "../Pages/RecoveryPage";
import RegistrationPage from "../Pages/RegisterPage";
import ConfirmPage from "../Pages/ConfirmPage";

import * as path from "./pagesPath";

import EmailConfirmForm from "../Components/EmailConfirmForm";
import NewPasswordForm from "../Components/NewPasswordForm";

const CreateRoute = (routePath, component, key, children) =>
{
    return {
        path: routePath,
        component: component,
        key: key,
        children: children ?? []
    }
}

export const publicRoutes =
[
    CreateRoute(path.loginPath, <LoginPage />, "LoginPage"),
    CreateRoute(path.notFoundPath, <NotFoundPage />, "NotFoundPage"),
    CreateRoute(path.registerPath, <RegistrationPage />, "RegistrationPage",
    [
        CreateRoute("confirm", <ConfirmPage form={EmailConfirmForm} />, "RegistrationConfirm"),
    ]),
    CreateRoute(path.recoveryPath, <RecoveryPage />, "RecoveryPage",
    [
        CreateRoute(path.confirmPath, <ConfirmPage form={NewPasswordForm} />, "RecoveryConfirm"),
    ])
];

export const privateRoutes =
[
    CreateRoute(path.homePath, <HomePage />, "HomePage"),
    CreateRoute(path.appPath, <AppPage />, "AppPage"),
    CreateRoute(path.logPath, <LogPage />, "LogPage"),
    CreateRoute(path.profilePath, <ProfilePage />, "ProfilePage"),
    CreateRoute(path.settingPath, <SettingPage />, "SettingPage"),
    CreateRoute(path.userPath, <UserPage />, "UserPage"),
];