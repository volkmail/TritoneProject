import axios from "axios";

export const instance = axios.create({
    baseURL: 'https://localhost:44380/api/'
})