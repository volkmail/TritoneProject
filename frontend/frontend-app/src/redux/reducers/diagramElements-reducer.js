const FIELD_ELEMENT_ADD = "FIELD_ELEMENT_ADD";

let initial_state = {
    elementsOnList: [
        {elementId: 1, dataTitle: "ПЭВМ"},
        {elementId: 2, dataTitle: "Блок согласования и преобразования"},
        {elementId: 3, dataTitle: "Измерительный микрофон"},
        {elementId: 4, dataTitle: "Калибратор"},
        {elementId: 5, dataTitle: "USB-кабель"},
        {elementId: 6, dataTitle: "Коаксиальный кабель"}],
    elementsOnField: [],
}

const diagramReducer = (state = initial_state, action) => {
    switch (action.type) {
        case FIELD_ELEMENT_ADD:

            let element = state.elementsOnList.find(el => el.elementId === action.elementId);

            let newListArr = [...state.elementsOnList];
            newListArr.splice((state.elementsOnList.indexOf(element)), 1);

            let newFieldArr = [...state.elementsOnField, {elementId: element.elementId, dataTitle: element.dataTitle}];

            newListArr.sort((a,b) =>
                a.elementId - b.elementId);
            newFieldArr.sort((a,b) => a.elementId-b.elementId);

            return {
                ...state,
                elementsOnList: [...newListArr],
                elementsOnField: [...newFieldArr]
            };
        default:
            return state;
    }
}

//ActionCreators
export const FieldElementAdd = (elementId) => {
    return {
        type: FIELD_ELEMENT_ADD,
        elementId: elementId
    }
}

export default diagramReducer;