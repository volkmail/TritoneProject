import * as helpActions from "./../redux/ActionCreators/HelpActionCreators"
import * as diagramActions from "./../redux/ActionCreators/DiagramActionCreators"
import * as userActions from "./../redux/ActionCreators/UserActionCreators"

type InferValueTypes<T> = T extends {[key: string]: infer U} ? U : never;

type HelpActionTypes = ReturnType<InferValueTypes<typeof helpActions>>;
type DiagramActionTypes = ReturnType<InferValueTypes<typeof diagramActions>>;
type UserActionsTypes = ReturnType<InferValueTypes<typeof userActions>>;

export type {
    HelpActionTypes,
    DiagramActionTypes,
    UserActionsTypes
}