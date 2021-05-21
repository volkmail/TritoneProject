import {CheckPoint} from "../../../types/generalTypes";
import {TestingActionsTypes} from "../../../types/actionsTypes";

type TestingInitialStateType = typeof initialState;

const initialState = {
    sections:[false,false,false],
    checkPoints: {
        window1Cps: [] as Array<CheckPoint>
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
        default: {
            return state;
        }
    }
}

export default testingReducer;