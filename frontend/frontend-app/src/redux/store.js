import {combineReducers, createStore} from "redux";
import helpReducer from "./reducers/help-reducer";
import diagramReducer from "./reducers/diagramElements-reducer";

let reducers = combineReducers({
    helpPage: helpReducer,
    diagramPage: diagramReducer
});

let store = createStore(reducers);

window.store = store;

export default store;