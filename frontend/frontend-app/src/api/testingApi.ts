import {ConnectionResponseCodesTypes, ResponseDiagramElementsType} from "../types/apiTypes";
import {instance} from "./apiInstance";

export const TestingAPI = {
    GetDiagramElements (){
        return instance.get<ResponseDiagramElementsType>("GetDiagramElements")
            .then(response => {
                if(response.status === ConnectionResponseCodesTypes.ConnectionSuccess)
                    return response.data;
            })
    }
}