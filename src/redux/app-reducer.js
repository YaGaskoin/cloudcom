import {checkAuthWithoutLogin} from "./auth-reducer";

const INITIALIZE_APP = 'INITIALIZE'


const initialState = {
    initialized: false,
    isAuth: false
}


export const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case INITIALIZE_APP:
            return {...state, initialized: true}
        default :
            return state
    }
}

export const initializeAppAc = () => {
    return {
        type : INITIALIZE_APP
    }
}

export const initApp = (expires_in, refreshToken) =>
    async (dispatch) => {
    await checkAuthWithoutLogin(expires_in, refreshToken)(dispatch)
    dispatch(initializeAppAc())
}

