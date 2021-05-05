import React from "react";
import myStyle from "../DiagramConstructor.module.css";
import Field from "./Field";

type PropsType = {
    connections: Array<string>,
    setConnection: (value: (((prevState: any[]) => any[]) | any[])) => void,
    isSuccessComplete: boolean,
    setResultElements: (value: (((prevState: any[]) => any[]) | any[])) => void,
    needCleanField: boolean,
    setNeedClean: (value: (((prevState: boolean) => boolean) | boolean)) => void,
    onCheckHandler: () => void,
    onFinishHandler: () => void,

}

const DiagramField: React.FC<PropsType> = (props) => {
    return (
        <div className={myStyle.constructor_elements}>
            <Field
                connections={props.connections}
                setConnection={props.setConnection}
                setResultElements={props.setResultElements}
                smallField={false}
                needCleanField={props.needCleanField}
                setNeedClean={props.setNeedClean}
            />
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

export default DiagramField;