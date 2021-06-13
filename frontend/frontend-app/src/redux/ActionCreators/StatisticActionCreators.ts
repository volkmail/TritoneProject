import {StatisticType} from "../../types/generalTypes";

const SetStatisticData = (statistic: StatisticType[]) => {
    return{
        type: "SET_STATISTIC_DATA",
        statistic
    } as const
}

export {
    SetStatisticData
}