/**
 * 这里注册全局组件
 * 单页面应用中 建议所有组件都挂载到全局 而不用在各处import
 */
import Vue from 'vue'
import ACheckBox from './acheckbox'
import CDetail from './cdetail'
import BMfilters from './bmfilters'
Vue.component('ACheckBox', ACheckBox)
Vue.component('CDetail', CDetail)
Vue.component('BMfilters', BMfilters)