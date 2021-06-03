import {CalcActionsTypes} from "../../../types/actionsTypes";
import {getRandomArbitrary} from "../../../functions/Random";
import {signalTypesString, VariableWithValuesType} from "../../../types/generalTypes";
import {ReturnSelectedVariables} from "../../../functions/PointTestFunctions";

type CalcInitialStateType = typeof initialState;

const dataSetInitial = {
    frequency: [] as Array<number>,
    signalLevelMax: [] as Array<number>,
    signalLevel: [] as Array<number>,
    signalLevelMin: [] as Array<number>
}

const pointProgressInitial = {
    step1:{
        id: 1,
        stepTitle: "Этап1. Проведение измерений с использованием САЗ. Произведите замеры в правильном порядке." as string,
        isComplete: false as boolean,
    },
    step2:{
        id: 2,
        stepTitle: "Этап2. Проведение измерений без использования САЗ. Произведите замеры в правильном порядке." as string,
        isComplete: false as boolean,
    },
    step3:{
        id: 3,
        stepTitle: "Этап3. Выбор обозначений для полученных результатов и коэффициентов будующих рассчетов." as string,
        rightAcousticSequence: [1,2,3,9,10,12] as Array<number>,
        rightVibroSequence: [5,6,7,9,11,12] as Array<number>,
        isComplete: false
    },
    step4:{
        id: 4,
        stepTitle: "Этап4. Рассчет коэффициента " as string,
        isAcoustic: false as boolean,
        frequency: [16,31.5,63,125,250,500,1000,2000,4000,8000,16000] as Array<number>,
        testValues: [] as Array<number>,
        signalValues: [] as Array<number>,
        backValues: [] as Array<number>,
        delta: [] as Array<number>,
        isolationValues: [] as Array<number>,
        isComplete: false,
        selectedVariables: [] as Array<VariableWithValuesType>,
    },
    isComplete: false as boolean,
    currentStep: 1 as number
}

const initialState = {
    pointsInfo: [
        {
            id: 0 as number,
            pointName: "Door" as string,
            pointTitle: "Дверь" as string,
            isComplete: false as boolean,
        }, {
            id: 1 as number,
            pointName: "Battery" as string,
            pointTitle: "Батарея" as string,
            isComplete: false as boolean,
        }, {
            id: 2 as number,
            pointName: "Window" as string,
            pointTitle: "Окно" as string,
            isComplete: false as boolean,
        }, {
            id: 3 as number,
            pointName: "Floor" as string,
            pointTitle: "Пол" as string,
            isComplete: false as boolean,
        }, {
            id: 4 as number,
            pointName: "Ceiling" as string,
            pointTitle: "Потолок" as string,
            isComplete: false as boolean,
        }, {
            id: 5 as number,
            pointName: "Wall" as string,
            pointTitle: "Стена" as string,
            isComplete: false as boolean,
        }
    ],
    currentPointName: "" as string,
    pointProgress: {
        ...pointProgressInitial
    },
    summaryProgress: [] as Array<boolean>,
    dataSet: {
        ...dataSetInitial
    }
}


const calcReducer = (state: CalcInitialStateType = initialState, action: CalcActionsTypes): CalcInitialStateType => {
    switch (action.type) {
        case "SET_SUMMARY_RESULTS": {

            let newPointsInfo = [...state.pointsInfo];
            for(let i = 0; i<newPointsInfo.length;i++){
                newPointsInfo[i].isComplete = action.results[i];
            }

            return {
                ...state,
                pointsInfo: [...newPointsInfo],
                summaryProgress: action.results
            }
        }
        case "SET_DATASET":{
            return{
                ...state,
                dataSet: {
                    ...state.dataSet,
                    frequency: action.payload.frequency,
                    signalLevelMax: action.payload.signalLevelMax,
                    signalLevel: action.payload.signalLevel,
                    signalLevelMin: action.payload.signalLevelMin
                }
            }
        }
        case "CLEAR_DATASET": {
            return {
                ...state,
                dataSet: {
                    ...dataSetInitial
                }
            }
        }
        case "CHANGE_SIGNAL_LEVEL":{
            let newSignalLevel: Array<number> = [state.dataSet.signalLevel.length];
            for(let i=0;i<state.dataSet.signalLevel.length;i++){
                newSignalLevel[i] = +getRandomArbitrary(state.dataSet.signalLevelMin[i], state.dataSet.signalLevelMax[i]).toFixed(1);
            }

            return {
                ...state,
                dataSet:{
                    ...state.dataSet,
                    signalLevel: [...newSignalLevel]
                }
            }
        }
        case "SET_STEP_COMPLETE":{
            switch (action.stepNumber){
                case 1:{
                    return {
                        ...state,
                        pointProgress: {
                            ...state.pointProgress,
                            step1: {
                                ...state.pointProgress.step1,
                                isComplete: true
                            }
                        }
                    }
                }
                case 2:{
                    return {
                        ...state,
                        pointProgress: {
                            ...state.pointProgress,
                            step1: {
                                ...state.pointProgress.step2,
                                isComplete: true
                            }
                        }
                    }
                }
                case 3:{
                    return {
                        ...state,
                        pointProgress: {
                            ...state.pointProgress,
                            step1: {
                                ...state.pointProgress.step3,
                                isComplete: true
                            }
                        }
                    }
                }
                case 4:{
                    return {
                        ...state,
                        pointProgress: {
                            ...state.pointProgress,
                            step1: {
                                ...state.pointProgress.step4,
                                isComplete: true
                            }
                        }
                    }
                }
                default:
                    return {
                        ...state
                    }
            }
        }
        case "SET_NEXT_POINT_PROGRESS_STEP":{
            return {
                ...state,
                pointProgress: {
                    ...state.pointProgress,
                    currentStep: state.pointProgress.currentStep + 1
                }
            }
        }
        case "RESET_PROGRESS":{
            return {
                ...state,
                pointProgress: {
                    ...pointProgressInitial
                }
            }
        }
        case "ADD_SIGNAL_VALUES_TO_STEP4":{
            switch (action.signalType){
                case signalTypesString.Test:{
                    return {
                        ...state,
                        pointProgress: {
                            ...state.pointProgress,
                            step4: {
                                ...state.pointProgress.step4,
                                testValues: [...action.values]
                            }
                        }
                    }
                }
                case signalTypesString.Back:{
                    return {
                        ...state,
                        pointProgress: {
                            ...state.pointProgress,
                            step4: {
                                ...state.pointProgress.step4,
                                backValues: [...action.values]
                            }
                        }
                    }
                }
                case signalTypesString.Signal:{
                    return {
                        ...state,
                        pointProgress: {
                            ...state.pointProgress,
                            step4: {
                                ...state.pointProgress.step4,
                                signalValues: [...action.values]
                            }
                        }
                    }
                }
                default:{
                    return {
                        ...state
                    }
                }
            }
        }
        case "RESET_SIGNAL_VALUES_TO_STEP4": {
            return {
                ...state,
                pointProgress: {
                    ...state.pointProgress,
                    step4: {
                        ...state.pointProgress.step4,
                        testValues: [],
                        signalValues: [],
                        backValues: [],
                        delta: [],
                        isolationValues: []
                    }
                }
            }
        }
        case "SET_STEP4_CALC_TYPE":{
            return {
                ...state,
                pointProgress: {
                    ...state.pointProgress,
                    step4: {
                        ...state.pointProgress.step4,
                        isAcoustic: !!action.calcType
                    }
                }
            }
        }
        case "SET_SELECTED_VARIABLES":{

            let selectedVariablesCalc = ReturnSelectedVariables(action.variables, state.pointProgress.step4.frequency,
                state.pointProgress.step4.testValues, state.pointProgress.step4.signalValues,
                state.pointProgress.step4.backValues);

            return{
                ...state,
                pointProgress: {
                    ...state.pointProgress,
                    step4: {
                        ...state.pointProgress.step4,
                        selectedVariables: selectedVariablesCalc
                    }
                }
            }
        }
        default: {
            return state;
        }
    }
}

export default calcReducer;