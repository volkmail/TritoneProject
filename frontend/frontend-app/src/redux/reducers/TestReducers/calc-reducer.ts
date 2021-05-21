import {CalcActionsTypes} from "../../../types/actionsTypes";
import {getRandomArbitrary} from "../../../functions/Random";

type CalcInitialStateType = typeof initialState;
type ResultsInitialType = typeof resultsInitial;

const resultsInitial = [{
    id: 0 as number,
    typeName: "Test" as string,
    typeTitle: "Измерение тест-сигнала" as string,
    result: false as boolean,
}, {
    id: 1 as number,
    typeName: "Signal" as string,
    typeTitle: "Измерение информативного сигнала и фона" as string,
    result: false as boolean,
}, {
    id: 2 as number,
    typeName: "Back" as string,
    typeTitle: "Измерение фона" as string,
    result: false as boolean,
}, {
    id: 3 as number,
    typeName: "SAZ",
    typeTitle: "Измерение помехи",
    result: false as boolean,
}
];

const dataSetInitial = {
    frequency: [] as Array<number>,
    signalLevelMax: [] as Array<number>,
    signalLevel: [] as Array<number>,
    signalLevelMin: [] as Array<number>
}

const initialState = {
    calculationInfo: [
        {
            id: 0 as number,
            pointName: "Door" as string,
            pointTitle: "Дверь" as string,
            results: [...resultsInitial] as ResultsInitialType
        }, {
            id: 1 as number,
            pointName: "Battery" as string,
            pointTitle: "Батарея" as string,
            results: [...resultsInitial] as ResultsInitialType
        }, {
            id: 2 as number,
            pointName: "Window" as string,
            pointTitle: "Окно" as string,
            results: [...resultsInitial] as ResultsInitialType
        }, {
            id: 3 as number,
            pointName: "Floor" as string,
            pointTitle: "Пол" as string,
            results: [...resultsInitial] as ResultsInitialType
        }, {
            id: 4 as number,
            pointName: "Ceiling" as string,
            pointTitle: "Потолок" as string,
            results: [...resultsInitial] as ResultsInitialType
        }, {
            id: 5 as number,
            pointName: "Wall" as string,
            pointTitle: "Стена" as string,
            results: [...resultsInitial] as ResultsInitialType
        }
    ],
    summaryResults: [[false, false, false, false], [false, false, false, false],
        [false, false, false, false], [false, false, false, false],
        [false, false, false, false], [false, false, false, false]],
    dataSet: {
        ...dataSetInitial
    }
}


const calcReducer = (state: CalcInitialStateType = initialState, action: CalcActionsTypes): CalcInitialStateType => {
    switch (action.type) {
        case "GET_SUMMARY_RESULTS": {
            return state;
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
        default: {
            return state;
        }
    }
}

export default calcReducer;