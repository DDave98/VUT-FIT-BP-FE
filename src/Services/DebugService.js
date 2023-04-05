import configSetting from "../Constants/configuration"

//  komponenta | metoda | zpráva | hodnota
export const consoleLog = (message) =>
{
    if (configSetting.debugMode)
        console.log("DEBUG:", message);
}