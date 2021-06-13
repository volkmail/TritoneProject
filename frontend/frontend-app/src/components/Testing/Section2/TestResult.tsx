import React, {useEffect} from "react";
import style from "./Test.module.css";
import {useDispatch, useSelector} from "react-redux";
import {GetQuizResultData} from "../../../redux/selectors/test-selectors";
import {QuizSelectedAnswers} from "../../../types/generalTypes";
import {GetQuizResult, SetSectionComplete} from "../../../redux/ThunkCreators/testingThunks";
import {SetSectionCompleteAction} from "../../../redux/ActionCreators/TestingActionCreators";
import {ExpandVariable} from "../../../functions/TestFunctions";

type PropsType = {
    selectedAnswers: Array<QuizSelectedAnswers>,
    SetIsFinish: React.Dispatch<React.SetStateAction<boolean>>,
    SetIsFailed: React.Dispatch<React.SetStateAction<boolean>>
}

const TestResult: React.FC<PropsType> = (props) => {
    const testResult = useSelector(GetQuizResultData);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(GetQuizResult(props.selectedAnswers))
    }, [])

    const finishButtonHandler = () => {
        if (testResult) {
            if (testResult && testResult.percentageOfResult > 80) {
                props.SetIsFinish(true);
                dispatch(SetSectionCompleteAction(2));
            } else {
                props.SetIsFailed(true);
            }
        }
    }

    return (
        <div className={style.testResultContainer}>
            {
                testResult
                    ? <>
                    <p>{testResult.percentageOfResult > 80 ? "Тест пройден" : "Тест не пройден"}</p>
                    <p>Процент правильных ответов: {testResult.percentageOfResult}%</p>
                    {
                        testResult.quizResult.map((el) => {
                            let expandVariable = ExpandVariable(el.answerText);

                            return <div className={style.testAnswerInResult}>
                                <p>{el.questionId + 1}</p>
                                <p className={el.isRight ? style.answerRight : style.answerFailed}>{<>{
                                    expandVariable ? <>
                                            {expandVariable[0]}
                                            <sub>{expandVariable[1]}</sub>
                                        </>
                                        : <>{el.answerText}</>
                                }</>}</p>
                            </div>
                        })
                        }
                        <button className="button_classic" onClick={finishButtonHandler}>Ок</button>
                        </>
                        : <p>Загрузка результатов тестирования...</p>
                    }
                    </div>
                )
            }

export default TestResult;