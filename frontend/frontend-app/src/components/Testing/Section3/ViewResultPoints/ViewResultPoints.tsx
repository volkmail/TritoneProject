import React from "react";
import { NavLink } from "react-router-dom";
import style from "./ViewResultPoints.module.css";

const ViewResultPoints = () => {
    return (
        <div className={style.container}>
            <div className={style.title}>
                <h1>ПРОВЕДЕНИЕ ИЗМЕРЕНИЙ</h1>
                <p>Выберете конструкцию для измерений</p>
            </div>
            <div className={style.grid}>
                <div className={style.grid_elem}>
                    <NavLink to={"/testing/viewPoints/Point/Door"}>ДВЕРЬ</NavLink>
                </div>
                <div className={style.grid_elem}>
                    <NavLink to={"/testing/viewPoints/Point/Battery"}>БАТАРЕЯ</NavLink>
                </div>
                <div className={style.grid_elem}>
                    <NavLink to={"/testing/viewPoints/Point/Window"}>ОКНО</NavLink>
                </div>
                <div className={style.grid_elem}>
                    <NavLink to={"/testing/viewPoints/Point/Floor"}>ПОЛ</NavLink>
                </div>
                <div className={style.grid_elem}>
                    <NavLink to={"/testing/viewPoints/Point/Ceiling"}>ПОТОЛОК</NavLink>
                </div>
                <div className={style.grid_elem}>
                    <NavLink to={"/testing/viewPoints/Point/Wall"}>СТЕНА</NavLink>
                </div>
            </div>
        </div>
    )
}

export default ViewResultPoints;