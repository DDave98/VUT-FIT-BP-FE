import configSetting from "../Constants/configuration"

export const consoleLog = (message) =>
{
    if (configSetting.debuging.debugMode)
        console.log("DEBUG:", message);
}

export const ConsoleOut = (type, from, message) =>
{
    switch (type)
    {
        case "log":
            console.log(from, " | ", message);
            break;

        case "warn":
            console.warn(from, " | ", message);
            break;

        case "error":
            console.error(from, " | ", message);
            break;

        default:
            break;
    }
}