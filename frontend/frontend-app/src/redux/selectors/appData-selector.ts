import {AppStateType} from "../store";

const GetSectionsData = (state: AppStateType) => {
    return state.appData.testPart.sectionData;
}

const GetVariables = (state: AppStateType) => {
    return state.appData.testPart.variables;
}

export {
    GetSectionsData,
    GetVariables
}