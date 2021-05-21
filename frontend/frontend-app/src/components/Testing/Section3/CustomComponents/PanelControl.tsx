import React, {MouseEvent} from "react";
import {signalKeys} from "../../../../types/generalTypes";
import style from "../ViewResult.module.css";

type PropsType = {
    checkBoxState: {
        signalLevelMax: boolean,
        signalLevel: boolean,
        signalLevelMin: boolean
    },
    setCurrentSignalLevel:  React.Dispatch<React.SetStateAction<signalKeys>>,
    setCheckBoxState:  React.Dispatch<React.SetStateAction<{signalLevelMax: boolean,signalLevel: boolean, signalLevelMin: boolean}>>
}

const PanelControl: React.FC<PropsType> = (props) => {
    const checkBoxHandler = (event: MouseEvent<HTMLInputElement>) => {
        let newCheckBoxState = {
            signalLevelMax: false,
            signalLevel: false,
            signalLevelMin: false
        };

        for (let key in props.checkBoxState){
            if(key === event.currentTarget.name) {
                props.setCheckBoxState({...newCheckBoxState, [key]: true});

                switch (key) {
                    case signalKeys.signalLevelMax:
                        props.setCurrentSignalLevel(signalKeys.signalLevelMax);
                        break;
                    case signalKeys.signalLevel:
                        props.setCurrentSignalLevel(signalKeys.signalLevel);
                        break;
                    case signalKeys.signalLevelMin:
                        props.setCurrentSignalLevel(signalKeys.signalLevelMin);
                        break;
                }
                break;
            }
        }
    }

    return (
        <div className={style.viewer_panel}>
            <div className={style.levelControl}>
                <p>Уровень</p>
                <label>
                    <input name="signalLevelMax" type="checkbox" checked={props.checkBoxState.signalLevelMax}
                           onClick={checkBoxHandler}/>
                    Макс.
                </label>
                <label>
                    <input name="signalLevelMin" type="checkbox" checked={props.checkBoxState.signalLevelMin}
                           onClick={checkBoxHandler}/>
                    Мин.
                </label>
                <label>
                    <input name="signalLevel" type="checkbox" checked={props.checkBoxState.signalLevel}
                           onClick={checkBoxHandler}/>
                    Текущий
                </label>
            </div>
            <button className="button_classic">Сохранить результаты<p>(результаты сохраняются по Макс. уровню)</p></button>
        </div>
    )
}

export default PanelControl;