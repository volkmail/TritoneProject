import {ThunkAction} from "redux-thunk";
import {TestingAPI} from "../../api/api";
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
        case "POP_DIAGRAM_ELEMENT":
            let popIndex = state.listElements.findIndex(elem => elem.element_id === action.elementId)
            let newElementsArray = [...state.listElements];
            newElementsArray.splice(popIndex, 1);

            return {
                ...state,
                listElements: [...newElementsArray]
            }
        case "DELETE_DIAGRAM_ELEMENT_ON_FIELD":
            return {
                ...state
            }
        default:
            return state;
    }
}

//ThunkCreators
const getDiagramElements = (): ThunkAction<Promise<void>, AppStateType, unknown, DiagramActionTypes> =>
    async (dispatch: Dispatch<DiagramActionTypes>) => {
        const responseData = await TestingAPI.GetDiagramElements();
        if (responseData && responseData.ResultCode === DataResponseCodesTypes.Success)
            dispatch(GetElements(responseData.data.elements));
    }

export {
    diagramReducer,
    getDiagramElements,
}

export type{
    DiagramInitialStateType
}