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
import PointTest from "./components/Testing/Section3/ViewResultPoints/PointTest";
import ViewResult from "./components/Testing/Section3/ViewResult";
import Test from "./components/Testing/Section2/Test";
import Exit from "./components/Exit/Exit";
import StudentStatistic from "./components/StudentStatistic/StudentStatistic";
import EditTest from "./components/EditTest/EditTest";
import EditGroup from "./components/EditGroup/EditGroup";

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
                {userInfo.role === "Студент"
                    ? <>
                        <Route exact path="/" render={() => <Redirect to={'/home'}/>}/>
                        <Route exact path="/auth" render={() => <Redirect to={'/home'}/>}/>
                        <Route path='/home' render={() => <Main/>}/>
                        <Route path="/help" render={withSuspense(Help)}/>
                        <Route exact path="/testing" render={() => <Testing/>}/>
                        <Route path="/testing/diagram" render={() => <DiagramConstructor/>}/>
                        <Route path="/testing/test" render={() => <Test/>}/>
                        <Route exact path="/testing/viewPoints" render={() => <ViewResultPoints/>}/>
                        <Route exact path="/testing/viewPoints/Point/:pointId" children={<PointTest/>} />
                        <Route exact path="/testing/viewPoints/Point/:pointId/Measure/:typeId" children={<ViewResult/>} />
                        <Route path="/exit" render={() => <Exit/>}/>
                    </>
                    : userInfo.role === "Преподаватель"
                        ? <>
                            <Route exact path="/" render={() => <Redirect to={'/statistic'}/>}/>
                            <Route exact path="/auth" render={() => <Redirect to={'/statistic'}/>}/>
                            <Route path='/home' render={() => <Redirect to={'/statistic'}/>}/>
                            <Route path="/statistic" render={() => <StudentStatistic/>}/>
                            <Route path="/edit/groups" render={() => <EditGroup/>}/>
                            <Route path="/edit/test" render={() => <EditTest/>}/>
                            <Route path="/regStudent" render={() => <Registration/>}/>
                            <Route path="/exit" render={() => <Exit/>}/>
                        </>
                        : <p>Загрузка приложения...</p>
                }


            </Switch>
        </>
    );
}

export default withRouter(App);
