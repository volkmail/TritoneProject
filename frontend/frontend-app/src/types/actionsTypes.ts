import * as helpActions from "./../redux/ActionCreators/HelpActionCreators"
import * as diagramActions from "./../redux/ActionCreators/DiagramActionCreators"
import * as userActions from "./../redux/ActionCreators/UserActionCreators"
import * as testingActions from "./../redux/ActionCreators/TestingActionCreators"
import * as calcActions from "./../redux/ActionCreators/CalcActionsCreators"
import * as testActions from "./../redux/ActionCreators/TestActionCreators"
import * as statisticActions from "./../redux/ActionCreators/StatisticActionCreators"
import * as editActions from "./../redux/ActionCreators/EditActionCreators"


type InferValueTypes<T> = T extends {[key: string]: infer U} ? U : never;

type HelpActionTypes = ReturnType<InferValueTypes<typeof helpActions>>;
type DiagramActionTypes = ReturnType<InferValueTypes<typeof diagramActions>>;
type UserActionsTypes = ReturnType<InferValueTypes<typeof userActions>>;
type TestingActionsTypes = ReturnType<InferValueTypes<typeof testingActions>>;
type CalcActionsTypes = ReturnType<InferValueTypes<typeof calcActions>>;
type TestActionsTypes = ReturnType<InferValueTypes<typeof testActions>>;
type StatisticActionsTypes = ReturnType<InferValueTypes<typeof statisticActions>>;
type EditActionsTypes = ReturnType<InferValueTypes<typeof editActions>>;

export type {
    HelpActionTypes,
    DiagramActionTypes,
    UserActionsTypes,
    TestingActionsTypes,
    CalcActionsTypes,
    TestActionsTypes,
    StatisticActionsTypes,
    EditActionsTypes,

}