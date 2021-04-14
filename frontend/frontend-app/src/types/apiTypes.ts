import {DiagramElementType} from "./generalTypes";

enum DataResponseCodesTypes {
    Success = 0,
    Error = 1
}

enum ConnectionResponseCodesTypes{
    ConnectionSuccess = 200
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
    ConnectionResponseCodesTypes
}