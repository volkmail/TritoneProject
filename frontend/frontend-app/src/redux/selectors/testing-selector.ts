import {AppStateType} from "../store";

const GetSections = (state: AppStateType): Array<boolean> | null => {
    return state.testingData.sections;
}

export {
    GetSections,

}