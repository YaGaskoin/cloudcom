import './App.scss';
import React, {useEffect} from "react";
import {initApp} from "./redux/app-reducer.js";
import {compose} from "redux";
import {connect, Provider} from "react-redux";
import {BrowserRouter, NavLink, Route, Routes} from "react-router-dom";
import store from "./redux/redux-store.js";
import ExtentionsContainer from "./components/Extentions/ExtentionsContainer";
import AuthFormContainer from "./components/AuthForm/AuthFormContainer";
import {HomeOutlined, UserOutlined} from '@ant-design/icons';
import {Layout, Menu} from "antd";
import {authReducer, checkAuthWithoutLogin, logout} from "./redux/auth-reducer";
import ExtDetailContainer from "./components/ExtDetail/ExtDetailContainer";
import Preloader from "./components/common/Preloader/Preloader";

const {Sider, Content} = Layout;


function App(props) {

    useEffect(() => {
        props.initApp(props.expires_is, props.refresh_token)
    }, [])

    if (!props.initialized) {
            return (
                <div className="page-wrapper">
                    <header></header>
                    <div className={'content'}>
                        <Preloader/>
                    </div>
                </div>

            );
        }

    return (

        <React.Fragment>
            <div className={'page-wrapper'}>
                <Layout>
                    <Sider breakpoint="lg"
                           collapsedWidth="0" >
                        <div className="logo"/>
                        <Menu
                            theme="dark"
                            mode="inline"
                        >
                            {
                                props.isAuth ?
                                    <React.Fragment>
                                        <Menu.Item>
                                            <a onClick={props.logout}>
                                                <UserOutlined/> Выйти
                                            </a>
                                        </Menu.Item>
                                        <Menu.Item>
                                            <NavLink to={'/'}>
                                                <HomeOutlined/> Главная
                                            </NavLink>
                                        </Menu.Item>
                                    </React.Fragment>
                                    :
                                    <Menu.Item>
                                        <NavLink to={'/login'}>
                                            <UserOutlined/> Авторизация
                                        </NavLink>
                                    </Menu.Item>
                            }
                        </Menu>
                    </Sider>
                    <Layout>
                        <Content className={'page-content'}>
                            <Routes>
                                <Route path={'/'} exact={true} element={<ExtentionsContainer/>}/>
                                <Route path={'/login'} element={<AuthFormContainer/>}/>
                                <Route path={'/extentions/:extId'} element={<ExtDetailContainer/>}/>
                            </Routes>

                        </Content>
                    </Layout>
                </Layout>
            </div>

        </React.Fragment>
    );
}

const mapStateToProps = (state) => {
    return {
        initialized: state.appReducer.initialized,
        isAuth: state.authReducer.isAuth,
        expires_is: state.authReducer.expires_is,
        refresh_token: state.authReducer.refresh_token
    }

}

const mapDispatchToProps = {
    initApp: initApp,
    logout: logout,
}

let AppContainer = compose(
    connect(mapStateToProps, mapDispatchToProps)
)(App)

function CloudApp() {
    return (
        <BrowserRouter>
            <Provider store={store}>
                <AppContainer/>
            </Provider>
        </BrowserRouter>
    )
}

export default CloudApp;
