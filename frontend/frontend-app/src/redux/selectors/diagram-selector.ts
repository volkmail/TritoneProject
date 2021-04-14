import {AppStateType} from "../store";

const GetListElements = (state: AppStateType) => {
    return state.diagramPage.listElements;
}

export{
    GetListElements
}