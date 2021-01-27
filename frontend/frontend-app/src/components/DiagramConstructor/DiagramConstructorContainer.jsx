import {connect} from "react-redux";
import DiagramConstructor from "./DiagramConstructor";
import {FieldElementAdd} from "../../redux/reducers/diagramElements-reducer";
import {GetFieldElements, GetListElements} from "../../redux/selectors/diagram-selector";

let mstp = (state) => ({
        elementsOnList: GetListElements(state),
        elementsOnField: GetFieldElements(state)
});

let DiagramConstructorContainer = connect(mstp, {FieldElementAdd})(DiagramConstructor);

export default DiagramConstructorContainer;