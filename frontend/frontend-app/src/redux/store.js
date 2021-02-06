import {combineReducers, createStore, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import helpReducer from "./reducers/help-reducer";
import diagramReducer from "./reducers/diagramElements-reducer";

let reducers = combineReducers({
    helpPage: helpReducer,
    diagramPage: diagramReducer
});

let store = createStore(reducers, applyMiddleware(thunk));

window.store = store;

export default store;