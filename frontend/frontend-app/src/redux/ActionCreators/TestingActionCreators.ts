import {TestingInfo} from "../../types/generalTypes";

const GetTestingProgressAction = (testingProgress: TestingInfo) => {
    return {
        type: "GET_TESTING_PROGRESS",
        testingProgress
    } as const
}

const SetSectionCompleteAction = (sectionNumber: number) => {
    return {
        type: "SET_SECTION",
        sectionNumber
    } as const
}


export {
    GetTestingProgressAction,
    SetSectionCompleteAction,
}