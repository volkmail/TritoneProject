import {combineReducers, createStore, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import {helpReducer} from "./reducers/help-reducer";
import {diagramReducer} from "./reducers/diagramElements-reducer";
import {appDataReducer} from "./reducers/appData-reducer";

let rootReducer = combineReducers({
    helpPage: helpReducer,
    diagramPage: diagramReducer,
    appData: appDataReducer
});

type AppStateType = ReturnType<typeof rootReducer>;

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

// @ts-ignore
window.__store__ = store;

export {
    store
}

export type{
    AppStateType
}