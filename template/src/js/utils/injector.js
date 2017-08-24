// 在 vue 原型上绑定定制化的东西
import apis from 'Service/apis/'
import consts from 'Service/consts/'
export default {
    install: (Vue, options) => {
        Vue.prototype.$ajax = GLOBAL.ajax
        Vue.prototype.$apis = apis
        Vue.prototype.$consts = consts
    }
}
