import {GroupEdit, QuizType} from "../../types/generalTypes";

const setGroups = (groups: Array<GroupEdit>) => {
    return {
        type: 'SET_GROUPS',
        groups
    } as const
}

const setTest = (test: QuizType) => {
    return {
        type: 'SET_TEST',
        test
    } as const
}


// const addGroup = (groupName: string) => {
//     return {
//         type: "ADD_GROUYP"
//     }
// }

export {
    setGroups,
    setTest,

}