import React, {useEffect, useState} from "react";
import style from './Test.module.css'
import Question from "./CustomComponents/Question";
import {useDispatch, useSelector} from "react-redux";
import {GetQuizData} from "../../../redux/ThunkCreators/testingThunks";
import {GetQuiz} from "../../../redux/selectors/test-selectors";

const Test = () => {
    const [currentQuestion, SetCurrentQuestion] = useState<number>(0);
    const [selectedAnswer, SetSelectedAnswer] = useState<number>(1);
    const [selectedAnswers, SetSelectedAnswers] = useState<Array<number>>([]);
    const quizData = useSelector(GetQuiz);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(GetQuizData());
    }, [dispatch])

    const nextQuestionButtonHandler = () => {
        SetCurrentQuestion(currentQuestion => currentQuestion + 1);
        SetSelectedAnswers(selectedAnswers => [...selectedAnswers, selectedAnswer]);
        console.log(selectedAnswers);
    }

    const testCompleteButtonHandler = () =>{
        alert(selectedAnswers)
    }

    return (
        <div className={style.container}>
            <div className={style.question_container}>
                {quizData
                    ? currentQuestion === quizData.questions.length
                        ? <>
                            <p>Тест завершен!</p>
                            <button className="button_classic" onClick={testCompleteButtonHandler}>Проверить результаты</button>
                        </>
                        :<>
                            <Question currentQuestion={quizData.questions[currentQuestion]} SetSelectedAnswer={SetSelectedAnswer}/>
                            <button className="button_classic" onClick={nextQuestionButtonHandler}>Далее</button>
                        </>
                    :<p>Loading...</p>
                }

            </div>
        </div>
    )
}

export default Test;