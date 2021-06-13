import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {LogOut} from "../../redux/ActionCreators/UserActionCreators";
import {GetUserInfo} from "../../redux/selectors/user-selector";
import {Redirect} from "react-router-dom";

const Exit = () => {
    const dispatch = useDispatch()
    const userInfo = useSelector(GetUserInfo);

    useEffect(()=>{
        dispatch(LogOut());
    },[])

    return (
        !userInfo ? <Redirect to={"/auth"}/> : <></>
    )
}

export default Exit;