import {authApi, userApi} from "../api/api";
import {config} from "../config";
import {checkStorage, getExpireDate} from "../utils/utils";

const SET_TOKEN = 'SET_TOKEN';
const SET_IS_AUTH = 'SET_IS_AUTH';
const SET_AUTH_STATUS = 'SET_AUTH_STATUS';
const SET_USER = 'SET_USER'

const storageToken = checkStorage('tokenInfo')

const initialState = {
    isAuth: false,
    token: storageToken.access_token || '',
    refresh_token: storageToken.refresh_token || '',
    tokenType: storageToken.token_type || '',
    authStatus: null,
    userId: storageToken.user_id || null,
    expires_in: storageToken.expires_in || null
}


export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_TOKEN:
            return {
                ...state, token: action.token,
                tokenType: action.tokenType,
                refresh_token: action.refresh_token,
                expires_in: action.expireDate
            }
        case SET_IS_AUTH:
            return {...state, isAuth: action.isAuth}
        case SET_AUTH_STATUS:
            return {...state, authStatus: action.status}
        case SET_USER:
            return {...state, userId: action.userId}
        default:
            return state
    }
}

export const setTokenAc = (token, token_type, refresh_token, expireDate) => {
    return {
        type: SET_TOKEN,
        token: token,
        tokenType: token_type,
        refresh_token: refresh_token,
        expireDate: expireDate
    }
}

export const setIsAuthAc = (isAuth) => {
    return {
        type: SET_IS_AUTH,
        isAuth: isAuth
    }
}

export const setUserAc = (userId) => {
    return {
        type: SET_USER,
        userId: userId
    }
}

export const setAuthStatusAc = (status) => {
    return {
        type: SET_AUTH_STATUS,
        status: status
    }
}

export const authenticate = (username, password) => {
    return async (dispatch) => {
        const response = await authApi.authorization(username, password);
        if (response.status == 200) {
            const data = response.data;

            dispatch(setAuthStatusAc(config.messageStatuses.success));
            setTimeout(() => {
                dispatch(setAuthStatusAc(config.messageStatuses.default));
            }, 3000)

            const expireDate = getExpireDate(data.expires_in);
            dispatch(setTokenAc(data.access_token, data.token_type, data.refresh_token, expireDate));

            const responseUser = await userApi.getUser(data.access_token, data.token_type)

            localStorage.setItem('tokenInfo', JSON.stringify({
                access_token: data.access_token,
                token_type: data.token_type,
                refresh_token: data.refresh_token,
                user_id: responseUser.data.client_id,
                expires_in: expireDate
            }))

            dispatch(setUserAc(responseUser.data.client_id))
            dispatch(setIsAuthAc(true));
        } else {
            dispatch(setAuthStatusAc(config.messageStatuses.error))
            setTimeout(() => {
                dispatch(setAuthStatusAc(config.messageStatuses.default));
            }, 3000)
        }
    }
}

export const checkAuthWithoutLogin = (expires_in, refreshToken) => {
    return async (dispatch) => {
        if (expires_in && expires_in > new Date()) {
            dispatch(setIsAuthAc(true))
        } else if (refreshToken) {
            const response = await authApi.refreshToken(refreshToken)
            if (response.status == 200) {
                const data = response.data

                const expireDate = getExpireDate(data.expires_in);

                dispatch(setTokenAc(data.access_token, data.token_type, data.refresh_token, expireDate));

                const responseUser = await userApi.getUser(data.access_token, data.token_type)

                localStorage.setItem('tokenInfo', JSON.stringify({
                    access_token: data.access_token,
                    token_type: data.token_type,
                    refresh_token: data.refresh_token,
                    user_id: responseUser.data.client_id,
                    expires_in: expireDate
                }))

                dispatch(setUserAc(responseUser.data.client_id))
                dispatch(setIsAuthAc(true));
            }

        }
    }
}

export const logout = () => (dispatch) => {
    dispatch(setTokenAc('', '', ''));
    dispatch(setIsAuthAc(false));
    localStorage.removeItem('tokenInfo');
}

export const setAuthStatus = (status) => (dispatch) => {
    dispatch(setAuthStatusAc(status));
}

