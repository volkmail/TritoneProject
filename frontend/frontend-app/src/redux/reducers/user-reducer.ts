import {UserActionsTypes} from "../../types/actionsTypes";
import jwtDecode from "jwt-decode";
import {UserData} from "../../types/userTypes";

// enum UserRole {
//     admin = "admin",
//     teacher = "teacher",
//     student = "student"
// }

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
        role: "" as string
    },
    regStudentData: {
        login: "" as string,
        password: "" as string,
        name: "" as string,
        surname: "" as string,
        patronymic: "" as string,
        groupName: "" as string
    },
    authError: "" as string
}

const userReducer = (state: UserInitialStateType = initialState, action: UserActionsTypes): UserInitialStateType => {
    switch (action.type){
        case "AUTH_ME": {
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
        case "AUTH_ERROR":{
            return {
                ...state,
                authError: action.errorMessage
            }
        }
    }
    return state;
}

export {
    userReducer
}