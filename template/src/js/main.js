import Vue from 'vue'
import VueRouter from 'vue-router'

import App from './app'
import store from 'Store'
// 配置相关
import routers from './routers'

import 'Components'// 全局组件注册
import 'Config/ajax'
import './directives'// 指令

import BMInjects from 'Utils/injector'//插件
import {DEBUG} from 'Config/index'

import iView from 'iview'

Vue.use(VueRouter)//注册路由
Vue.use(iView)//组件库
Vue.use(BMInjects)//注册业务所需

const router = new VueRouter({
    routes: routers,
    hashbang: false,
    transitionOnLoad: true
})

//start
GLOBAL.vm = new Vue({
    router,
    store,
    render: h => h(App)
})
GLOBAL.vm.$mount('#app')


// vue debug
Vue.config.debug = DEBUG.v_debug
Vue.config.devtools = DEBUG.v_devtools
