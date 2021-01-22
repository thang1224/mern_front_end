import axios from "axios";
import { api } from "../urlConfig";

const token = window.localStorage.getItem('token');
const auth = `Haothang ${token}`;
const axiosIntance = axios.create({
    baseURL: api,
    headers: {
        'Authorization': token ? auth : ''
    }
});


export default axiosIntance;