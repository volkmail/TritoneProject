import React, {useEffect, useState} from "react";
import style from './Test.module.css'
import Question from "./CustomComponents/Question";
import {useDispatch, useSelector} from "react-redux";
import {GetQuizData} from "../../../redux/ThunkCreators/testingThunks";
import {GetQuiz} from "../../../redux/selectors/test-selectors";
import {QuizSelectedAnswers} from "../../../types/generalTypes";
import {Redirect} from "react-router-dom";
import TestResult from "./TestResult";

const Test = () => {
    const [currentQuestion, SetCurrentQuestion] = useState<number>(0);
    const [selectedAnswer, SetSelectedAnswer] = useState<number>(1);
    const [selectedAnswers, SetSelectedAnswers] = useState<Array<QuizSelectedAnswers>>([]);
    const [isFinish, SetIsFinish] = useState<boolean>(false);
    const [isFailed, SetIsFailed] = useState<boolean>(false);
    const quizData = useSelector(GetQuiz);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(GetQuizData());
    }, [dispatch])

    useEffect(() => {
        if (isFailed) {
            SetCurrentQuestion(0);
            SetSelectedAnswer(1);
            SetSelectedAnswers([]);
            SetIsFailed(false);
        }
    }, [isFailed])

    const nextQuestionButtonHandler = () => {
        const resultAnswerAdd: QuizSelectedAnswers = {questionId: currentQuestion, answerId: selectedAnswer};
        SetCurrentQuestion(currentQuestion => currentQuestion + 1);
        SetSelectedAnswers(selectedAnswers => [...selectedAnswers, {...resultAnswerAdd}]);
        console.log(selectedAnswers);
    }

    return (
        isFinish
            ? <Redirect to={"/testing"}/>
            : <div className={style.container}>
                <div className={style.question_container}>
                    {quizData
                        ? currentQuestion === quizData.questions.length
                            ? <>
                                <TestResult
                                    selectedAnswers={selectedAnswers}
                                    SetIsFinish={SetIsFinish}
                                    SetIsFailed={SetIsFailed}
                                />
                            </>
                            : <>
                                <Question currentQuestion={quizData.questions[currentQuestion]}
                                          SetSelectedAnswer={SetSelectedAnswer}/>
                                <button className="button_classic" onClick={nextQuestionButtonHandler}>Далее</button>
                            </>
                        : <p>Загрузка теста...</p>
                    }
                </div>
            </div>
    )
}

export default Test;