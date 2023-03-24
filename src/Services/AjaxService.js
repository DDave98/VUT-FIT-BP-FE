import axios from 'axios';
import { baseApiURL } from '../Constants/apiPath';

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