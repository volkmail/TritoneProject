import React from "react";
import style from "./Help.module.css";
import GeneralArticle from "./HelpArticles/GeneralArticle";
import EquipmentArticle from "./HelpArticles/EquipmentArticle";
import {useSelector} from "react-redux";
import {GetArticleId} from "../../redux/selectors/help-selector";
import ArticleList from "./HelpArticleList/ArticleList";

const Help = () => {

    const currentArticleId = useSelector(GetArticleId)

    let ChoiceArticle = (id: number): any =>{
        switch (id){
            case 1: return <GeneralArticle/>;
            case 2: return <EquipmentArticle/>;
            case 3: return <p>Здесь когда-то что-то появится :)</p>
            default: return <p>Something wrong!</p>
        }
    }

    return (
        <div className={style.info_block_container}>
            <div id="help_block" className={style.info_block_title}>
                <p className="font_bold-center">Справочные материалы</p>
            </div>
            <div className={style.info_block}>
                <ArticleList/>
                <div className={style.info_block_article_text}>
                    {ChoiceArticle(currentArticleId)}
                </div>
            </div>
        </div>
    );
}

export default Help;