import {EditActionsTypes} from "../../types/actionsTypes";
import {GroupEdit, QuizType} from "../../types/generalTypes";

type EditInitialStateType = typeof initialState;

let initialState = {
    groups: [] as Array<GroupEdit>,
    test: null as QuizType
}

const editReducer = (state: EditInitialStateType = initialState, action: EditActionsTypes): EditInitialStateType => {
    switch (action.type){
        case "SET_GROUPS":
            return {
                ...state,
                groups: action.groups
            }
        case "SET_TEST":
            return {
                ...state,
                test: action.test
            }
        default:
            return state;
    }
}

export{
    editReducer,
}

export type{
    EditInitialStateType
}