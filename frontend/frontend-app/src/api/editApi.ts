import axios from "axios";
import {ServerResponseCodesTypes} from "../types/apiTypes";
import {EditQuestion, GroupEdit, QuizType} from "../types/generalTypes";

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
    EditQuestion (question: EditQuestion){
        return axios.post("https://localhost:44380/api/editing/editTest",{
            questionId: question.questionId,
            questionText: question.questionText,
            answers: question.answers,
        },{
            headers:{"Authorization":`Bearer ${GetJwt()}`}
        })
            .then(response => {
                if(response.status === ServerResponseCodesTypes.Ok)
                    return "done";
            })
    },
    DeleteQuestion (questionId: number){
        return axios.post("https://localhost:44380/api/editing/deleteQuestion", {questionId: questionId},{
            headers:{"Authorization":`Bearer ${GetJwt()}`}
        })
            .then(response => {
                if(response.status === ServerResponseCodesTypes.Ok)
                    return "done";
            })
    },
}