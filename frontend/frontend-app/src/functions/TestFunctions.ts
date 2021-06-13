const ExpandVariable = (variable: string) => {
    if(variable.includes("<") && variable.includes(">")) {
        let variableName = variable.split("<")[0];
        let variableIndex = variable.split("<")[1].split(">")[0];

        return [variableName, variableIndex];
    } else {
        return null
    }
}

export {
    ExpandVariable
}