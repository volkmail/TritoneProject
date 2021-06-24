import {AppStateType} from "../store";

const GetUserAccessToken = (state: AppStateType) => {
    if(state.userData.currentUser.accessToken.length === 0)
        return null;
    else
        return state.userData.currentUser.accessToken;
}

const GetUserInfo = (state: AppStateType) => {
    if(state.userData.currentUser.accessToken.length > 0){
        return state.userData.currentUser
    }
    else
        return null;
}

const GetAuthError = (state: AppStateType) => {
    if (state.userData.authError.length === 0)
        return null;
    else
        return state.userData.authError;
}

const GetGroups = (state: AppStateType) => {
    if(state.userData.groups.length === 0){
        return null;
    }
    else{
        return state.userData.groups;
    }
}

const isRegDone = (state: AppStateType) => {
    return state.userData.isReg;
}

const isLoginBusy = (state: AppStateType) => {
    return state.userData.loginIsBusy;
}

const selectIsFetching = (state: AppStateType) => {
    return state.userData.isFetching
}

export{
    GetUserAccessToken,
    GetAuthError,
    GetUserInfo,
    GetGroups,
    isRegDone,
    isLoginBusy,
    selectIsFetching
}