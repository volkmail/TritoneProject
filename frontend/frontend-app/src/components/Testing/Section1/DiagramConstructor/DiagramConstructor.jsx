import React, {useEffect, useState} from 'react';

import myStyle from './DiagramConstructor.module.css';
import ElementsList from "./ElementsList/ElementsList";
import {useDispatch, useSelector} from "react-redux";
import {ValidResultConnections} from "./DiagramComponentsAndFunctions/HelpFunctions";
import DiagramField from "./DiagramComponentsAndFunctions/DiagramField";
import SplitDiagramField from "./DiagramComponentsAndFunctions/SplitDiagramField";
import {GetCurrentStepInfo, GetCurrentStepNumber} from "../../../../redux/selectors/diagram-selector";
import {GetCurrentStep, SetDiagramSetResults, SetSectionComplete} from "../../../../redux/ThunkCreators/testingThunks";
import {Redirect} from "react-router-dom";

const DiagramConstructor = () => {
    const [resultElements, setResultElements] = useState([]); //для сохранения на сервере
    const [connections, setConnection] = useState([]);// для проверки правильности текущих соединений
    const stepInfo = useSelector(GetCurrentStepInfo);// инфа по текущему этапу
    const currentStep = useSelector(GetCurrentStepNumber)//номер текущего этапа
    const [isSuccessComplete, setSuccess] = useState(false);//флаг о том что все четко
    const [isSectionComplete, setSectionComplete] = useState(false);//флаг о завершении раздела
    const [errorMessage, setErrorMessage] = useState("");//Сообщение об ошибке
    const [needCleanField, setNeedClean] = useState(false);//Очистка поля
    const dispatch = useDispatch();

    useEffect(() => {
        if (currentStep === 9) {
            dispatch(SetSectionComplete(1));
            setSectionComplete(true);
        }
    }, [currentStep, dispatch])

    useEffect(() => {
        dispatch(GetCurrentStep());
    }, [dispatch])

    const onCheckHandler = () => {
        if (ValidResultConnections(connections, stepInfo.connections)) {
            setErrorMessage("");
            setSuccess(true);
            if(currentStep === 7 || currentStep === 8){
                if(stepInfo.isSAZOn){
                    setErrorMessage("");
                    setSuccess(true);
                }
                else{
                    setErrorMessage("Ошибка в сборе коснтрукции");
                    setSuccess(false);
                }
            }
        } else {
            setErrorMessage("Ошибка в сборе коснтрукции");
            setSuccess(false);
        }
    }

    const onFinishHandler = () => {
        dispatch(SetDiagramSetResults(JSON.stringify(resultElements), currentStep));
        setNeedClean(true);
        setResultElements([]);
        setConnection([]);
        setErrorMessage("");
        setSuccess(false);
    }

    return (
        isSectionComplete ? <Redirect to={"/testing"}/>
            : <div className={myStyle.constructor_container}>
                {isSuccessComplete ? <div
                        className={isSuccessComplete ? myStyle.successTitle : `${myStyle.successTitle} ${myStyle.successTitleHidden}`}>
                        <h1 className="font_bold-center">ЗАДАНИЕ ВЫПОЛНЕНО УСПЕШНО!</h1>
                    </div>
                    : <div className={myStyle.stepTitle}>
                        <h1 className="font_bold-center">{stepInfo?.title.toUpperCase()}</h1>
                        {errorMessage.length > 0 && <p>{errorMessage}</p>}
                    </div>}
                <div className={myStyle.constructor}>
                    <ElementsList/>
                    {currentStep === 1 ? <DiagramField
                            connections={connections}
                            setConnection={setConnection}
                            isSuccessComplete={isSuccessComplete}
                            onCheckHandler={onCheckHandler}
                            onFinishHandler={onFinishHandler}
                            setResultElements={setResultElements}
                            needCleanField={needCleanField}
                            setNeedClean={setNeedClean}
                        />
                        : <SplitDiagramField
                            connections={connections}
                            setConnection={setConnection}
                            isSuccessComplete={isSuccessComplete}
                            onCheckHandler={onCheckHandler}
                            onFinishHandler={onFinishHandler}
                            setResultElements={setResultElements}
                            needCleanField={needCleanField}
                            setNeedClean={setNeedClean}
                        />}
                </div>
            </div>
    );
}

export default DiagramConstructor;