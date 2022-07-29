import React, {useEffect} from 'react';
import {connect} from "react-redux";
import {compose} from "redux";
import AuthForm from "./AuthForm";
import {authenticate, setAuthStatus} from "../../redux/auth-reducer";
import {config} from "../../config";
import {message} from "antd";
import {Navigate} from "react-router-dom";

const AuthFormContainer = (props) => {

   useEffect( () => {
       switch(props.authStatus){
            case config.messageStatuses.success:
                message.success('Успешная авторизация')
               break;
            case config.messageStatuses.error:
                message.error('Ошибка авторизации')
               break;
        }
   }, props.authStatus)

    if (props.isAuth) {
        return <Navigate replace to={"/"}/>
    } else {

        return (
            <React.Fragment>
                <AuthForm authenticate={props.authenticate}/>
            </React.Fragment>
        )
    }


}

const mapStateToProps = (state) => {
    return {
        isAuth: state.authReducer.isAuth,
        authStatus: state.authReducer.authStatus,
    }
}

const mapDispatchToProps = {
    authenticate: authenticate,
    setAuthStatus: setAuthStatus
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps)
)(AuthFormContainer)