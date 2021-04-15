import {ThunkAction} from "redux-thunk";
import {AppStateType} from "../store";
import {DiagramActionTypes} from "../../types/actionsTypes";
import {Dispatch} from "react";
import {TestingAPI} from "../../api/testingApi";
import {DataResponseCodesTypes} from "../../types/apiTypes";
import {GetElements} from "../ActionCreators/DiagramActionCreators";

const getDiagramElements = (): ThunkAction<Promise<void>, AppStateType, unknown, DiagramActionTypes> =>
    async (dispatch: Dispatch<DiagramActionTypes>) => {
        const responseData = await TestingAPI.GetDiagramElements();
        if (responseData && responseData.resultCode === DataResponseCodesTypes.Success)
            dispatch(GetElements(responseData.data));
    }

export {
    getDiagramElements
}