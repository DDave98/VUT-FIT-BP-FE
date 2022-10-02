import axios from 'axios';
import config from "../Constants/config.json";
import {Logout} from './LogoutService';

const URL = "https://localhost:7155";//config.baseApiURL;
const API = axios.create({baseURL: URL})

API.defaults.headers.common['Authorization'] = "token here";
API.defaults.headers.common['Accept'] = "application/json";
API.defaults.headers.common['Content-Type'] = "application/json";

API.interceptors.response.use(
    (response) => {return response},
    (error) =>
    {
        switch(error.response.status)
        {
            case 401:
                Logout();
                break;
            default:
                console.log("error: ", error.response.status, " message: ", error.response);
        }
    }
);

export const PublicAPI = axios.create({
    baseURL: URL,
    headers:
    {
        'Accept': "application/json",
        'Content-Type': "application/json",
        "Access-Control-Allow-Origin": "*"
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

export default API;