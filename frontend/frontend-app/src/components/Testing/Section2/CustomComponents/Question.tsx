import React, {useEffect, useState} from 'react';
import style from '../Test.module.css';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import GreenRadio from "./GreenRadio";
import {QuizQuestion} from "../../../../types/generalTypes";

type PropsType = {
    currentQuestion: QuizQuestion,
    SetSelectedAnswer: React.Dispatch<React.SetStateAction<number>>
}

const Question: React.FC<PropsType> = (props) => {
    const [value, SetValue] = useState<string>(`${props.currentQuestion.answers[0].answerId}`);

    useEffect(()=>{
        props.SetSelectedAnswer(parseInt(value));
    },[])

    useEffect(()=>{
        SetValue(`${props.currentQuestion.answers[0].answerId}`);
        props.SetSelectedAnswer(props.currentQuestion.answers[0].answerId);
    },[props.currentQuestion.answers[0].answerId])

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        SetValue((event.target as HTMLInputElement).value);
        props.SetSelectedAnswer(parseInt((event.target as HTMLInputElement).value));
    };

    return(
        <div className={style.question}>
            <FormControl component="fieldset">
                <p className={style.questionText}>{props.currentQuestion.questionText}</p>
                <RadioGroup value={value} onChange={handleChange}>
                    {props.currentQuestion.answers.map(el =>
                        <FormControlLabel value={`${el.answerId}`}
                                          control={<GreenRadio />}
                                          label={<p className={style.AnswerText}>{el.answerText}</p>}
                        />)
                    }
                </RadioGroup>
            </FormControl>
        </div>
    )
}

export default Question;