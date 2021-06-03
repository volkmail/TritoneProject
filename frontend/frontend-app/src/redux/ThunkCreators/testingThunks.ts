import {ThunkAction} from "redux-thunk";
import {AppStateType} from "../store";
import {CalcActionsTypes, DiagramActionTypes, TestActionsTypes, TestingActionsTypes} from "../../types/actionsTypes";
import {Dispatch} from "react";
import {DataResponseCodesTypes} from "../../types/apiTypes";
import {TestingAPI} from "../../api/testingApi";
import {GetElements, GoToNextStep, SetCurrentDiagramStep} from "../ActionCreators/DiagramActionCreators";
import {SetSectionCompleteAction} from "../ActionCreators/TestingActionCreators";
import {SetDataSet, SetSummaryResults} from "../ActionCreators/CalcActionsCreators";
import {SetQuizData} from "../ActionCreators/TestActionCreators";

const GetDiagramElements = (): ThunkAction<Promise<void>, AppStateType, unknown, DiagramActionTypes> =>
    async (dispatch: Dispatch<DiagramActionTypes>) => {
        const responseData = await TestingAPI.GetDiagramElements();
        if (responseData && responseData.resultCode === DataResponseCodesTypes.Success)
            dispatch(GetElements(responseData.data));
    }

const GetTestingInfo = (): ThunkAction<Promise<void>, AppStateType, unknown, TestingActionsTypes> =>
    async (dispatch: Dispatch<TestingActionsTypes>) => {
        //const responseData = await UserAPI.GetStudentGroups();
}

const SetSectionComplete = (sectionNumber: number): ThunkAction<Promise<void>, AppStateType, unknown, TestingActionsTypes> =>
    async (dispatch: Dispatch<TestingActionsTypes>) => {
        const response = await TestingAPI.AddSectionComplete(sectionNumber);
        if(response && response.isSectionResultSet){
            dispatch(SetSectionCompleteAction(sectionNumber));
        }
}

const SetDiagramSetResults = (result: string, currentStep: number): ThunkAction<Promise<void>, AppStateType, unknown, TestingActionsTypes> =>
    async (dispatch: Dispatch<DiagramActionTypes>) => {
    const responseData = await TestingAPI.SetCurrentDiagramStepResults(result, currentStep);
        if(responseData){
            dispatch(GoToNextStep());
        }

    }

const GetCurrentStep = (): ThunkAction<Promise<void>, AppStateType, unknown, TestingActionsTypes> =>
    async (dispatch: Dispatch<DiagramActionTypes>) => {
        const responseData = await TestingAPI.GetCurrentStep();
        if(responseData){
            dispatch(SetCurrentDiagramStep(responseData.currentStep));
        }

    }

const GetDataSet = (placeTypeName: string): ThunkAction<Promise<void>, AppStateType, unknown, CalcActionsTypes> =>
    async (dispatch: Dispatch<CalcActionsTypes>) => {
    const responseData = await TestingAPI.GetDataSetInfo(placeTypeName);
        if(responseData){
            dispatch(SetDataSet(responseData));
        }
    }

const GetSummaryPointsProgress = (): ThunkAction<Promise<void>, AppStateType, unknown, CalcActionsTypes> =>
    async (dispatch: Dispatch<CalcActionsTypes>, getState) => {
        if(getState().calcData.summaryProgress.length === 0){
            const responseData = await TestingAPI.GetPointsProgress();
            if(responseData && responseData.pointSummaryProgress){
                let result: Array<boolean> = JSON.parse(responseData!.pointSummaryProgress);
                dispatch(SetSummaryResults(result));
            } else{
                dispatch(SetSummaryResults([false,false,false,false,false,false]));
            }
        }
    }

const SavePointProgress = (pointId: number): ThunkAction<Promise<void>, AppStateType, unknown, CalcActionsTypes> =>
    async (dispatch: Dispatch<CalcActionsTypes>, getState) => {
        if(getState().calcData.summaryProgress.length > 0){
            let newSummaryResult: Array<boolean> = [...getState().calcData.summaryProgress];
            newSummaryResult.splice(pointId,1,true);
            const responseData = await TestingAPI.SetPointsProgress(JSON.stringify(newSummaryResult));
            if(responseData === 0)
                dispatch(SetSummaryResults(newSummaryResult));
        }
    }

const GetQuizData = (): ThunkAction<Promise<void>, AppStateType, unknown, TestActionsTypes> =>
    async (dispatch: Dispatch<TestActionsTypes>) => {
        const responseData = await TestingAPI.GetTestData();
        if(responseData && responseData.responseTestData){
            dispatch(SetQuizData(responseData.responseTestData));
        }
    }

export {
    GetTestingInfo,
    GetDiagramElements,
    SetDiagramSetResults,
    SetSectionComplete,
    GetCurrentStep,
    GetDataSet,
    GetSummaryPointsProgress,
    SavePointProgress,
    GetQuizData,
}