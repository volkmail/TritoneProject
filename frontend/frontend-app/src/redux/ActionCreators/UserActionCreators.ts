import {GroupType} from "../../types/userTypes";

const AuthMe = (accessToken: string) => {
    return {
        type: "AUTH_ME",
        accessToken
    } as const
}

const AuthError = (errorMessage: string) => {
    return{
        type: "AUTH_ERROR",
        errorMessage
    } as const
}

const LoginIsBusy = () => {
    return{
        type:"LOGIN_IS_BUSY"
    } as const
}

const LoginNotBusy = () => {
    return{
        type:"LOGIN_NOT_BUSY"
    } as const
}

const GetGroups = (groups: Array<GroupType>) => {
    return{
        type: "GET_GROUPS",
        groups
    } as const
}

const RegistrationStudent = () => {
    return{
        type:"REG_ME"
    } as const
}

const InitUser = () => {
    return{
        type:"INIT_USER"
    } as const
}

const LogOut = () => {
    return {
        type:"LOG_OUT"
    } as const
}

const FetchingOn = () => {
    return{
        type:"IS_FETCHING_ON"
    } as const
}

const FetchingOff = () => {
    return{
        type:"IS_FETCHING_OFF"
    } as const
}

export {
    AuthMe,
    AuthError,
    LoginIsBusy,
    GetGroups,
    LoginNotBusy,
    RegistrationStudent,
    InitUser,
    LogOut,
    FetchingOn,
    FetchingOff
}