import {DiagramElementType} from "./generalTypes";

enum DataResponseCodesTypes {
    Success = 0,
    Error = 1
}

enum ServerResponseCodesTypes{
    Ok = 200,
    Unauthorized = 401
}

type ResponseAuthDataType = {
    accessToken?:string
    errorMessage?: string
}

type ResponseDiagramElementsType = {
    data: Array<DiagramElementType>
    resultCode: DataResponseCodesTypes
}

export type {
    ResponseDiagramElementsType,
    ResponseAuthDataType
}

export {
    DataResponseCodesTypes,
    ServerResponseCodesTypes,
}