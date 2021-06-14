import {AppStateType} from "../store";

const SelectGroups = (state: AppStateType) => {
    return state.editData.groups;
}

const SelectTest = (state: AppStateType) => {
    return state.editData.test;
}

export {
    SelectGroups,
    SelectTest,
    
}