import { createSelector } from "reselect";
import {AppStateType} from "../store";
import {DataSetTypeForViewResult, VariableWithValuesType} from "../../types/generalTypes";

const GetDataSetFrequency = (state: AppStateType) => {
    if(state.calcData.dataSet.frequency.length >= 0)
        return state.calcData.dataSet.frequency;
    else
        return null;
}
const GetDataSetSignalLevelMax = (state: AppStateType) => {
    if(state.calcData.dataSet.signalLevelMax.length >= 0)
        return state.calcData.dataSet.signalLevelMax;
    else
        return null;
}
const GetDataSetSignalLevel = (state: AppStateType) => {
    if(state.calcData.dataSet.signalLevel.length >= 0)
        return state.calcData.dataSet.signalLevel;
    else
        return null;
}
const GetDataSetSignalLevelMin = (state: AppStateType) => {
    if(state.calcData.dataSet.signalLevelMin.length >= 0)
        return state.calcData.dataSet.signalLevelMin;
    else
        return null;
}

const GetDataSetSelector = createSelector(GetDataSetFrequency, GetDataSetSignalLevelMax,
    GetDataSetSignalLevel, GetDataSetSignalLevelMin, (frequency, signalLevelMax, signalLevel, signalLevelMin)=> {
        if(frequency && signalLevelMax && signalLevel && signalLevelMin){
            let result: Array<DataSetTypeForViewResult> = [];
            for (let i = 0; i<frequency.length;i++){
                result.push({
                    frequency: frequency[i],
                    signalLevelMax: signalLevelMax[i],
                    signalLevel: signalLevel[i],
                    signalLevelMin: signalLevelMin[i]
                });
            }
            return result;
        }
        else
            return null;
    })

const GetPointsInfo = (state: AppStateType) => {
    return state.calcData.pointsInfo;
}

const GetCurrentPointInfo = (pointId: number) => (state: AppStateType) => {
    return state.calcData.pointsInfo.find(el => el.id === pointId);
}

const GetPointProgress = (state: AppStateType) => {
    return state.calcData.pointProgress;
}

const GetRightVariables = (state: AppStateType) => {
    return {
        Acoustic: state.calcData.pointProgress.step3.rightAcousticSequence,
        Vibro: state.calcData.pointProgress.step3.rightVibroSequence
    }
}

const GetSelectedVariables = (state: AppStateType): VariableWithValuesType[] => {
    return state.calcData.pointProgress.step4.selectedVariables;
}

export {
    GetDataSetSelector,
    GetCurrentPointInfo,
    GetPointProgress,
    GetDataSetSignalLevelMax,
    GetRightVariables,
    GetSelectedVariables,
    GetPointsInfo,
}