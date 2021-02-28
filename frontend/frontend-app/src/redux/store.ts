import {combineReducers, createStore, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import {helpReducer} from "./reducers/help-reducer";
import {diagramReducer} from "./reducers/diagramElements-reducer";

let rootReducer = combineReducers({
    helpPage: helpReducer,
    diagramPage: diagramReducer
});

type AppStateType = ReturnType<typeof rootReducer>;

let store = createStore(rootReducer, applyMiddleware(thunk));

// @ts-ignore
window.__store__ = store;

export {
    store
}

export type{
    AppStateType
}