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

export{
    GetUserAccessToken,
    GetAuthError,
    GetUserInfo
}