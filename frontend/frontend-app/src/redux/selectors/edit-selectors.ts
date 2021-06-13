import {AppStateType} from "../store";

const SelectGroups = (state: AppStateType) => {
    return state.editData.groups;
}

export {
    SelectGroups
}