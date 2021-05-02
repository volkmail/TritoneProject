import {TestingInfo} from "../../types/generalTypes";

const GetTestingInfoAction = (testingInfo: TestingInfo) => {
    return {
        type: "GET_TESTING_INFO",
        testingInfo
    } as const
}

const SetSectionCompleteAction = (sectionNumber: number) => {
    return {
        type: "SET_SECTION",
        sectionNumber
    } as const
}

export {
    GetTestingInfoAction,
    SetSectionCompleteAction
}