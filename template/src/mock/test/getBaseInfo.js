
module.exports = [{
    response: {
        resCode: 0,
        msg: "请求成功",
        data: {
            userinfo: {
                name: 'Zero',
                avator: 'https://lev-inf.benmu-health.org/resource/image/bd120917e871021ebc7a5481ea78d5e5.jpg'
            },
            menu: [{
                id: 1,
                parentId: 0,
                label: 'api',
                route: '/api',
                show: true,
                order: 1,
                icon: 'ios-paper',
            }, {
                id: 2,
                parentId: 1,
                order: 1,
                label: 'api文档',
                route: '/api/document',
                show: true,
                icon: 'ios-paper'
            }]
        }
    }
}]
