import axios from 'axios';
import { API_NOTIFICATION_MESSAGES, SERVICE_URLS } from '../constants/config.js';
import { getAccessToken, getType } from '../utils/common-utils.js';

const API_URL = 'http://localhost:8000';

const axiosInstance = axios.create({
    baseURL: API_URL,
    timeout: 10000,
    headers: {
        'content-type': 'application/json'
    }
});

axiosInstance.interceptors.request.use(
    function (config) {

        if (config.TYPE.params) {
            config.params = config.TYPE.params;
        }
        else if (config.TYPE.query) {
            config.url = config.url + '/' + config.TYPE.query;
        }

        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
)

axiosInstance.interceptors.response.use(

    function (response) {
        // Stop global loader here 
        return processResponse(response);
    },
    function (error) {
        // Stop global loader here
        return Promise.reject(processError(error));
    }
)

///////////////////
// if success ->return {isSuccess:true,data:Object}
// if fail -> return {isFailure:true, status:String ,msg: string,code:int}

/////////////*/

const processResponse = (response) => {

    if (response?.status === 200) {
        return { isSuccess: true, data: response.data }
    }
    else {
        return {
            isFailure: true,
            status: response?.status,
            message: response?.msg,
            code: response?.code
        }

    }

}

///////////////////
// if success ->return {isSuccess:true,data:Object}
// if fail -> return {isFailure:true, status:String ,msg: string,code:int}

/////////////*/

const processError = (error) => {

    if (error.response) {
        // Request Made and server responded with a status other 
        // that falls out of range 2.x.x.
        console.log('Error in Response:', error.toJSON());
        return {
            isError: true,
            msg: API_NOTIFICATION_MESSAGES.responseFailure,
            code: error.response.status
        }

    }
    else if (error.request) {
        // Request made but no response was recieved
        console.log('Error in Request:', error.toJSON());
        return {
            isError: true,
            msg: API_NOTIFICATION_MESSAGES.requestFailure,
            code: ""
        }
    }
    else {
        // Something happened in setting up request that triggers the error
        console.log('Error in Network:', error.toJSON());
        return {
            isError: true,
            msg: API_NOTIFICATION_MESSAGES.networkError,
            code: ""
        }
    }
}

const API = {};


for (const [key, value] of Object.entries(SERVICE_URLS)) {
    API[key] = (body, showUploadProgress, showDownloadProgress) =>
        axiosInstance({
            method: value.method,
            url: value.url,
            data: value.method === 'DELETE' ? {} : body,
            responseType: value.responseType,
            headers: {
                authorization: getAccessToken()
            },

            TYPE: getType(value, body),

            onDownloadProgress: function (progressEvent) {
                if (showDownloadProgress) {
                    let percentageCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    showUploadProgress(percentageCompleted);
                }
            },

            onUploadProgress: function (progressEvent) {
                if (showUploadProgress) {
                    let percentageCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    showUploadProgress(percentageCompleted);
                }
            }

        });
}

export { API };