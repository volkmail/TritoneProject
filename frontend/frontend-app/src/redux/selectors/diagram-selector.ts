import {AppStateType} from "../store";

const GetListElements = (state: AppStateType) => {
    return state.diagramPage.listElements;
}

const GetCurrentStepInfo = (state: AppStateType) => {
    if(state.diagramPage.currentStep > 0 && state.diagramPage.currentStep < 9)
        return state.diagramPage.stepsResults[state.diagramPage.currentStep-1];
    else
        return null;

}

const GetCurrentStepNumber = (state: AppStateType) => {
    return state.diagramPage.currentStep;
}

export{
    GetListElements,
    GetCurrentStepInfo,
    GetCurrentStepNumber
}