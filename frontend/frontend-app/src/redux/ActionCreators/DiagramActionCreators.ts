import { DiagramElementType } from "../../types/generalTypes"

const GetElements = (elements: Array<DiagramElementType>) => {
    return {
        type: "GET_DIAGRAM_ELEMENTS",
        elements: elements
    } as const
}

const AddElementOnField = (elementId: number) => {
    return {
        type: "ADD_DIAGRAM_ELEMENT_TO_FIELD",
        elementId
    } as const
}

const DeleteElementFromField = (elementId: number) => {
    return {
        type: "DELETE_DIAGRAM_ELEMENT_FROM_FIELD",
        elementId
    } as const
}

const SetCurrentDiagramStep = (currentDiagramStep: number) => {
    return{
        type: "SET_CURRENT_DIAGRAM_STEP",
        currentDiagramStep
    } as const
}

const GoToNextStep = () => {
    return{
        type: "GO_TO_NEXT_STEP"
    } as const
}

const RefreshElementsList = () => {
    return{
        type:"REFRESH_ELEMENTS_LIST"
    } as const
}

const SetSAZOn = () => {
    return{
        type:"SET_SAZ_ON"
    } as const
}

export {
    GetElements,
    AddElementOnField,
    DeleteElementFromField,
    SetCurrentDiagramStep,
    GoToNextStep,
    RefreshElementsList,
    SetSAZOn
}