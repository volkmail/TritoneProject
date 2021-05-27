import React, {useEffect} from "react";
import {NavLink} from "react-router-dom";
import style from "./ViewResultPoints.module.css";
import {useDispatch, useSelector} from "react-redux";
import {ResetProgress, ResetSignalValuesToStep4} from "../../../../redux/ActionCreators/CalcActionsCreators";
import {GetPointsInfo} from "../../../../redux/selectors/calc-selector";
import {GetSummaryPointsProgress} from "../../../../redux/ThunkCreators/testingThunks";

const ViewResultPoints = () => {
    const pointsInfo = useSelector(GetPointsInfo);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(GetSummaryPointsProgress());
        dispatch(ResetProgress());
        dispatch(ResetSignalValuesToStep4());
        sessionStorage.getItem("currentMeasureSequence") && sessionStorage.removeItem("currentMeasureSequence");
    }, [])

    return (
        <div className={style.container}>
            <div className={style.title}>
                <h1>ПРОВЕДЕНИЕ ИЗМЕРЕНИЙ</h1>
                <p>Выберете конструкцию для измерений</p>
            </div>
            <div className={style.grid}>
                {pointsInfo?.map(el => <div className={style.grid_elem}>
                    <NavLink
                        to={`/testing/viewPoints/Point/${el.id}`}
                        className={`${el.isComplete?style.grid_elem_complete : style.grid_elem_notComplete}`}
                    >
                        {el.pointTitle.toUpperCase()}
                    </NavLink>
                </div>)
                }
            </div>
        </div>
    )
}

export default ViewResultPoints;