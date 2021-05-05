import React from "react";
import myStyle from "../DiagramConstructor.module.css";
import Field from "./Field";

const SplitDiagramField = (props) => {
    return (
        <div className={myStyle.constructor_elements}>
            <div className={myStyle.container_small_fields}>
                <Field
                    connections={props.connections}
                    setConnection={props.setConnection}
                    setResultElements={props.setResultElements}
                    smallField={true}
                    needCleanField={props.needCleanField}
                    setNeedClean={props.setNeedClean}
                />
                <div className={myStyle.wall}/>
                <Field
                    connections={props.connections}
                    setConnection={props.setConnection}
                    setResultElements={props.setResultElements}
                    smallField={true}
                    needCleanField={props.needCleanField}
                    setNeedClean={props.setNeedClean}
                />
            </div>
            <div className={myStyle.constructor_remote_elements}>
                {
                    !props.isSuccessComplete ? <>
                            <button id="schema_check" className="button_classic" onClick={props.onCheckHandler}>Проверить
                            </button>
                        </>
                        :
                        <button className="button_classic" onClick={props.onFinishHandler}>Завершить выполнение</button>
                }
            </div>
        </div>
    )
}

export default SplitDiagramField;