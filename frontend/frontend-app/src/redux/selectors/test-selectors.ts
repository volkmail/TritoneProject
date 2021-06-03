import {AppStateType} from "../store";
import {QuizType} from "../../types/generalTypes";

const GetQuiz = (state: AppStateType): QuizType | null => {
    return state.testData.quiz;
}

export {
    GetQuiz
}