if(!window.Promise){
    window.Promise = require('es6-promise').Promise
}

import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import iView from 'iview'

window.axios = require('axios')

//vbus 全局事件
GLOBAL.vbus = window.vbus = new Vue()
