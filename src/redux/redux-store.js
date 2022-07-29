import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import thunkMiddleware from 'redux-thunk'
import {appReducer} from "./app-reducer.js";
import {authReducer} from "./auth-reducer";
import {extReducer} from "./ext-reducer";


let reducers = combineReducers({
    appReducer: appReducer,
    authReducer: authReducer,
    extReducer: extReducer
})

let store = createStore(reducers, compose(applyMiddleware(thunkMiddleware)))

export default store;
