import {extApi} from "../api/api";
import {config} from "../config";


const SET_EXTENTIONS = 'SET_EXTENTIONS';
const SET_EDIT = 'SET_EDIT';
const SET_STATUS = 'SET_STATUS';


const initialState = {
    extentions: [],
    edit: false,
    extStatus: null
}

export const extReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_EXTENTIONS:
            return {...state, extentions: action.extentions}
        case SET_EDIT:
            return {...state, edit: action.edit}
        case SET_STATUS:
            return {...state, extStatus: action.status}
        default:
            return state
    }
}

export const setExtentionsAc = (extentions) => {
    return {
        type: SET_EXTENTIONS,
        extentions: extentions
    }
}

export const getExts = (token, tokenType, userId) => {
    return async (dispatch) => {
        const data = await extApi.getExts(token, tokenType, userId)
        dispatch(setExtentionsAc(data))

    }
}

export const setEditAc = (edit) => {
    return {
        type: SET_EDIT,
        edit: edit
    }
}

export const setStatusAc = (status) => {
    return {
        type: SET_STATUS,
        status: status
    }
}

export const setEdit = (edit) => (dispatch) => {
    dispatch(setEditAc(edit))
}

export const updateExt = (token, tokenType, extId, userId, body) => {
    return async (dispatch) => {
        const response = await extApi.updateExt(extId, userId, token, tokenType, body)
        if (response.status == 200) {
            await getExts(token, tokenType, userId)(dispatch);

            dispatch(setStatusAc(config.messageStatuses.success))
            setTimeout(() => {
                dispatch(setStatusAc(config.messageStatuses.default))
            }, 3000)
        } else {

            dispatch(setStatusAc(config.messageStatuses.error))
            setTimeout(() => {
                dispatch(setStatusAc(config.messageStatuses.default))
            }, 3000)
        }

    }
}



