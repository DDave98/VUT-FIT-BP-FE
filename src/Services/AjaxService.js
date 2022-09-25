import axios from 'axios';
import config from "../Constants/config.json";
import {Logout} from './LogoutService';

const URL = config.baseApiURL;
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

export default API;