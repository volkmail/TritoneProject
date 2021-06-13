import {QuizResult, QuizType} from "../../types/generalTypes";

const SetQuizData = (testData: QuizType) => {
    return {
        type: "SET_TEST_DATA",
        testData
    } as const
}

const SetQuizResult = (testResult: Array<QuizResult>) => {
    return {
        type: "SET_TEST_RESULT",
        testResult
    } as const
}

export {
    SetQuizData,
    SetQuizResult,

}