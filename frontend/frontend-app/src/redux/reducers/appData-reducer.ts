type AppDataInitialStateType = typeof initialState;

let initialState = {
    testPart: {
        sectionData: [{
            sectionTitle: "Раздел 1. Построение схемы соединия компонентов устройства",
            sectionBody: "В данном разделе вам предстоит собрать схему компонентов анализатора спектра Тритон. \n " +
                "Вам будет дан набор готовых компонентов, которые необходимо правильно соединить.",
            sectionRef: "/testing/diagram"
        },{
            sectionTitle: "Раздел 2. Назаначения контрольных точек для замеров",
            sectionBody: "Перед вами бует представлен ряд возможных конструкций в помещении.\n " +
                "На каждом из которых, необходимо оптимально расставить контрольные точки.",
            sectionRef: ""
        },{
            sectionTitle: "Раздел 3. Анализ результатов",
            sectionBody: "Вы получите результаты своих замеров и сможете проанализировать их.",
            sectionRef: "/testing/viewPoints"
        }]
    }
}

const appDataReducer = (state: AppDataInitialStateType = initialState, action: any) => {
    return state;
}

export {
    appDataReducer
}