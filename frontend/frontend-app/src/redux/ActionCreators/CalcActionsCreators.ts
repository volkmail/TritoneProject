import {DataSetType} from "../../types/generalTypes";

const GetSummaryResults = () => {
    return{
        type: "GET_SUMMARY_RESULTS"
    } as const
}

const SetDataSet = (payload: DataSetType) => {
    return {
        type: "SET_DATASET",
        payload
    } as const
}

const ClearDataSet = () => {
    return {
        type: "CLEAR_DATASET"
    } as const
}

const ChangeSignalLevel = () => {
    return {
        type: "CHANGE_SIGNAL_LEVEL",
    } as const
}

export {
    GetSummaryResults,
    SetDataSet,
    ChangeSignalLevel,
    ClearDataSet
}