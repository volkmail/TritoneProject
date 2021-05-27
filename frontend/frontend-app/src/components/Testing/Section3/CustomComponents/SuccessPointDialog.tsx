import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import Slide from '@material-ui/core/Slide';
import { TransitionProps } from '@material-ui/core/transitions';
import {useDispatch} from "react-redux";
import {SetNextStep, SetStepComplete} from "../../../../redux/ActionCreators/CalcActionsCreators";
import style from "../ViewResult.module.css"
import CheckCircleTwoToneIcon from '@material-ui/icons/CheckCircleTwoTone';
import {useHistory, useParams} from "react-router-dom";
import {SavePointProgress} from "../../../../redux/ThunkCreators/testingThunks";

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & { children?: React.ReactElement<any, any> },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

type useParamsType = {
    pointId: string,
}

const SuccessPointDialog = () => {
    const [open, setOpen] = React.useState(true);
    const history = useHistory();
    let {pointId} = useParams<useParamsType>();

    const dispatch = useDispatch();

    const OnFinishButtonHandler = async () => {
        await dispatch(SavePointProgress(parseInt(pointId)));
        setOpen(false);
        history.push("/testing/viewPoints");
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
                    {"Замеры и расчеты на данной конструции завершены успешно!"}
                </h2>
                <p>
                    Для того чтобы выбрать другую конструкцию, нажмите на конпку "К выбору конструкции".
                </p>
                <DialogActions>
                    <button onClick={OnFinishButtonHandler} className="button_classic">
                        К выбору конструкции
                    </button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default SuccessPointDialog;
