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

enum signalKeys {
    signalLevelMax = "signalLevelMax",
    signalLevel = "signalLevel",
    signalLevelMin = "signalLevelMin"
}

export {
    signalKeys
}

export type {
    DiagramElementType,
    CheckPoint,
    TestingInfo,
    DiagramStepInfo,
    DataSetType,
    DataSetTypeForViewResult
}