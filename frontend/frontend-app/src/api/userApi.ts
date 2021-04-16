import {ResponseAuthDataType} from "../types/apiTypes";
import axios from "axios";

export const UserAPI = {
    AuthMe (login: string, password: string){
        return axios.post<ResponseAuthDataType>("https://localhost:44380/api/login",
            {
                login,
                password
            })
            .then(response => {
                return response.data;
            })
    }
}