import {ServerResponseCodesTypes, ResponseDiagramElementsType} from "../types/apiTypes";
import axios from "axios";

export const TestingAPI = {
    GetDiagramElements (){
        return axios.get<ResponseDiagramElementsType>("https://localhost:44380/api/GetDiagramElements")
            .then(response => {
                if(response.status === ServerResponseCodesTypes.Ok)
                    return response.data;
            })
    }
}