import React from 'react';
import style from  './ArticleList.module.css';

const ArticleList = (props) => {

    let onChoiceArticle =  (event) =>{
        props.choiceArticle(parseInt(event.target.id));
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