const ValidResultConnections = (connections : Array<string>, idealConnections: Array<string>): boolean => {
    let isSuccessCount = 0;

    if(connections && connections.length === idealConnections.length){
        for (let i = 0; i<connections.length; i++){
            for(let j=0; j<idealConnections.length; j++){
                if(connections[i] === idealConnections[j] || connections[i] === SwapSourceTarget(idealConnections[j])){
                    isSuccessCount++;
                    break;
                }
            }
        }
        return isSuccessCount === idealConnections.length;
    }
    else
        return false;
}

const SwapSourceTarget = (connection: string): string => {
    let stringArray: Array<string> = connection.split("");

    let firstNumber = stringArray.slice(0,stringArray.indexOf("-")-1);
    let secondNumber = stringArray.slice(stringArray.indexOf("-")+1,stringArray.length-1);

    stringArray.splice(0,firstNumber.length,...secondNumber)
    stringArray.splice(stringArray.indexOf("-")+1,secondNumber.length,...firstNumber);

    return stringArray.join("");
}

const RemoveConnections = (connections: Array<string>, connectionsToRemove: Array<string>): Array<string> => {
    let newConnections: Array<string> = [];

    for (let i = 0; i<connections.length;i++){
        let isNotToDelete = true;
        for(let j=0;j<connectionsToRemove.length;j++){
            if(connections[i] === connectionsToRemove[j]){
                isNotToDelete = false;
                break;
            }
        }
        if (isNotToDelete)
            newConnections.push(connections[i]);
    }

    return [...newConnections];
}

export {
    ValidResultConnections,
    RemoveConnections
}