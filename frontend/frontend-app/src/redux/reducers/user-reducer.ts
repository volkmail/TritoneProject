import {UserActionsTypes} from "../../types/actionsTypes";
import jwtDecode from "jwt-decode";
import {GroupType, UserData} from "../../types/userTypes";

type UserInitialStateType = typeof initialState;

let initialState = {
    currentUser: {
        accessToken: "" as string,
        userId: "" as string,
        login: "" as string,
        name: "" as string,
        surname: "" as string,
        patronymic: "" as string,
        groupName: "" as string,
        role: "" as string,
    },
    authError: "" as string,
    loginIsBusy: false as boolean,
    isReg: false as boolean,
    groups: [] as Array<GroupType>
}

const userReducer = (state: UserInitialStateType = initialState, action: UserActionsTypes): UserInitialStateType => {
    switch (action.type) {
        case "INIT_USER": {
            let token = localStorage.getItem("JWT")
            if (token) {
                let userData: UserData = jwtDecode(token);
                return {
                    ...state,
                    currentUser: {
                        accessToken: token,
                        userId: userData.userId,
                        login: userData.login,
                        name: userData.name,
                        surname: userData.surname,
                        patronymic: userData.patronymic,
                        role: userData.role,
                        groupName: userData.groupName
                    }
                }
            }
            return {
                ...state
            }
        }
        case "AUTH_ME": {
            localStorage.setItem("JWT", action.accessToken);
            let userData: UserData = jwtDecode(action.accessToken);
            return {
                ...state,
                currentUser: {
                    accessToken: action.accessToken,
                    userId: userData.userId,
                    login: userData.login,
                    name: userData.name,
                    surname: userData.surname,
                    patronymic: userData.patronymic,
                    role: userData.role,
                    groupName: userData.groupName
                }
            }
        }
        case "AUTH_ERROR": {
            return {
                ...state,
                authError: action.errorMessage
            }
        }
        case "GET_GROUPS": {
            return {
                ...state,
                groups: action.groups
            }
        }
        case "LOGIN_IS_BUSY": {
            return {
                ...state,
                loginIsBusy: true
            }
        }
        case "LOGIN_NOT_BUSY": {
            return {
                ...state,
                loginIsBusy: false
            }
        }
        case "REG_ME": {
            return {
                ...state,
                isReg: true
            }
        }
        default: {
            return state;
        }
    }
}

export {
    userReducer
}