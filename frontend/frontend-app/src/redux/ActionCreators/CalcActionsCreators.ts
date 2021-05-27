import {DataSetType, signalTypesString, VariableType} from "../../types/generalTypes";

const SetSummaryResults = (results: Array<boolean>) => {
    return{
        type: "SET_SUMMARY_RESULTS",
        results
    } as const
}

const GetSummaryResults = (results: Array<boolean>) => {
    return{
        type: "GET_SUMMARY_RESULTS",
        results
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

const SetStepComplete = (stepNumber: number) => {
    return{
        type:"SET_STEP_COMPLETE",
        stepNumber
    } as const
}

const SetNextStep = () => {
    return{
        type: "SET_NEXT_POINT_PROGRESS_STEP"
    } as const
}

const ResetProgress = () =>{
    return{
        type: "RESET_PROGRESS"
    } as const
}

const AddSignalValuesToStep4 = (signalType: signalTypesString, values: Array<number>) => {
    return {
        type: "ADD_SIGNAL_VALUES_TO_STEP4",
        signalType,
        values
    } as const
}

const ResetSignalValuesToStep4 = () => {
    return{
        type: "RESET_SIGNAL_VALUES_TO_STEP4"
    } as const
}

const SetStep4CalcType = (calcType: number) => {
    return{
        type: "SET_STEP4_CALC_TYPE",
        calcType
    } as const
}

const SetSelectedVariables = (variables: Array<VariableType>) =>{
    return{
        type: "SET_SELECTED_VARIABLES",
        variables
    } as const
}

export {
    GetSummaryResults,
    SetSummaryResults,
    SetDataSet,
    ChangeSignalLevel,
    ClearDataSet,
    SetStepComplete,
    SetNextStep,
    ResetProgress,
    AddSignalValuesToStep4,
    ResetSignalValuesToStep4,
    SetStep4CalcType,
    SetSelectedVariables,
}