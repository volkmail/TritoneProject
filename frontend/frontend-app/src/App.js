import React from "react";
import Header from "./components/Header/Header.jsx";
import Main from "./components/Main/Main.jsx";
import {Route, Switch, Redirect} from "react-router-dom";
import DiagramConstructor from "./components/DiagramConstructor/DiagramConstructor";
import {withSuspense} from "./hoc/withSuspense";

const Help = React.lazy(()=>import ('./components/Help/Help.tsx'));

const App = () => {
    return (
        <div>
            <Header/>
            <Switch>
                <Route exact path="/" render={() => <Redirect to={'/home'}/>}/>
                <Route path='/home' render={() => <Main/>}/>
                <Route path="/help" render={withSuspense(Help)}/>
                <Route path="/testing/diagram" render={() => <DiagramConstructor/>}/>
            </Switch>
        </div>
    );
}

export default App;
