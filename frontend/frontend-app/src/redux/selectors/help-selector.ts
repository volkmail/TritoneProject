import {AppStateType} from "../store";

export const GetArticleId = (state: AppStateType) => {
    return state.helpPage.articleId;
}