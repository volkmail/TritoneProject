import * as helpActions from "./../redux/ActionCreators/HelpActionCreators"
import * as diagramActions from "./../redux/ActionCreators/DiagramActionCreators"

type InferValueTypes<T> = T extends {[key: string]: infer U} ? U : never;

type HelpActionTypes = ReturnType<InferValueTypes<typeof helpActions>>;
type DiagramActionTypes = ReturnType<InferValueTypes<typeof diagramActions>>;

export type {
    HelpActionTypes,
    DiagramActionTypes
}