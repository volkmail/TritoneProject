import React from "react";
import style from "./Main.module.css";
import {NavLink} from "react-router-dom";

const Main = () => {
    return(
        <div className={style.main}>
            <div className={style.main_intro}>
                <p className="font_usual-center">Добро пожаловать!
                    Мы рады приветсвовать вас.
                    Данный демонстрационный стенд создан
                    для ознакомления с принципом работы и получения опыта использования
                    цифрового интегрирующего анализатора спекта "Тритон".
                    Для того, чтобы приступить к ознакомлению необходимо нажать кнопку "Начать выполнение рабты".
                    </p>
            </div>
                <NavLink to={'/testing'} className={style.button_start}>Начать выполнение работы</NavLink>
        </div>
    )
};

export default Main;