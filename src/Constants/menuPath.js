import {
    homePath,
    appPath,
    userPath,
    logPath,
    settingPath,
    profilePath
} from "./pagesPath";

export const navLinks = [
    {name: 'Přehled', link: homePath},
    {name: 'Uživatelé', link: userPath},
    {name: 'Záznamy', link: logPath},
    {name: 'Aplikace', link: appPath},
    {name: 'Zprávy', link: null},
];

export const navDropDownLinks = [
    {name: 'Profil', link: profilePath},
    {name: 'Nastavení', link: settingPath}
];