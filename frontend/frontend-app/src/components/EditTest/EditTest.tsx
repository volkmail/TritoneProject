import React, {useEffect} from 'react';
import style from "./EditTest.module.css"
import QuestionEditor from "./QuestionEditor";
import {useDispatch, useSelector} from "react-redux";
import {GetTest} from "../../redux/ThunkCreators/editThunks";
import {SelectTest} from "../../redux/selectors/edit-selectors";

const EditTest = () => {
    const test = useSelector(SelectTest);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(GetTest());
    }, [])


    return (
        <div className={style.container}>
            <p>Редактирование теста</p>
            <div className={style.content}>
                {test
                    ? <>
                        {test.questions.map(el => {
                                let answers = [{
                                    answerText: el.answers[0].answerText,
                                    answerRight: el.answers[0].answerRight!,
                                },{
                                    answerText: el.answers[1].answerText,
                                    answerRight: el.answers[1].answerRight!,
                                },{
                                    answerText: el.answers[2].answerText,
                                    answerRight: el.answers[2].answerRight!,
                                }];
                                return <QuestionEditor
                                    questionId={el.questionId.toString()}
                                    questionText={el.questionText}
                                    answers={[...answers]}
                                    isNew={false}
                                />
                            }
                        )
                        }
                        <QuestionEditor
                            questionId={(Math.max(...test.questions.map(el => el.questionId)) + 1).toString()}
                            questionText={""}
                            answers={[{
                                answerText: "",
                                answerRight: false,
                            },{
                                answerText: "",
                                answerRight: false,
                            },{
                                answerText: "",
                                answerRight: false,
                            }]}
                            isNew={true}
                        />
                    </>
                    : <p>Загрузка данных...</p>
                }

            </div>
        </div>
    );
};

export default EditTest;
