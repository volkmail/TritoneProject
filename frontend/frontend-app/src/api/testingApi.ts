import {
    ServerResponseCodesTypes,
    ResponseDiagramElementsType,
    ResponseSectionElement,
    ResponseTestingInfo, ResponseCurrentStep, ResponseDataSet
} from "../types/apiTypes";
import axios from "axios";
import {QuizType} from "../types/generalTypes";

//const GetJwt = () => localStorage.length === 1 ? localStorage.getItem("JWT") : "";
const GetJwt = () => localStorage.getItem("JWT") || "";

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
    SetCurrentDiagramStepResults (result: string, currentStep: number){
        return axios.put<ResponseCurrentStep>("https://localhost:44380/api/testing/setCurrentDiagramStep",{
            stepResult: result,
            stepNumber: currentStep
        },{
            headers:{"Authorization":`Bearer ${GetJwt()}`}
        })
            .then(response => {
                if(response.status === ServerResponseCodesTypes.Ok)
                    return response.data;
            })
    },
    GetCurrentStep(){
        return axios.get<ResponseCurrentStep>("https://localhost:44380/api/testing/getCurrentDiagramStep",{
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
                    return response.data;
            })
    },
    GetTestingProgress(){
        return axios.get<ResponseTestingInfo>("https://localhost:44380/api/testing/getTestingProgress",{
            headers:{"Authorization":`Bearer ${GetJwt()}`}
        })
            .then(response => {
                if(response.status === ServerResponseCodesTypes.Ok){
                    return response.data;
                }
            })
    },
    GetDataSetInfo(placeTypeName: string){
        return axios.get<ResponseDataSet>("https://localhost:44380/api/testing/getDataSetInfo/"+placeTypeName,{
            headers:{"Authorization":`Bearer ${GetJwt()}`}
        })
            .then(response => {
                if(response.status === ServerResponseCodesTypes.Ok){
                    return response.data;
                }
            })
    },
    GetPointsProgress(){
        return axios.get<{pointSummaryProgress: string }>("https://localhost:44380/api/testing/getCalcProgress",{
            headers:{"Authorization":`Bearer ${GetJwt()}`}
        })
            .then(response => {
                if(response.status === ServerResponseCodesTypes.Ok){
                    return response.data;
                }
            })
    },
    SetPointsProgress(results: string){
        return axios.post("https://localhost:44380/api/testing/postCalcProgress/",{
            results
        },{
            headers:{"Authorization":`Bearer ${GetJwt()}`,}
        })
            .then(response => {
                if(response.status === ServerResponseCodesTypes.Ok){
                    return 0;
                }else{
                    return 1;
                }
            })
    },
    GetTestData(){
        return axios.get<{responseTestData: QuizType }>("https://localhost:44380/api/testing/getTestData",{
            headers:{"Authorization":`Bearer ${GetJwt()}`}
        })
            .then(response => {
                if(response.status === ServerResponseCodesTypes.Ok){
                    return response.data;
                }
            })
    },
}