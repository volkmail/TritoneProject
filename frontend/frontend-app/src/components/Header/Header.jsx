import React from "react";
import style from "./Header.module.css";
import {NavLink} from "react-router-dom";
import logoImg from "../../assets/img/triton_logo.svg";

const Header = () => {
    return (
        <div className={style.header_container}>
            <div className={style.header}>
                <div className={style.logo}>
                    <NavLink to={"/home"}>
                        <img src={logoImg} alt="logo_title"></img>
                    </NavLink>
                </div>
                <div className={style.logo_title}>
                    <p className="font_bold-center">Анализатор спектра цифровой интегрирующий<br/>"Тритон"</p>
                </div>
                <div className={style.menu}>
                    <NavLink id="help" className="button_classic" to={"/help"}>
                        Справочник
                    </NavLink>
                </div>
            </div>
        </div>
    );
}

export default Header;