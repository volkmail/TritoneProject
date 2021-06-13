import {ThunkAction} from "redux-thunk";
import {AppStateType} from "../store";
import {EditActionsTypes} from "../../types/actionsTypes";
import {Dispatch} from "react";
import {EditApi} from "../../api/editApi";
import {setGroups} from "../ActionCreators/EditActionCreators";

const GetGroups = (): ThunkAction<Promise<void>, AppStateType, unknown, EditActionsTypes> =>
    async (dispatch: Dispatch<EditActionsTypes>) => {
        const responseData = await EditApi.GetGroups();
        if(responseData && responseData.groupResponse){
            dispatch(setGroups(responseData.groupResponse));
        }
    }

export {
    GetGroups
}