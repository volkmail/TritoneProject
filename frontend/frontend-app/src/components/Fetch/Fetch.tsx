import React from "react";
import style from "./Fetch.module.css"
import logoImg from "../../assets/img/triton_logo.svg";

const Fetch = () => {
    return(
        <div className={style.fetchContainer}>
            <div className={style.fetchElem}>
                <div>
                    <img src={logoImg} alt="logo_title"/>
                </div>

                <p>Загрузка...</p>
            </div>
        </div>
    )
}

export default Fetch;