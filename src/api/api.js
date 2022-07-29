import * as axios from "axios";
import {config} from "../config";
import {makeFormData} from "../utils";

const baseUrl = 'https://apiproxy.telphin.ru/'

const instance = axios.create({
    baseURL: baseUrl,
    withCredentials: false
})

export const authApi = {
    authorization(username, password) {
        const dataObj = {
            grant_type: 'password',
            client_id: config.auth.app_id,
            client_secret: config.auth.app_secret,
            username: username,
            password: password
        }
        const bodyForm = makeFormData(dataObj);

        return instance.post('/oauth/token', bodyForm,
            {
                headers: {"Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"}
            }).then(response => {
            return response
        }).catch(response => {
            return response
        })
    },
    refreshToken(refreshToken) {
         const dataObj = {
            grant_type: 'refresh_token',
            client_id: config.auth.app_id,
            client_secret: config.auth.app_secret,
            refresh_token: refreshToken,
            redirect_uri: '/'
        }
         const bodyForm = makeFormData(dataObj);

         return instance.post('/oauth/token', bodyForm,
            {
                headers: {"Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"}
            }).then(response => {
                console.log(response)
            return response
        }).catch(response => {
            console.log(response)
            return response
        })
    }
}

export const userApi = {
    getUser(token, tokenType) {
        return instance.get('/api/ver1.0/user/',
            {
                headers: {"Authorization": tokenType + ' ' + token}
            })
    }
}

export const extApi = {
    getExts(token, tokenType, userId) {
        return instance.get('/api/ver1.0/client/' + userId + '/extension/',
            {headers: {'Content-Type': 'application/json', "Authorization": tokenType + ' ' + token}}).then(
            response => {
                return response.data
            })
    },
    updateExt(extId, userId, token, tokenType, body) {
        return instance.put('/api/ver1.0/client/' + userId + '/extension/' + extId, body,
            {headers: {'Content-Type': 'application/json', "Authorization": tokenType + ' ' + token}}).then(
            response => {
                return response
            }).catch((response) =>{
                return response
        })
    }
}