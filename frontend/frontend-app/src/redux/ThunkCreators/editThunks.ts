import {ThunkAction} from "redux-thunk";
import {AppStateType} from "../store";
import {EditActionsTypes} from "../../types/actionsTypes";
import {Dispatch} from "react";
import {EditApi} from "../../api/editApi";
import {setGroups, setTest} from "../ActionCreators/EditActionCreators";
import {EditQuestion} from "../../types/generalTypes";

const GetGroups = (): ThunkAction<Promise<void>, AppStateType, unknown, EditActionsTypes> =>
    async (dispatch: Dispatch<EditActionsTypes>) => {
        const responseData = await EditApi.GetGroups();
        if(responseData && responseData.groupResponse){
            dispatch(setGroups(responseData.groupResponse));
        }
    }

const GetTest = (): ThunkAction<Promise<void>, AppStateType, unknown, EditActionsTypes> =>
    async (dispatch: Dispatch<EditActionsTypes>) => {
        const responseData = await EditApi.GetTest();
        if(responseData && responseData.test){
            dispatch(setTest(responseData.test));
        }
    }

const editQuestion = (question: EditQuestion): ThunkAction<Promise<void>, AppStateType, unknown, EditActionsTypes> =>
    async (dispatch: Dispatch<EditActionsTypes>) => {
        const responseData = await EditApi.EditQuestion(question);
        if(responseData && responseData === "done"){
            const responseNewTest = await EditApi.GetTest();
            if(responseNewTest && responseNewTest.test){
                dispatch(setTest(responseNewTest.test));
            }
        }
    }

const deleteQuestion = (questionId: number): ThunkAction<Promise<void>, AppStateType, unknown, EditActionsTypes> =>
    async (dispatch: Dispatch<EditActionsTypes>) => {
        const responseData = await EditApi.DeleteQuestion(questionId);
        if(responseData && responseData === "done"){
            const responseNewTest = await EditApi.GetTest();
            if(responseNewTest && responseNewTest.test){
                dispatch(setTest(responseNewTest.test));
            }
        }
    }

export {
    GetGroups,
    GetTest,
    editQuestion,
    deleteQuestion
}