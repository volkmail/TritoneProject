import {AppStateType} from "../store";
import {QuizResult, QuizType} from "../../types/generalTypes";
import {createSelector} from "reselect";

const GetQuiz = (state: AppStateType): QuizType | null => {
    return state.testData.quiz;
}

const GetQuizRightPercentage = (state: AppStateType) => {
    return state.testData.percentageOfResult;
}

const GetQuizResult = (state: AppStateType) => {
    return state.testData.quizResult;
}

const GetQuizResultData = createSelector(GetQuizRightPercentage,GetQuizResult,
    (percentageOfResult,quizResult): {quizResult: QuizResult[], percentageOfResult: number} |null=>{

    let result: {quizResult: QuizResult[], percentageOfResult: number} = {quizResult, percentageOfResult};

    return quizResult && percentageOfResult ? {...result} : null;
});

export {
    GetQuiz,
    GetQuizResultData,
}