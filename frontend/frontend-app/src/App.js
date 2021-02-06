import React from "react";
import Header from "./components/Header/Header.jsx";
import Main from "./components/Main/Main.jsx";
import {Route} from "react-router-dom";
import Help from "./components/Help/Help";
import DiagramConstructor from "./components/DiagramConstructor/DiagramConstructor";

const App = () => {
    return (
        <div>
            <Header/>
            <Route path="/home" render={() => <Main/>}/>
            <Route path="/help" render={() => <Help/>}/>
            <Route path="/testing/diagram" render={() => <DiagramConstructor/>}/>
        </div>
    );
}

export default App;
