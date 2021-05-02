import {
    ServerResponseCodesTypes,
    ResponseDiagramElementsType,
    ResponseSectionElement,
    ResponseTestingInfo
} from "../types/apiTypes";
import axios from "axios";

const GetJwt = () => localStorage.length === 1 ? localStorage.getItem("JWT") : "";

export const TestingAPI = {
    GetDiagramElements (){
        return axios.get<ResponseDiagramElementsType>("https://localhost:44380/api/testing/getDiagramElements",{
            headers:{"Authorization":`Bearer ${GetJwt()}`}
        })
            .then(response => {
                if(response.status === ServerResponseCodesTypes.Ok)
                    return response.data;
            })
    },
    AddSectionComplete(sectionNumber: number) {
        return axios.put<ResponseSectionElement>("https://localhost:44380/api/testing/setSectionComplete", {
            sectionNumber
        }, {
            headers: {"Authorization": `Bearer ${GetJwt()}`}
        })
            .then(response => {
                if (response.status === ServerResponseCodesTypes.Ok)
                    return response.data
            })
    },
    GetTestingInfo(){
        return axios.get<ResponseTestingInfo>("https://localhost:44380/api/testing/getCheckPoints",{
            headers:{"Authorization":`Bearer ${GetJwt()}`}
        })
            .then(response => {
                if(response.status === ServerResponseCodesTypes.Ok){
                    return response.data;
                }
            })
    }
}