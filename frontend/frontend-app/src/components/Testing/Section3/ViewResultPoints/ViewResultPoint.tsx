import React, {useEffect, useState} from "react";
import {NavLink, useParams} from "react-router-dom";
import style from "./ViewResultPoints.module.css"
import {useDispatch} from "react-redux";
import {ClearDataSet} from "../../../../redux/ActionCreators/CalcActionsCreators";

type useParamsType = {
    pointName: string
}

const localState = {
    calculationInfo: [
        {
            id: 0,
            pointName: "Door",
            pointTitle: "Дверь",
            results: [{
                id:0,
                typeName: "Test",
                typeTitle: "Измерение тест-сигнала",
                result: false,
            }, {
                id:1,
                typeName: "Signal",
                typeTitle: "Измерение информативного сигнала и фона",
                result: false,
            }, {
                id:2,
                typeName: "Back",
                typeTitle: "Измерение фона",
                result: false,
            }, {
                id:3,
                typeName: "SAZ",
                typeTitle: "Измерение помехи",
                result: false,
            }
            ]
        }, {
            id: 1,
            pointName: "Battery",
            pointTitle: "Батарея",
            results: [{
                id:0,
                typeName: "Test",
                typeTitle: "Измерение тест-сигнала",
                result: false,
            }, {
                id:1,
                typeName: "Signal",
                typeTitle: "Измерение информативного сигнала и фона",
                result: false,
            }, {
                id:2,
                typeName: "Back",
                typeTitle: "Измерение фона",
                result: false,
            }, {
                id:3,
                typeName: "SAZ",
                typeTitle: "Измерение помехи",
                result: false,
            }
            ]
        }, {
            id:2,
            pointName: "Window",
            pointTitle: "Окно",
            results: [{
                id:0,
                typeName: "Test",
                typeTitle: "Измерение тест-сигнала",
                result: false,
            }, {
                id:1,
                typeName: "Signal",
                typeTitle: "Измерение информативного сигнала и фона",
                result: false,
            }, {
                id:2,
                typeName: "Back",
                typeTitle: "Измерение фона",
                result: false,
            }, {
                id:3,
                typeName: "SAZ",
                typeTitle: "Измерение помехи",
                result: false,
            }
            ]
        }, {
            id:3,
            pointName: "Floor",
            pointTitle: "Пол",
            results: [{
                id:0,
                typeName: "Test",
                typeTitle: "Измерение тест-сигнала",
                result: false,
            }, {
                id:1,
                typeName: "Signal",
                typeTitle: "Измерение информативного сигнала и фона",
                result: false,
            }, {
                id:2,
                typeName: "Back",
                typeTitle: "Измерение фона",
                result: false,
            }, {
                id:3,
                typeName: "SAZ",
                typeTitle: "Измерение помехи",
                result: false,
            }
            ]
        }, {
            id:4,
            pointName: "Ceiling",
            pointTitle: "Потолок",
            results: [{
                id:0,
                typeName: "Test",
                typeTitle: "Измерение тест-сигнала",
                result: false,
            }, {
                id:1,
                typeName: "Signal",
                typeTitle: "Измерение информативного сигнала и фона",
                result: false,
            }, {
                id:2,
                typeName: "Back",
                typeTitle: "Измерение фона",
                result: false,
            }, {
                id:3,
                typeName: "SAZ",
                typeTitle: "Измерение помехи",
                result: false,
            }
            ]
        }, {
            id:5,
            pointName: "Wall",
            pointTitle: "Стена",
            results: [{
                id:0,
                typeName: "Test",
                typeTitle: "Измерение тест-сигнала",
                result: false,
            }, {
                id:1,
                typeName: "Signal",
                typeTitle: "Измерение информативного сигнала и фона",
                result: false,
            }, {
                id:2,
                typeName: "Back",
                typeTitle: "Измерение фона",
                result: false,
            }, {
                id:3,
                typeName: "SAZ",
                typeTitle: "Измерение помехи",
                result: false,
            }
            ]
        }
    ],
    summaryResults:[[false,false,false,false], [false,false,false,false],
        [false,false,false,false],[false,false,false,false],
        [false,false,false,false],[false,false,false,false]]
}


const ViewResultPoint = () => {
    let {pointName} = useParams<useParamsType>();
    const [pointTitle, SetTitleName] = useState<string>("");

    const dispatch = useDispatch();

    useEffect(()=>{
        SetTitleName(localState.calculationInfo.find(el => el.pointName === pointName)!.pointTitle);
        dispatch(ClearDataSet());
    },[])

    return (
        <div className={style.container}>
            <div className={style.title}>
                <h1>ПРОВЕДЕНИЕ ИЗМЕРЕНИЙ</h1>
                <p>Тип конструкции: {pointTitle}.<br/>Выберете тип измерений.</p>
            </div>
            <div className={style.grid}>
                <div className={style.grid_types}>
                    <NavLink to={"/testing/viewPoints/Point/"+pointName+"/Calc/Test"}>Измерение тест-сигнала</NavLink>
                </div>
                <div className={style.grid_types}>
                    <NavLink to={"/testing/viewPoints/Point/"+pointName+"/Calc/Signal"}>Измерение информативного сигнала и фона</NavLink>
                </div>
                <div className={style.grid_types}>
                    <NavLink to={"/testing/viewPoints/Point/"+pointName+"/Calc/Back"}>Измерение фона</NavLink>
                </div>
                <div className={style.grid_types}>
                    <NavLink to={"/testing/viewPoints/Point/"+pointName+"/Calc/SAZ"}>Измерение помехи</NavLink>
                </div>
            </div>
        </div>
    )
}

export default ViewResultPoint;