import {AppStateType} from "../store";

const GetStatisticData = (state: AppStateType) => {
    return state.statisticData.statisticData;
}

export {
    GetStatisticData
}