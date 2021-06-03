import {QuizType} from "../../../types/generalTypes";
import {TestActionsTypes} from "../../../types/actionsTypes";

type TestInitialStateType = typeof initialState;

const initialState = {
    quiz: null as QuizType,
    selectedAnswers:[] as Array<number>
}

const testReducer = (state: TestInitialStateType = initialState, action: TestActionsTypes): TestInitialStateType => {
    switch (action.type){
        case "SET_TEST_DATA":{
            return{
                ...state,
                quiz: action.testData
            }
        }
        default: {
            return state;
        }
    }
}

export default testReducer;