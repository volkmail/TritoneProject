import React from "react";
import style from "./Header.module.css";
import {NavLink} from "react-router-dom";
import logoImg from "../../assets/img/triton_logo.svg";
import DropMenu from "./DropMenu";
import {useSelector} from "react-redux";
import {GetUserInfo} from "../../redux/selectors/user-selector";

const Header = () => {
    const userInfo = useSelector(GetUserInfo);

    return (
        <div className={style.header_container}>
            <div className={style.header}>
                <div className={style.logo}>
                    <NavLink to={"/home"}>
                        <img src={logoImg} alt="logo_title"/>
                    </NavLink>
                    <p className="font_bold-center">Анализатор спектра цифровой интегрирующий "Тритон"</p>
                </div>
                <div className={style.functionalBlock}>
                    <div className={style.profileInfo}>
                        {userInfo
                            ?<>
                                <p>{userInfo.surname} {userInfo.name[0]}.{userInfo.patronymic[0]}.</p>
                                <p>{userInfo.role}</p>
                            </>
                            : `Загрузка профиля...`}
                    </div>
                    <div className={style.menu}>
                        <DropMenu/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Header;