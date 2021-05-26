type DiagramElementType = {
    elementId: number,
    elementName: string,
    elementImageSrc: string,
    elementText?: string
}

type DiagramStepInfo = {
    title: string,
    connections: Array<string>,
    isSAZOn?: boolean
}

type CheckPoint = {
    cpId: number,
    cpName: string,
    isActive: boolean,
    isIn: boolean,
    isOut: boolean,
    isVibro: boolean,
    isAcoustic: boolean
}

type TestingInfo = {
    section1: boolean,
    section2: boolean,
    section3: boolean,
    checkPoints: {
        window1Cps: Array<CheckPoint>
    }
}

type DataSetType = {
    frequency: Array<number>,
    signalLevelMax: Array<number>,
    signalLevel: Array<number>,
    signalLevelMin: Array<number>
}

type DataSetTypeForViewResult = {
    frequency: number,
    signalLevelMax: number,
    signalLevel: number,
    signalLevelMin: number
}

type CalcInfoType = {
    id: number,
    pointName: string,
    pointTitle: string,
    results: {id: number, typeName: string, typeTitle: string, result: boolean}[]
} []

type CurrentCalcInfoType = {
    id: number,
    pointName: string,
    pointTitle: string,
    results: {id: number, typeName: string, typeTitle: string, result: boolean}[]
} | null | undefined

type VariableWithValuesType = {
    id: number,
    valuesName?:string,
    variableTitle: string,
    variableName: string,
    variableDownIndex: string,
    values: Array<number>
}

type VariableType = {
    id: number,
    valuesName?:string,
    variableTitle: string,
    variableName: string,
    variableDownIndex: string,
}

enum signalKeys {
    signalLevelMax = "signalLevelMax",
    signalLevel = "signalLevel",
    signalLevelMin = "signalLevelMin"
}

enum signalTypes {
    Test = 1,
    Signal = 2,
    Back = 3,
    SAZ = 4
}

enum signalTypesString {
    Test = "Test",
    Signal = "Signal",
    Back = "Back",
    SAZ = "SAZ"
}

export {
    signalKeys,
    signalTypes,
    signalTypesString
}

export type {
    DiagramElementType,
    CheckPoint,
    TestingInfo,
    DiagramStepInfo,
    DataSetType,
    DataSetTypeForViewResult,
    CalcInfoType,
    CurrentCalcInfoType,
    VariableWithValuesType,
    VariableType,
}