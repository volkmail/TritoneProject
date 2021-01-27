import React from "react";
import Header from "./components/Header/Header.jsx";
import Main from "./components/Main/Main.jsx";
import {Route} from "react-router-dom";
import HelpContainer from "./components/Help/HelpContainer";
import DiagramConstructorContainer from "./components/DiagramConstructor/DiagramConstructorContainer";

const App = () => {
    return (
        <div>
            <Header/>
            <Route path="/home" render={() => <Main/>}/>
            <Route path="/help" render={() => <HelpContainer/>}/>
            <Route path="/testing/diagram" render={() => <DiagramConstructorContainer/>}/>
        </div>
    );
}

export default App;
