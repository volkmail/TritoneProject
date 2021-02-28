import axios from "axios";
import {ConnectionResponseCodesTypes, ResponseDiagramElementsType} from "../types/apiTypes";

const instance = axios.create({
    baseURL: 'http://localhost:8000/api/'
})

export const TestingAPI = {
    GetDiagramElements (){
        return instance.get<ResponseDiagramElementsType>("testing/diagram_elements")
            .then(response => {
                if(response.status === ConnectionResponseCodesTypes.ConnectionSuccess)
                    return response.data;
        })
    }
}