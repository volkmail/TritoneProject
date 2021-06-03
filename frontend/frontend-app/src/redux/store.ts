import {combineReducers, createStore, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import {helpReducer} from "./reducers/help-reducer";
import {diagramReducer} from "./reducers/TestReducers/diagramElements-reducer";
import {appDataReducer} from "./reducers/appData-reducer";
import {userReducer} from "./reducers/user-reducer";
import testingReducer from "./reducers/TestReducers/testing-reducer";
import calcReducer from "./reducers/TestReducers/calc-reducer";
import testReducer from "./reducers/TestReducers/test-reducer";

let rootReducer = combineReducers({
    helpPage: helpReducer,
    diagramPage: diagramReducer,
    appData: appDataReducer,
    userData: userReducer,
    testingData: testingReducer,
    calcData: calcReducer,
    testData: testReducer
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