import {QuizType} from "../../types/generalTypes";

const SetQuizData = (testData: QuizType) => {
    return {
        type: "SET_TEST_DATA",
        testData
    } as const
}

export {
    SetQuizData,
}