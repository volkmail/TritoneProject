import {VariableType, VariableWithValuesType} from "../types/generalTypes";
import {GridColumns, GridRowData, GridRowsProp} from "@material-ui/data-grid";

const measureTypesRussian = new Map([
    [1, "Измерение тест-сигнала"],
    [2, "Измерение информативного сигнала и фона"],
    [3, "Измерение фона"],
    [4, "Измерение помехи"]
]);

const measureTypes = new Map([
    [1, "Test"],
    [2, "Signal"],
    [3, "Back"],
    [4, "SAZ"]
]);

const pointNamesDictionary = new Map([
    ["Door", "Дверь"],
    ["Wall", "Стена"],
    ["Battery", "Батарея"],
    ["Window", "Окно"],
    ["Floor", "Пол"],
    ["Ceiling", "Потолок"]
]);

const GetMeasureTypeByIdRussian = (typeId: number): string => measureTypesRussian.get(typeId) ?? "Неизвестное измерение";

const GetMeasureTypeById = (typeId: number): string => measureTypes.get(typeId) ?? "undefined";

const GetPointNameTranslation = (pointName: string): string => pointNamesDictionary.get(pointName) ?? "Неизвестная конструкция";

const GetChosenTypes = (): Array<string> | null => {
    if (sessionStorage.getItem("currentMeasureSequence")) {
        let currentMeasureSequenceArray: Array<number> = JSON.parse(sessionStorage.getItem("currentMeasureSequence")!);
        let measuresName: Array<string> = [];
        currentMeasureSequenceArray.forEach(el => {
            measuresName = [...measuresName, GetMeasureTypeByIdRussian(el)];
        });
        return measuresName;
    } else
        return null;
}

const CheckRightStep3 = (rightSequence: Array<number>, sequence: Array<{ id: number, variableName: string, variableDownIndex: string }>): boolean => {
    let isSuccess: boolean = true;

    if (rightSequence.length === sequence.length) {
        for (let j = 0; j < sequence.length; j++) {
            let localSuccess = false;
            for (let i = 0; i < rightSequence.length; i++) {
                if (sequence[j].id === rightSequence[i]) {
                    localSuccess = true;
                    break;
                }
            }
            if (!localSuccess) {
                isSuccess = false;
                break;
            }
        }
    } else {
        isSuccess = false;
    }

    return isSuccess;
}

const ReturnSelectedVariables = (variables: Array<VariableType>, frequency: Array<number>, testValues: Array<number>,
                                 signalValues: Array<number>, backValues: Array<number>): Array<VariableWithValuesType> => {

    let result: Array<VariableWithValuesType> = [];
    let calcDelta: Array<number> = CalcDelta(signalValues, testValues);
    let calcIsolationValues: Array<number> = CalcIsolationValues(signalValues, testValues, calcDelta);

    variables.forEach(el => {
        switch (el.valuesName) {
            case "testValues":
                result.push({...el, values: testValues})
                break;
            case "signalValues":
                result.push({...el, values: testValues})
                break;
            case "backValues":
                result.push({...el, values: backValues})
                break;
            case "frequency":
                result.push({...el, values: frequency})
                break;
            case "delta":
                result.push({...el, values: calcDelta})
                break;
            case "isolationValues":
                result.push({...el, values: calcIsolationValues})
                break;
        }
    });

    return result;
}

const CalcDelta = (signalValues: Array<number>, testValues: Array<number>): Array<number> => {
    let result: Array<number> = [];

    for (let i = 0; i < signalValues.length; i++) {
        if (Math.round(signalValues[i] - testValues[i]) >= 10) {
            result.push(0);
        } else if (Math.round(signalValues[i] - testValues[i]) <= 10 && Math.round(signalValues[i] - testValues[i]) >= 6) {
            result.push(1);
        } else if (Math.round(signalValues[i] - testValues[i]) <= 6 && Math.round(signalValues[i] - testValues[i]) >= 4) {
            result.push(2);
        } else if (Math.round(signalValues[i] - testValues[i]) === 3) {
            result.push(3);
        } else if (Math.round(signalValues[i] - testValues[i]) === 2) {
            result.push(4);
        } else if (Math.round(signalValues[i] - testValues[i]) === 1) {
            result.push(10);
        } else if (signalValues[i] - testValues[i] < 1) {
            result.push(10);
        }
    }

    return result
}

const CalcIsolationValues = (testValues: Array<number>,
                             signalValues: Array<number>, delta: Array<number>): Array<number> => {

    let result: Array<number> = [];

    for (let i = 0; i < testValues.length; i++) {
        let calcIsolation = +(testValues[i] - signalValues[i] + delta[i]).toFixed(1);
        result.push(calcIsolation);
    }

    return result;
}

const CreateTableColumns = (variables: VariableWithValuesType[]): GridColumns => {
    let result: GridColumns = [];

    if (variables && variables.length === 6) {
        variables.forEach(el => {

            let editEnable = true;
            switch (el.valuesName) {
                case "frequency":
                    editEnable = false
                    break;
                case "testValues":
                    editEnable = false
                    break;
                case "signalValues":
                    editEnable = false
                    break;
                case "backValues":
                    editEnable = false
                    break;
            }

            result.push({
                field: el.valuesName as string,
                headerName: el.variableName + el.variableDownIndex,
                description: el.variableTitle,
                editable: editEnable,
                type: "number",
                width: 120
            });
        })
    }
    result.splice(0, 0, result[result.length - 1]);
    result.splice(result.length - 1, 1);
    return result;
}

const CreateTableRows = (variables: VariableWithValuesType[], isAutoFill: boolean): GridRowsProp => {
    let result: GridRowsProp = [];

    if (variables && variables.length === 6) {
        for (let i = 0; i < variables[0].values.length; i++) {
            let currentId = i + 1;
            let Row: GridRowData = {
                id: currentId,
                [variables[0].valuesName as string]: variables[0].values[i],
                [variables[1].valuesName as string]: variables[1].values[i],
                [variables[2].valuesName as string]: variables[2].values[i],
                [variables[3].valuesName as string]: isAutoFill ? variables[3].values[i] : 0,
                [variables[4].valuesName as string]: isAutoFill ? variables[4].values[i] : 0,
                [variables[5].valuesName as string]: variables[5].values[i],
            };

            // [variables[4].valuesName as string]: variables[4].values[i]
            // [variables[3].valuesName as string]: variables[3].values[i]

            result = [...result, {...Row}];
        }
    }

    return result;
}

const CheckCalculations = (variables: VariableWithValuesType[], calculatedVariables: { [p: string]: Array<number> }): boolean => {
    let resultDelta: boolean = true;
    let resultIsolationValues: boolean = true;
    let rightDelta: Array<number> = variables.find(el => el.valuesName === "delta")!.values;
    let rightIsolationValues: Array<number> = variables.find(el => el.valuesName === "isolationValues")!.values;

    for (let i = 0; i < rightDelta.length; i++) {
        if (calculatedVariables["delta"][i] !== rightDelta[i]) {
            resultDelta = false;
            break;
        }
        if (calculatedVariables["isolationValues"][i] !== rightIsolationValues[i]) {
            resultIsolationValues = false;
            break;
        }
    }

    return resultDelta && resultIsolationValues;
}

export {
    GetMeasureTypeByIdRussian,
    GetPointNameTranslation,
    GetChosenTypes,
    GetMeasureTypeById,
    CheckRightStep3,
    ReturnSelectedVariables,
    CreateTableColumns,
    CreateTableRows,
    CheckCalculations,
}