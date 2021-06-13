import axios from "axios";
import {ServerResponseCodesTypes} from "../types/apiTypes";
import {StatisticType} from "../types/generalTypes";

const GetJwt = () => localStorage.getItem("JWT") || "";

export const StatisticApi = {
    GetStatistic (){
        return axios.get<{statistic: StatisticType[]}>("https://localhost:44380/api/statistic/getAll",{
            headers:{"Authorization":`Bearer ${GetJwt()}`}
        })
            .then(response => {
                if(response.status === ServerResponseCodesTypes.Ok)
                    return response.data;
            })
    },
}