import axios from 'axios';
import { baseApiURL } from '../Constants/apiPath';
import { urlParamRegex } from '../Constants/regex';
import { ConsoleOut, consoleType } from './DebugService';

//const URL = config.baseApiURL;
const URL = baseApiURL;

export const PublicAPI = axios.create({
    baseURL: URL,
    headers:
    {
        'Accept': "application/json",
        'Content-Type': "application/json"
    }
});

export const PrivateAPI = axios.create({
    baseURL: URL,
    headers:
    {
        'Accept': "application/json",
        'Content-Type': "application/json",
    },
    withCredentials: true
});

/**
 * Funkce vytvoří objekt pro poslání požadavku na API
 * @param {*} path cesta k api
 * @param {*} params objekt s parametry
 * @returns vygenerovaná url
 */
export const GenerateUrl = (path, params) =>
{
    ConsoleOut(consoleType.log, "GenerateUrl", "path:" + path + " params:" + JSON.stringify(params));
    
    if (params == undefined || params.length <= 0)
        return path; // žádné parametry
    
    var newPath = path;
    params.forEach(param => 
    {
        newPath = newPath.replace(urlParamRegex, param);
    });

    ConsoleOut(consoleType.log, "GenerateUrl", " url:" + newPath);
    return newPath;
};

/**
 * Funkce vytvoří objek pro zobrazení chyby
 * @param {*} message zpráva chyby
 * @param {*} title nadpis chybové hlášky
 * @returns objekt pro zobrazení chyby
 */
export const GenerateError = (message, title) =>
{
    return {
        errorMessage: message,
        errorHeader: title
    }
}

/**
 * Funkce vytvoří objekt parametrů
 * @param {*} apiPathObj objekt s url a typem metody
 * @param {*} data data (v případě POST, PUT, PATCH)
 * @param {*} urlParams pole proměnných v url
 * @param {*} headers dodatečné hlavičky
 * @returns 
 */
export const GenerateParams = (apiPathObj, data = null, urlParams = null, headers = null) =>
{
    ConsoleOut(consoleType, "GenerateParams", "urlParams-" + JSON.stringify(urlParams) + "path-" + apiPathObj.path);
    const url = GenerateUrl(apiPathObj.path, urlParams);
    return {
        path: url,
        method: apiPathObj.method,
        headers: headers,
        body: data,
        access:  apiPathObj?.access
    }
}