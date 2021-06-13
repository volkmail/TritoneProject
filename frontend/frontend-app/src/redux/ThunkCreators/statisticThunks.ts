import {ThunkAction} from "redux-thunk";
import {AppStateType} from "../store";
import {StatisticActionsTypes} from "../../types/actionsTypes";
import {Dispatch} from "react";
import {StatisticApi} from "../../api/statisticApi";
import {SetStatisticData} from "../ActionCreators/StatisticActionCreators";

const GetStatistic = (): ThunkAction<Promise<void>, AppStateType, unknown, StatisticActionsTypes> =>
    async (dispatch: Dispatch<StatisticActionsTypes>) => {
        const responseData = await StatisticApi.GetStatistic();
        if(responseData && responseData.statistic){
            dispatch(SetStatisticData(responseData.statistic));
        }
    }

export {
    GetStatistic
}