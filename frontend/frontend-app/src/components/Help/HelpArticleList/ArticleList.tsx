import React, {MouseEvent} from 'react';
import style from  './ArticleList.module.css';
import {useDispatch} from "react-redux";
import {choiceArticle} from "../../../redux/ActionCreators/HelpActionCreators";

const ArticleList = () => {

    const dispatchArticleId = useDispatch()

    let onChoiceArticle =  (event: MouseEvent<HTMLLIElement>) =>{
        dispatchArticleId(choiceArticle(parseInt(event.currentTarget.id)));
    }

    return(
        <div className={style.info_block_article_list}>
            <ul id='article_list'>
                <li id="1" onClick={onChoiceArticle}>Общие сведения</li>
                <li id="2" onClick={onChoiceArticle}>Комплектация</li>
                <li id="3" onClick={onChoiceArticle}>Управление</li>
            </ul>
        </div>
    );
}

export default ArticleList;