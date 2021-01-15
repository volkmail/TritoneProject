import React from "react";
import Header from "./components/Header/Header.jsx";
import Main from "./components/Main/Main.jsx";
import {Route, Redirect} from "react-router-dom";
import HelpContainer from "./components/Help/HelpContainer";

const App = () => {
  return (
    <div>
      <Header />
      <Route path="/home" render={() => <Main />}/>
      <Route path="/help" render={() => <HelpContainer />}/>
      <Redirect from='/' to='/home'/>
    </div>
  );
}

export default App;
