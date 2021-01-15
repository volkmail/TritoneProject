import {combineReducers, createStore} from "redux";
import helpReducer from "./help-reducer";

let reducers = combineReducers({
    helpPage: helpReducer
});

let store = createStore(reducers);

window.store = store;

export default store;