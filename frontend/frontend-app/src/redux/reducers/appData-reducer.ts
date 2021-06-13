type AppDataInitialStateType = typeof initialState;

let initialState = {
    testPart: {
        sectionData: [{
            sectionTitle: "Раздел 1. Построение схемы соединия компонентов устройства",
            sectionBody: "В данном разделе вам предстоит собрать схему компонентов анализатора спектра Тритон. \n " +
                "Вам будет дан набор готовых компонентов, которые необходимо правильно соединить.",
            sectionRef: "/testing/diagram"
        },{
            sectionTitle: "Раздел 2. Тестовый блок",
            sectionBody: "Перед вами бует представлен ряд возможных конструкций в помещении.\n " +
                "На каждом из которых, необходимо оптимально расставить контрольные точки.",
            sectionRef: "/testing/test"
        },{
            sectionTitle: "Раздел 3. Проведение замеров и расчет коэффициентов звукоизоляции (виброизоляции)",
            sectionBody: "Вы получите результаты своих замеров и сможете проанализировать их.",
            sectionRef: "/testing/viewPoints"
        }
        ],
        variables: [
            {
                id: 1 as number,
                valuesName:"testValues",
                variableTitle:"Октавный уровень акустического тест-сигнала в защищаемом помещении, дБ",
                variableName: "L",
                variableDownIndex: "ci"
            },{
                id: 2 as number,
                valuesName:"signalValues",
                variableTitle:"Уровень измеренного суммарного акустичeского сигнала и шума в контрольной точке, дБ",
                variableName: "L",
                variableDownIndex: "(с+ш)i"
            },{
                id: 3 as number,
                valuesName:"backValues",
                variableTitle:"Уровень акустического шума, дБ",
                variableName: "L",
                variableDownIndex: "шi"
            },{
                id: 4 as number,
                variableTitle:"Уровень тестового акустического сигнала в контрольной точке, дБ",
                variableName: "L",
                variableDownIndex: "с2i"
            },{
                id: 5 as number,
                valuesName:"testValues",
                variableTitle:"Уровень тестового вибрационного сигнала в защищаемом помещении, дБ",
                variableName: "V",
                variableDownIndex: "ci"
            },{
                id: 6 as number,
                valuesName:"signalValues",
                variableTitle:"Уровень измеренного суммарного вибрационного сигнала и шума в точке контроля, дБ",
                variableName: "V",
                variableDownIndex: "(с+ш)i"
            },{
                id: 7 as number,
                valuesName:"backValues",
                variableTitle:"Уровень вибрационного шума, дБ",
                variableName: "V",
                variableDownIndex: "шi"
            },{
                id: 8 as number,
                variableTitle:"Уровень тестового вибрационного сигнала в контрольной точке, дБ",
                variableName: "V",
                variableDownIndex: "c2i"
            },{
                id: 9 as number,
                valuesName:"delta",
                variableTitle:"Поправка к расчетному значению уровня тестового акустического (вибрационного) сигнала в контрольной точке, дБ",
                variableName: "delta",
                variableDownIndex: ""
            },{
                id: 10 as number,
                valuesName:"isolationValues",
                variableTitle:"Коэффициент звукоизоляции ограждающих конструкций (элемента инженерно-технической системы), дБ",
                variableName: "Q",
                variableDownIndex: "i"
            },{
                id: 11 as number,
                valuesName:"isolationValues",
                variableTitle:"Коэффициент виброизоляции ограждающих конструкций (элемента инженерно-технической системы), дБ",
                variableName: "G",
                variableDownIndex: "i"
            },{
                id: 12 as number,
                valuesName:"frequency",
                variableTitle:"Частота, Гц",
                variableName: "f",
                variableDownIndex: ""
            }
        ]
    }
}

const appDataReducer = (state: AppDataInitialStateType = initialState, action: any) => {
    return state;
}

export {
    appDataReducer
}