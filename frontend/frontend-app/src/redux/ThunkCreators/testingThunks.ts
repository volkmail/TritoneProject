import {ThunkAction} from "redux-thunk";
import {AppStateType} from "../store";
import {DiagramActionTypes, TestingActionsTypes} from "../../types/actionsTypes";
import {Dispatch} from "react";
import {DataResponseCodesTypes} from "../../types/apiTypes";
import {TestingAPI} from "../../api/testingApi";
import {GetElements} from "../ActionCreators/DiagramActionCreators";

const GetDiagramElements = (): ThunkAction<Promise<void>, AppStateType, unknown, DiagramActionTypes> =>
    async (dispatch: Dispatch<DiagramActionTypes>) => {
        const responseData = await TestingAPI.GetDiagramElements();
        if (responseData && responseData.resultCode === DataResponseCodesTypes.Success)
            dispatch(GetElements(responseData.data));
    }

const GetTestingInfo = (): ThunkAction<Promise<void>, AppStateType, unknown, TestingActionsTypes> =>
    async (dispatch: Dispatch<TestingActionsTypes>) => {
        //const responseData = await UserAPI.GetStudentGroups();
}

const SetSectionComplete = (sectionNumber: number): ThunkAction<Promise<void>, AppStateType, unknown, TestingActionsTypes> =>
    async (dispatch: Dispatch<TestingActionsTypes>) => {
        //const responseData = await UserAPI.GetStudentGroups();
}

export {
    GetTestingInfo,
    GetDiagramElements
}