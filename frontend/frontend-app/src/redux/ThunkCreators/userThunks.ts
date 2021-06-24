import {ThunkAction} from "redux-thunk";
import {UserActionsTypes} from "../../types/actionsTypes";
import {Dispatch} from "react";
import {UserAPI} from "../../api/userApi";
import {AppStateType} from "../store";
import {
    AuthError,
    AuthMe, FetchingOn, FetchingOff,
    GetGroups,
    LoginIsBusy,
    LoginNotBusy,
    RegistrationStudent
} from "../ActionCreators/UserActionCreators";

const LogInUser = (login: string, password: string): ThunkAction<Promise<void>, AppStateType, unknown, UserActionsTypes> =>
    async (dispatch: Dispatch<UserActionsTypes>) => {
        dispatch(FetchingOn());
        const responseData = await UserAPI.AuthMe(login, password);
        if(responseData){
            if (responseData.errorMessage){
                dispatch(FetchingOff());
                dispatch(AuthError(responseData.errorMessage));
            }
            if (responseData.accessToken){
                dispatch(FetchingOff());
                dispatch(AuthMe(responseData.accessToken));
                dispatch(AuthError(""));
            }
        }
}

const IsLoginBusy = (login: string): ThunkAction<Promise<void>, AppStateType, unknown, UserActionsTypes> =>
    async (dispatch: Dispatch<UserActionsTypes>) => {
        const responseData = await UserAPI.CheckLoginOriginal(login);
        if(responseData){
            if (responseData.message !== "0")
                dispatch(LoginIsBusy());
            else
                dispatch(LoginNotBusy());
        }
}

const GetStudentsGroups = (): ThunkAction<Promise<void>, AppStateType, unknown, UserActionsTypes> =>
    async (dispatch: Dispatch<UserActionsTypes>) => {
        const responseData = await UserAPI.GetStudentGroups();
        if(responseData){
            if(responseData.groups.length > 0){
                dispatch(GetGroups(responseData.groups));
            }
        }
}

const RegistrStudent = (login: string, password: string, name: string, surname: string, patronymic: string, groupName:string): ThunkAction<Promise<void>, AppStateType, unknown, UserActionsTypes> =>
    async (dispatch: Dispatch<UserActionsTypes>) => {
        dispatch(FetchingOn());
        const responseData = await UserAPI.RegMe(login, password, name, surname, patronymic, groupName);
        if(responseData){
            if(responseData.isReg === "0"){
                dispatch(FetchingOff());
                dispatch(RegistrationStudent());
            }
        }
    }

export {
    LogInUser,
    IsLoginBusy,
    GetStudentsGroups,
    RegistrStudent
}