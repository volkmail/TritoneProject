import React from "react";
import style from "./Main.module.css";

const Main = (props) => {
    return(
        <div className={style.main}>
            <div className={style.main_intro}>
                <p className="font_usual-center">Добро пожаловать!
                    Мы рады приветсвовать вас.
                    Данный демонстрационный стенд создан
                    для ознакомления с принципом работы и получания опыта использования
                    цифрового интегрирующего анализатора спекта "Тритон".
                    Для того, чтобы приступить к ознакомлению необходимо нажать кнопку "Начать выполнение рабты".
                    </p>
            </div>
                <a className={style.button_start}>Начать выполнение работы</a>
        </div>
    )
};

export default Main;