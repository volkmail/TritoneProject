import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import Slide from '@material-ui/core/Slide';
import { TransitionProps } from '@material-ui/core/transitions';
import {useDispatch} from "react-redux";
import style from "../ViewResult.module.css"
import ErrorTwoToneIcon from '@material-ui/icons/ErrorTwoTone';

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & { children?: React.ReactElement<any, any> },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const MistakeDialog = (props: {SetIsMistake: React.Dispatch<React.SetStateAction<boolean>>}) => {
    const [open, setOpen] = React.useState(true);

    const OnFinishButtonHandler = () => {
        setOpen(false);
        props.SetIsMistake(false)
    };

    return (
        <div className={style.dialogSuccess}>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                className={style.dialog}
                style={{ color: "#ffdede"}}
            >
                <h2>
                    <ErrorTwoToneIcon style={{ color: "#ff6363"}} fontSize="default"/>
                    {"Ошибка при прохождении этапа"}
                </h2>
                <p>
                    Чтобы перейти на следующий этап, необходимо выполнить текущий.
                    Для повторного прохождения нажмите на конпку "Пройти этап сначала".
                </p>
                <DialogActions>
                    <button onClick={OnFinishButtonHandler} className="button_classic">
                        Пройти этап сначала
                    </button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default MistakeDialog;
