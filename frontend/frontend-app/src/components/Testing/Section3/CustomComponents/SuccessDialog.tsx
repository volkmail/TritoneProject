import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import Slide from '@material-ui/core/Slide';
import { TransitionProps } from '@material-ui/core/transitions';
import {useDispatch} from "react-redux";
import {SetNextStep, SetStepComplete} from "../../../../redux/ActionCreators/CalcActionsCreators";
import style from "../ViewResult.module.css"
import CheckCircleTwoToneIcon from '@material-ui/icons/CheckCircleTwoTone';
import {formatAngleOfSector} from "recharts/types/util/PolarUtils";

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & { children?: React.ReactElement<any, any> },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const SuccessDialog = (props: {stepNumber: number, SetIsFinish: React.Dispatch<React.SetStateAction<boolean>>}) => {
    const [open, setOpen] = React.useState(true);
    const dispatch = useDispatch();

    const OnFinishButtonHandler = () => {
        setOpen(false);
        props.SetIsFinish(false);
        dispatch(SetStepComplete(props.stepNumber));
        dispatch(SetNextStep());
    };

    return (
        <div>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                className={style.dialog}
                style={{ color: "#e8ffe8"}}
            >
                <h2>
                    <CheckCircleTwoToneIcon style={{ color: "#8ed78e"}} fontSize="default"/>
                    {"Этап пройден успешно!"}
                </h2>
                <p>
                    Для того чтобы перейти на следующий этап, нажмите на конпку "К следующему этапу".
                </p>
                <DialogActions>
                    <button onClick={OnFinishButtonHandler} className="button_classic">
                        К следующему этапу
                    </button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default SuccessDialog;
