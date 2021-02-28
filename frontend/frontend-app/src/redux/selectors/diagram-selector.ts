import {AppStateType} from "../store";

export const GetListElements = (state: AppStateType) => {
    return state.diagramPage.listElements;
}