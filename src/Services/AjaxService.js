import axios from 'axios';
import config from "../Constants/config.json";

//const URL = config.baseApiURL;
const URL = "https://localhost:7155";

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