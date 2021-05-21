import React, {useEffect} from "react";
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import {Route, Switch, Redirect, withRouter} from "react-router-dom";
import DiagramConstructor from "./components/Testing/Section1/DiagramConstructor/DiagramConstructor";
import {withSuspense} from "./hoc/withSuspense";
import Testing from "./components/Testing/Testing";
import Auth from "./components/Auth/Auth";
import {useDispatch, useSelector} from "react-redux";
import {GetUserInfo} from "./redux/selectors/user-selector";
import Registration from "./components/Registration/Registration";
import {InitUser} from "./redux/ActionCreators/UserActionCreators";
import ViewResultPoints from "./components/Testing/Section3/ViewResultPoints/ViewResultPoints";
import ViewResultPoint from "./components/Testing/Section3/ViewResultPoints/ViewResultPoint";
import ViewResult from "./components/Testing/Section3/ViewResult";

const Help = React.lazy(() => import ('./components/Help/Help'));

const App = (props: any) => {
    const userInfo = useSelector(GetUserInfo);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(InitUser());
    }, [dispatch])

    if (!userInfo) {
        if (props.location.pathname === "/auth" || props.location.pathname === "/reg"){
            return <>
                <Switch>
                    <Route exact path="/auth" render={() => <Auth/>}/>
                    <Route exact path="/reg" render={() => <Registration/>}/>
                </Switch>
            </>

        }
        else
            return <Redirect to={"/auth"}/>
    }

    return (
        <>
            <Header/>
            <Switch>
                <Route exact path="/" render={() => <Redirect to={'/home'}/>}/>
                <Route exact path="/auth" render={() => <Redirect to={'/home'}/>}/>
                <Route path='/home' render={() => <Main/>}/>
                <Route path="/help" render={withSuspense(Help)}/>
                <Route exact path="/testing" render={() => <Testing/>}/>
                <Route path="/testing/diagram" render={() => <DiagramConstructor/>}/>
                <Route exact path="/testing/viewPoints" render={() => <ViewResultPoints/>}/>
                <Route exact path="/testing/viewPoints/Point/:pointName" children={<ViewResultPoint/>} />
                <Route exact path="/testing/viewPoints/Point/:pointName/Calc/:typeName" children={<ViewResult/>} />
            </Switch>
        </>
    );
}
// render={() => <ViewResultPoint/>}

export default withRouter(App);
