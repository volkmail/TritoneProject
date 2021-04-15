import {ThunkAction} from "redux-thunk";
import {TestingAPI} from "../../api/testingApi";
import {AppStateType} from "../store";
import {Dispatch} from "react";
import {DiagramElementType} from "../../types/generalTypes";
import {GetElements} from "../ActionCreators/DiagramActionCreators";
import {DiagramActionTypes} from "../../types/actionsTypes";
import {DataResponseCodesTypes} from "../../types/apiTypes";

type DiagramInitialStateType = typeof initialState;

let initialState = {
    listElements: [] as Array<DiagramElementType>,
    filedElements: [] as Array<DiagramElementType>
}

const diagramReducer = (state: DiagramInitialStateType = initialState, action: DiagramActionTypes): DiagramInitialStateType => {
    switch (action.type) {
        case "GET_DIAGRAM_ELEMENTS":
            return {
                ...state,
                listElements: [...action.elements],
            }
        case "DELETE_DIAGRAM_ELEMENT_IN_LIST":
            let popIndex = state.listElements.findIndex(elem => elem.elementId === action.elementId)
            let newElementsArray = [...state.listElements];
            newElementsArray.splice(popIndex, 1);
            return {
                ...state,
                listElements: [...newElementsArray],
                filedElements: [...state.filedElements, state.listElements[popIndex]]
            }
        case "DELETE_DIAGRAM_ELEMENT_ON_FIELD":
            return {
                ...state
            }
        default:
            return state;
    }
}

export {
    diagramReducer,
}

export type{
    DiagramInitialStateType
}