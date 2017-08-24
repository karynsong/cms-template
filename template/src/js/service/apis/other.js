export default [{
    name: 'allGroup',
    method: 'GET',
    desc: '获取所有部门和组的信息',
    localPath: '/test/getBaseInfo',
    path: '/tomato/common/showAllGroup',
    params: {}
}, {
    name: "type",
    method: "GET",
    desc: "获取所有枚举",
    localPath: "/test/getBaseInfo",
    path: "/tomato/common/showEnum",
    params: {
    	enumType: ''
    }
}, {
    name: "login",
    method: "GET",
    desc: "获取所有枚举",
    localPath: "/test/getBaseInfo",
    path: "/uniuser/sso/login",
    params: {
    	account: '',
    	password: '',
    	app_key: 'p_tomato_provider'
    }
}]
