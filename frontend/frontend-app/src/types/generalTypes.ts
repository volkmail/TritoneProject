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

type QuizType = {
    quizId: number,
    quizName: string,
    questions: Array<QuizQuestion>
} | null

type QuizQuestion = {
    questionId: number,
    questionText: string,
    answers: Array<QuizAnswer>
}

type QuizAnswer = {
    answerId: number,
    answerText: string
}

type QuizSelectedAnswers = {
    questionId: number,
    answerId: number
}

type QuizResult = {
    questionId: number,
    answerText: string,
    isRight: boolean
}

type StatisticType = {
    surname: string,
    name: string,
    patronymic: string,
    groupName: string,
    sections: Array<boolean>,
    diagramResults: Array<string>,
    timeStart: Date,
    timeEnd: Date
}

type GroupEdit = {
    groupId: number,
    groupName: string
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
    DiagramStepInfo,
    DataSetType,
    DataSetTypeForViewResult,
    CalcInfoType,
    CurrentCalcInfoType,
    VariableWithValuesType,
    VariableType,
    QuizType,
    QuizQuestion,
    QuizAnswer,
    QuizSelectedAnswers,
    QuizResult,
    StatisticType,
    GroupEdit
}