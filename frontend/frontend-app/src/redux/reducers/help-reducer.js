const CHOICE_ARTICLE = "CHOICE_ARTICLE";

let initial_state = {
    articleId: 1
}

const helpReducer = (state = initial_state, action) => {
    switch (action.type){
        case CHOICE_ARTICLE:
            return {
                ...state,
                articleId: action.articleId
            };
        default:
            return state;
    }
}

//ActionCreators
const choiceArticle = (articleId) => {
    return {
        type: CHOICE_ARTICLE,
        articleId: articleId
    }
}

export{
    helpReducer,
    choiceArticle
}