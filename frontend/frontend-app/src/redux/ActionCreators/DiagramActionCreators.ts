import { DiagramElementType } from "../../types/generalTypes"

const GetElements = (elements: Array<DiagramElementType>) => {
    return {
        type: "GET_DIAGRAM_ELEMENTS",
        elements: elements
    } as const
}

const PopElement = (elementId: number) => {
    return {
        type: "DELETE_DIAGRAM_ELEMENT_IN_LIST",
        elementId
    } as const
}

const DeleteElementOnField = (elementId: number) => {
    return {
        type: "DELETE_DIAGRAM_ELEMENT_ON_FIELD",
        elementId
    } as const
}

export {
    GetElements,
    PopElement,
    DeleteElementOnField
}