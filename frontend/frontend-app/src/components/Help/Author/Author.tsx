import React from "react";
import authorImg from "../../../assets/img/author.jpg";
import style from "./Author.module.css";

const Author= () => {
    return(
        <div className={style.container}>
            <img src={authorImg}/>
            <p>Волков Алексей Эдуардович, студент группы СО251КОБ института управления, автоматизации и телекоммуникации
                дальневосточного государственного универститета
                путей сообщения.
            </p>
        </div>
    )
}

export default Author;