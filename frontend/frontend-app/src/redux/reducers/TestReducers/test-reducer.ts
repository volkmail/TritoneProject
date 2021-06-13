import {QuizResult, QuizType} from "../../../types/generalTypes";
import {TestActionsTypes} from "../../../types/actionsTypes";

type TestInitialStateType = typeof initialState;

const initialState = {
    quiz: null as QuizType,
    selectedAnswers:[] as Array<number>,
    quizResult: [] as Array<QuizResult>,
    percentageOfResult: 0 as number
}

const testReducer = (state: TestInitialStateType = initialState, action: TestActionsTypes): TestInitialStateType => {
    switch (action.type){
        case "SET_TEST_DATA":{
            return{
                ...state,
                quiz: action.testData
            }
        }
        case "SET_TEST_RESULT":{
            let rightAnswersCount = action.testResult.filter(el => el.isRight).length;
            let rightPercentage = +((rightAnswersCount*100)/action.testResult.length).toFixed(0);
            return {
                ...state,
                quizResult: [...action.testResult],
                percentageOfResult:rightPercentage
            }
        }
        default: {
            return state;
        }
    }
}

export default testReducer;