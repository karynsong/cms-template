/**
 * 文档地址https://github.com/mzabriskie/axios
 * ajax为axios的实例
 */
import {
    TESTPATH,
    ABORT_TIME,
    DEBUG
} from 'Config/index';

GLOBAL.ajax = axios.create({
    //baseURL: TESTPATH, //调试本地开启 
    timeout: ABORT_TIME*1000 //超时时间 nms后自动abort
})

// request 拦截器
GLOBAL.ajax.interceptors.request.use(function(config) {
    DEBUG.req && console.info(config.url, ' request:', config)
    // 请求带上时间
    if(config.params)config.params.v = +new Date()
    return config;
}, function(error) {
    DEBUG.req && console.error('request', JSON.stringify(error))
    GLOBAL.vbus.$emit('request_error', error)
    return Promise.reject(error);
});

// response 拦截器
GLOBAL.ajax.interceptors.response.use(function(response) {
    DEBUG.res && console.info(response.config.url, ' response:', response)
    //resCode全局处理
    if (response.data.resCode === 0) return response.data.data;

    !!response.config.noShowDefaultError || GLOBAL.vbus.$emit('ajax_handle_error', response)
    return Promise.reject(response)

}, function(error) {
    DEBUG.res && console.error('response', JSON.stringify(error))
    GLOBAL.vbus.$emit('response_error', error)
    return Promise.reject(error);
});


