import configSetting from "../Constants/configuration"

export const consoleLog = (message) =>
{
    if (configSetting.debuging.debugMode)
        console.log("DEBUG:", message);
}

export const consoleType = 
{
    log: "log",
    warn: "warn",
    error: "error"
};

export const ConsoleOut = (type, from, message) =>
{
    switch (type)
    {
        case consoleType.log:
            console.log(from, " | ", message);
            break;

        case consoleType.warn:
            console.warn(from, " | ", message);
            break;

        case consoleType.error:
            console.error(from, " | ", message);
            break;

        default:
            break;
    }
}