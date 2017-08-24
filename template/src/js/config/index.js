// 独立开发时，mock 服务的路径
export const TESTPATH = '//fe.benmu-health.com'
// 跳转登陆页面的 url
export const LOGIN_HREF = '/settle/login.html'
// 接口拦截到需要跳转登录页面的 code
export const LOGIN_CODE = 1204
// 接口超时abort时间
export const ABORT_TIME = 20
// 请求本地ajax
export const LOCAL_AJAX = true

/**
 * 开启项目调试
 * @type {Boolean}
 * 控制台打印 请求 响应 请求报错 响应报错
 * 开启vue调试 
 * 有待补充
 */
export const DEBUG = {
    // 请求打印
    req: false,
    // 响应打印
    res: false,
    // 开启vue debug
    v_debug: true,
    // 开启vue devtools
    v_devtools: true
}
