import {ThunkAction} from "redux-thunk";
import {UserActionsTypes} from "../../types/actionsTypes";
import {Dispatch} from "react";
import {UserAPI} from "../../api/userApi";
import {AppStateType} from "../store";
import {AuthErrorCreate, AuthMe} from "../ActionCreators/UserActionCreators";

const LogInUser = (login: string, password: string): ThunkAction<Promise<void>, AppStateType, unknown, UserActionsTypes> =>
    async (dispatch: Dispatch<UserActionsTypes>) => {
        const responseData = await UserAPI.AuthMe(login, password);
        if(responseData){
            if (responseData.errorMessage)
                dispatch(AuthErrorCreate(responseData.errorMessage));
            if (responseData.accessToken)
                dispatch(AuthMe(responseData.accessToken));
        }
}

export {
    LogInUser
}