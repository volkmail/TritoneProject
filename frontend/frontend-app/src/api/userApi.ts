import {ResponseAuthDataType, ResponseGroupsType, ResponseLoginCheckType, ResponseRegType} from "../types/apiTypes";
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
    },
    CheckLoginOriginal (login: string){
        return axios.post<ResponseLoginCheckType>("https://localhost:44380/api/reg/validLogin",
            {
                login
            })
            .then(response => {
                return response.data;
            })
    },
    GetStudentGroups () {
        return axios.get<ResponseGroupsType>("https://localhost:44380/api/reg/getGroups")
            .then(response => {
                return response.data;
            })
    },
    RegMe(login: string, password: string, name: string, surname: string, patronymic: string, groupName:string){
        return axios.post<ResponseRegType>("https://localhost:44380/api/reg/regStudent",{
            login,
            password,
            name,
            surname,
            patronymic,
            groupName
        })
            .then(response=>{
                return response.data;
            })
    }
}