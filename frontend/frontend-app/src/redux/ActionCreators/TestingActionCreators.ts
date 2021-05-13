import {DataSetType, TestingInfo} from "../../types/generalTypes";

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

const SetDataSet = (payload: DataSetType) => {
    return {
        type: "SET_DATASET",
        payload
    } as const
}

const ChangeSignalLevel = () => {
    return {
        type: "CHANGE_SIGNAL_LEVEL",
    } as const
}


export {
    GetTestingInfoAction,
    SetSectionCompleteAction,
    SetDataSet,
    ChangeSignalLevel
}