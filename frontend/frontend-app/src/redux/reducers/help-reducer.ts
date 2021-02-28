type HelpInitialStateType = typeof initialState;

let initialState = {
    articleId: 1
}

const helpReducer = (state: HelpInitialStateType = initialState, action: any): HelpInitialStateType => {
    switch (action.type){
        case "CHOICE_ARTICLE":
            return {
                ...state,
                articleId: action.articleId,
            };
        default:
            return state;
    }
}

export{
    helpReducer,
}

export type{
    HelpInitialStateType
}