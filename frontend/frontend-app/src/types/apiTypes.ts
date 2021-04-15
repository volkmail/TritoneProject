import {DiagramElementType} from "./generalTypes";

enum DataResponseCodesTypes {
    Success = 0,
    Error = 1
}

enum ServerResponseCodesTypes{
    Ok = 200,
    Unauthorized = 401
}

type ResponseDiagramElementsType = {
    data: Array<DiagramElementType>
    resultCode: DataResponseCodesTypes
}

export type {
    ResponseDiagramElementsType
}

export {
    DataResponseCodesTypes,
    ServerResponseCodesTypes
}