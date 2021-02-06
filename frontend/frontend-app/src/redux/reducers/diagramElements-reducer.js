import {TestingAPI} from "../../api/api";

const GET_ELEMENTS = "GET_ELEMENTS";

let initial_state = {
    elements: [],
}

const diagramReducer = (state = initial_state, action) => {
    switch (action.type) {
        case GET_ELEMENTS:
            return {
                ...state,
                elements: [...action.elements],
            };
        default:
            return state;
    }
}

//ActionCreators
export const getElements = (elements) => {
    return {
        type: GET_ELEMENTS,
        elements
    }
}

export const getDiagramElements = () => async (dispatch) => {
    const response = await TestingAPI.GetDiagramElements();
    dispatch(getElements(response));
}

export default diagramReducer;