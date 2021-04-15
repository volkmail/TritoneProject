import React from "react";
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import {Route, Switch, Redirect} from "react-router-dom";
import DiagramConstructor from "./components/Testing/Section1/DiagramConstructor/DiagramConstructor";
import {withSuspense} from "./hoc/withSuspense";
import Testing from "./components/Testing/Testing";
import Auth from "./components/Auth/Auth";

const Help = React.lazy(()=>import ('./components/Help/Help'));

const App = () => {
    return (
        <>
            <Auth/>
            {/*<Header/>*/}
            {/*<Switch>*/}
            {/*    <Route exact path="/" render={() => <Redirect to={'/home'}/>}/>*/}
            {/*    <Route path='/home' render={() => <Main/>}/>*/}
            {/*    <Route path="/help" render={withSuspense(Help)}/>*/}
            {/*    <Route exact path="/testing" render={() => <Testing/>}/>*/}
            {/*    <Route path="/testing/diagram" render={() => <DiagramConstructor/>}/>*/}
            {/*</Switch>*/}
        </>
    );
}

export default App;
