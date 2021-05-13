import {CheckPoint, DiagramElementType} from "./generalTypes";
import {GroupType} from "./userTypes";

enum DataResponseCodesTypes {
    Success = 0,
    Error = 1
}

enum ServerResponseCodesTypes{
    Ok = 200,
    Unauthorized = 401
}

type ResponseRegType = {
    isReg: string
}

type ResponseGroupsType = {
    groups: Array<GroupType>
}

type ResponseLoginCheckType = {
    message: string
}

type ResponseAuthDataType = {
    accessToken?:string
    errorMessage?: string
}

type ResponseDiagramElementsType = {
    data: Array<DiagramElementType>
    resultCode: DataResponseCodesTypes
}

type ResponseSectionElement = {
    isSectionResultSet: boolean
}

type ResponseTestingInfo = {
    sections: Array<Boolean>,
    checkPoints: {
        window1Cps?: Array<CheckPoint>,
        window2Cps?: Array<CheckPoint>
    }
}

type ResponseCurrentStep = {
    currentStep: number
}

type ResponseDataSet = {
    frequency: Array<number>,
    signalLevelMax: Array<number>,
    signalLevel: Array<number>,
    signalLevelMin: Array<number>
}

export type {
    ResponseDiagramElementsType,
    ResponseAuthDataType,
    ResponseLoginCheckType,
    ResponseGroupsType,
    ResponseRegType,
    ResponseSectionElement,
    ResponseTestingInfo,
    ResponseCurrentStep,
    ResponseDataSet
}

export {
    DataResponseCodesTypes,
    ServerResponseCodesTypes,
}