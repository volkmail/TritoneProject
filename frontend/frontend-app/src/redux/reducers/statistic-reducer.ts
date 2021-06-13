import {StatisticActionsTypes} from "../../types/actionsTypes";
import {StatisticType} from "../../types/generalTypes";

type StatisticInitialStateType = typeof initialState;

let initialState = {
    statisticData: null as StatisticType[] | null
}

const statisticReducer = (state: StatisticInitialStateType = initialState, action: StatisticActionsTypes): StatisticInitialStateType => {
    switch (action.type){
        case "SET_STATISTIC_DATA":
            return {
                ...state,
                statisticData: action.statistic
            }
        default:
            return state;
    }
}

export{
    statisticReducer,
}

export type{
    StatisticInitialStateType
}