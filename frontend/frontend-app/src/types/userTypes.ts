type UserData = {
    userId: string,
    login: string,
    name: string,
    surname: string,
    patronymic: string,
    groupName: string,
    role: string
}

type GroupType = {
    groupName: string,
    groupId: string
}

export type {
    UserData,
    GroupType
}