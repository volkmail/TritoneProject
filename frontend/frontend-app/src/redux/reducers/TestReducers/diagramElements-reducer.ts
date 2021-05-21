import {DiagramElementType, DiagramStepInfo} from "../../../types/generalTypes";
import {DiagramActionTypes} from "../../../types/actionsTypes";

type DiagramInitialStateType = typeof initialState;

let initialState = {
    fullListElements: [] as Array<DiagramElementType>,
    listElements: [] as Array<DiagramElementType>,
    stepsResults: [{
        title: "Этап1. Калибровка",
        connections: ["5a-1b", "2a-5b", "6a-2b", "3a-6b", "4a-3b"]
    }, {
        title: "Этап2. Измерение тест-сигнала (Акустика)",
        connections: ["5a-1b", "2a-5b", "6a-2b", "7a-6b", "11a-14b"]
    }, {
        title: "Этап3. Измерение информативного сигнала и фона (Акустика)",
        connections: ["5a-1b", "2a-5b", "6a-2b", "7a-6b", "11a-14b"]
    }, {
        title: "Этап4.Измерение фона (Акустика)",
        connections: ["5a-1b", "2a-5b", "6a-2b", "7a-6b", "18a-17b"]
    }, {
        title: "Этап5. Измерение сигнала и фона (Виброакустика)",
        connections: ["5a-1b", "2a-5b", "16a-2b", "11a-14b"]
    }, {
        title: "Этап6. Измерение фона (Виброакустика)",
        connections: ["5a-1b", "2a-5b", "16a-2b", "18a-17b"]
    }, {
        title: "Этап7. Измерение уровня помехи (Виброакустика)",
        connections: ["5a-1b", "2a-5b", "16a-2b", "11a-14b"],
        isSAZOn: false
    }, {
        title: "Этап8. Измерение уровня помехи (Акустика)",
        connections: ["5a-1b", "2a-5b", "6a-2b", "7a-6b", "11a-14b"],
        isSAZOn: false
    }
    ] as Array<DiagramStepInfo>,
    currentStep: 1 as number
}

const diagramReducer = (state: DiagramInitialStateType = initialState, action: DiagramActionTypes): DiagramInitialStateType => {
    switch (action.type) {
        case "GET_DIAGRAM_ELEMENTS": {
            return {
                ...state,
                fullListElements: [...action.elements],
                listElements: [...action.elements],
            }
        }
        case "ADD_DIAGRAM_ELEMENT_TO_FIELD": {
            let popIndex = state.listElements.findIndex(elem => elem.elementId === action.elementId);
            let newElementsArray = [...state.listElements];
            newElementsArray.splice(popIndex, 1);
            return {
                ...state,
                listElements: [...newElementsArray],
            }
        }
        case "DELETE_DIAGRAM_ELEMENT_FROM_FIELD": {
            let pushIndex = state.fullListElements.findIndex(elem => elem.elementId === action.elementId);
            let newElementsArray = [...state.listElements, state.fullListElements[pushIndex]];
            newElementsArray.sort((a, b) => a.elementId - b.elementId);
            return {
                ...state,
                listElements: [...newElementsArray]
            }
        }
        case "REFRESH_ELEMENTS_LIST":{
            return{
                ...state,
                listElements: [...state.fullListElements]
            }
        }
        case "SET_CURRENT_DIAGRAM_STEP": {
            return{
                ...state,
                currentStep: action.currentDiagramStep
            }
        }
        case "GO_TO_NEXT_STEP": {
            return {
                ...state,
                currentStep: state.currentStep + 1
            }
        }
        case "SET_SAZ_ON":{
            if(state.currentStep === 7 || state.currentStep === 8){
                let newStepsRes = state.stepsResults.map(sr => ({...sr}));
                newStepsRes[state.currentStep-1].isSAZOn = true;

                return{
                    ...state,
                    stepsResults: [...newStepsRes]
                }
            }
            else
                return state

        }
        default:
            return state;
    }
}

export {
    diagramReducer,
}

export type{
    DiagramInitialStateType
}