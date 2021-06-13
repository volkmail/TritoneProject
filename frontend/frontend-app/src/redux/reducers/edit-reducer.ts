import {EditActionsTypes} from "../../types/actionsTypes";
import {GroupEdit} from "../../types/generalTypes";

type EditInitialStateType = typeof initialState;

let initialState = {
    groups: [] as Array<GroupEdit>,
}

const editReducer = (state: EditInitialStateType = initialState, action: EditActionsTypes): EditInitialStateType => {
    switch (action.type){
        case "SET_GROUPS":
            return {
                ...state,
                groups: action.groups
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