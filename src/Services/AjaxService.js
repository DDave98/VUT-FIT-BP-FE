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