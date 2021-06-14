import axios from "axios";
import {ServerResponseCodesTypes} from "../types/apiTypes";
import {GroupEdit, QuizType} from "../types/generalTypes";

const GetJwt = () => localStorage.getItem("JWT") || "";

export const EditApi = {
    GetGroups (){
        return axios.get<{groupResponse: Array<GroupEdit>}>("https://localhost:44380/api/editing/getGroups",{
            headers:{"Authorization":`Bearer ${GetJwt()}`}
        })
            .then(response => {
                if(response.status === ServerResponseCodesTypes.Ok)
                    return response.data;
            })
    },
    GetTest (){
        return axios.get<{test: QuizType}>("https://localhost:44380/api/editing/getTest",{
            headers:{"Authorization":`Bearer ${GetJwt()}`}
        })
            .then(response => {
                if(response.status === ServerResponseCodesTypes.Ok)
                    return response.data;
            })
    },
}