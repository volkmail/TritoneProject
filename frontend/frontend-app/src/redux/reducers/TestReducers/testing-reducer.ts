import {TestingActionsTypes} from "../../../types/actionsTypes";

type TestingInitialStateType = typeof initialState;

const initialState = {
    sections:[true,false,false] as Array<boolean>,
}

const testingReducer = (state: TestingInitialStateType = initialState, action: TestingActionsTypes): TestingInitialStateType => {
    switch (action.type){
        case "GET_TESTING_PROGRESS":{
            return {
                ...state,
                sections: [...action.sections],
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