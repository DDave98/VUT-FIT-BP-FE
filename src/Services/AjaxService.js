import axios from 'axios';
import config from "../Constants/config.json";
import {Logout} from './LogoutService';

const URL = config.baseApiURL;

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
        'Authorization': "tokenJWT",
    },
    withCredentials: true
});

PrivateAPI.interceptors.response.use(
    (response) => {return response},
    (error) =>
    {
        switch(error.response.status)
        {
            case 401:
                return Logout();
            default:
                console.log("error: ", error.response, " message: ", error.response);
        }
    }
);