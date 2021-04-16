const AuthMe = (accessToken: string) => {
    return {
        type: "AUTH_ME",
        accessToken
    } as const
}

const AuthErrorCreate = (errorMessage: string) => {
    return{
        type: "AUTH_ERROR",
        errorMessage
    } as const
}

export {
    AuthMe,
    AuthErrorCreate
}