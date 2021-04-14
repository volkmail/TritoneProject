import {AppStateType} from "../store";

const GetSectionsData = (state: AppStateType) => {
    return state.appData.testPart.sectionData;
}

export {
    GetSectionsData
}