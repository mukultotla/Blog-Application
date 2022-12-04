import axios from 'axios';
import {API_NOTIFICATION_MESSAGES, SERVICE_URLS} from '../constants/config';
const API_URL = 'http://localhost:8000'
const axiosInstance = axios.create({
    baseURL: API_URL,
    timeout: 10000,
    headers: {
        "content-type": "application/json"
    }
})

axiosInstance.interceptors.request.use(
    function(config){
        return config;
    },
    function(error){
        return Promise.reject(error)
    }
)

axiosInstance.interceptors.response.use(
    function(response){
        // Stop global loader here
        return processResponse(response)
    },
    function(error){
        // Stop global loader here
        return Promise.reject(processError(error))
    }
)

/////
// If success -> return { isSuccess: true, data: Object }
// If fail -> return { isFailure: true, status: string, msg: string, code: int }
const processResponse = (response) => {
    if(response?.status === 200) {
        return { isSuccess: true, data: response.data }
    } else {
        return {
            isFailure: true,
            status: response?.status,
            msg: response?.msg,
            code: response?.code
        }
    }
}

/////
// If success -> return { isSuccess: true, data: Object }
// If fail -> return { isFailure: true, status: string, msg: string, code: int }
const processError = (error) => {
    if(error.response){
        // Request made and server responded with status other then 2.x.x
        console.log('Error in response: ', error.toJSON())
        return {
            isError: true,
            msg: API_NOTIFICATION_MESSAGES.responseFailure,
            code: error.response.status
        }

    } else if(error.request){
        // Request made but no response was received
        console.log('Error in request: ', error.toJSON())
        return {
            isError: true,
            msg: API_NOTIFICATION_MESSAGES.requestFailure,
            code: ""
        }
    } else {
        // Something went wrong in setting up request that triggered error
        console.log('Error in network: ', error.toJSON())
        return {
            isError: true,
            msg: API_NOTIFICATION_MESSAGES.networkError,
            code: ""
        }
    }
}

const API = {}

for(const [key, value] of Object.entries(SERVICE_URLS)){
    API[key] = (body) => {
        console.log('body -> ', body)
        axiosInstance({
            method: value.method,
            url: value.url,
            data: body,
            responseType: value.responseType,
        })
}
}

export {API}

