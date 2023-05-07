// PRIVATE
import HomePage from "../Pages/Private/HomePage";
import AppPage from "../Pages/Private/AppPage";
import LogPage from "../Pages/Private/LogPage";
import ProfilePage from "../Pages/Private/ProfilePage";
import SettingPage from "../Pages/Private/SettingPage";
import UserPage from "../Pages/Private/UserPage";
import MessagePage from "../Pages/Private/MessagePage";

// PUBLIC
import LoginPage from "../Pages/Public/LoginPage";
import NotFoundPage from "../Pages/Public/404";
import RecoveryPage from "../Pages/Public/RecoveryPage";
import RegistrationPage from "../Pages/Public/RegisterPage";
import ConfirmPage from "../Pages/Public/ConfirmPage";
import OAuthPage from "../Pages/Public/OAuthPage";
import { OAuthPopup } from "../Pages/Public/OAuthWindow";

import * as path from "./pagesPath";

import EmailConfirmForm from "../Components/EmailConfirmForm";
import NewPasswordForm from "../Components/NewPasswordForm";
// import { OAuthPopup } from "@tasoskakour/react-use-oauth2"; uninstall and after that delete thsi

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
    CreateRoute(path.oauthPath, <OAuthPage />, "OAuthPage"),
    CreateRoute(path.oauthCallbackPath, <OAuthPopup />, "OAuthCallbackPage"),
    CreateRoute(path.loginPath, <LoginPage />, "LoginPage"),
    CreateRoute(path.notFoundPath, <NotFoundPage />, "NotFoundPage"),
    CreateRoute(path.registerPath, <RegistrationPage />, "RegistrationPage",
    [
        CreateRoute("confirm", <ConfirmPage formElement={<EmailConfirmForm />} />, "RegistrationConfirm"),
    ]),
    CreateRoute(path.recoveryPath, <RecoveryPage />, "RecoveryPage",
    [
        CreateRoute(path.confirmPath, <ConfirmPage formElement={<NewPasswordForm />} />, "RecoveryConfirm"),
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
    CreateRoute(path.messagePath, <MessagePage />, "MessagePage"),
];