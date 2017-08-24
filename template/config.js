/**
* @Author: songqi
* @Date:   2017-02-06
* @Last modified by:   songqi
* @Last modified time: 2017-02-22
*/

module.exports = {
    'frame': 'frameName',
    'server': {
        'path': '../',
        'port': 80
    },
    'proxy': [{
        'route': '/test',
        'target': '127.0.0.1:52077/test'
    }],
    'mockServer': {
        'port': 52077,
        'mockDir': './dist/mock'
    },
    'openPath': '//fe.benmu-health.com/',
    'exports': [
        /************
         ** 首页 **
         *************/
        'css/vendor.less',
        'css/main.scss',
        'js/vendor.js',
        'js/main.js'
    ],
    'vue2': true,
    'alias': {
        'Pages': 'js/pages',
        'Utils': 'js/utils',
        'Config': 'js/config',
        'Service': 'js/service',
        'Store': 'js/store',
        'Common': 'js/common',
        'Components': 'js/components'
    }
};
