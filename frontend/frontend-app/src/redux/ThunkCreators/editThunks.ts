import {ThunkAction} from "redux-thunk";
import {AppStateType} from "../store";
import {EditActionsTypes} from "../../types/actionsTypes";
import {Dispatch} from "react";
import {EditApi} from "../../api/editApi";
import {setGroups, setTest} from "../ActionCreators/EditActionCreators";

const GetGroups = (): ThunkAction<Promise<void>, AppStateType, unknown, EditActionsTypes> =>
    async (dispatch: Dispatch<EditActionsTypes>) => {
        const responseData = await EditApi.GetGroups();
        if(responseData && responseData.groupResponse){
            dispatch(setGroups(responseData.groupResponse));
        }
    }

const GetTest = (): ThunkAction<Promise<void>, AppStateType, unknown, EditActionsTypes> =>
    async (dispatch: Dispatch<EditActionsTypes>) => {
        const responseData = await EditApi.GetTest();
        if(responseData && responseData.test){
            dispatch(setTest(responseData.test));
        }
    }

export {
    GetGroups,
    GetTest
}