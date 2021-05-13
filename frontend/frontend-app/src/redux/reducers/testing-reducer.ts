import {CheckPoint} from "../../types/generalTypes";
import {TestingActionsTypes} from "../../types/actionsTypes";
import {getRandomArbitrary} from "../../functions/Random";

type TestingInitialStateType = typeof initialState;

const initialState = {
    sections:[false,false,false],
    checkPoints: {
        window1Cps: [] as Array<CheckPoint>
    },
    dataSet:{
        frequency: [] as Array<number>,
        signalLevelMax: [] as Array<number>,
        signalLevel: [] as Array<number>,
        signalLevelMin: [] as Array<number>
    }
}

const testingReducer = (state: TestingInitialStateType = initialState, action: TestingActionsTypes): TestingInitialStateType => {
    switch (action.type){
        case "GET_TESTING_INFO":{
            return {
                ...state,
                sections: [action.testingInfo.section1, action.testingInfo.section2, action.testingInfo.section3],
                checkPoints: {
                    ...state.checkPoints,
                    window1Cps: [...action.testingInfo.checkPoints.window1Cps]
                    //TODO: Здесь будут еще контрольные точки
                }
            }
        }
        case "SET_SECTION":{
            let newSections = [...state.sections];
            newSections[action.sectionNumber-1] = true;
            return{
                ...state,
                sections: [...newSections]
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

export default testingReducer;