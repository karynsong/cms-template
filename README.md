## 使用安装

权限不足请使用 sudo

`BM init -f cms-template`
创建名称
版本
cnpm install

### 功能介绍

后台系统模板是基于iview组件的，支持所有iview组件以及全局组件。
如果项目规模够大，请直接 *use(iview)*。
如果项目很小，请务必在业务中 import 对应组件，这样会减少打包体积。

### 目录结构

    ·
    |-- .gitignore          （需要忽略的文件：/node_modules、/bower_components、/dist）
    |-- .babelrc            （babel 编译的文件）
    |-- .eslintrc           （js 语法检测文件）
    |-- config.js           （BM 配置文件）
    |-- node_modules        （node 依赖）
    |-- html                （对外输出的页面文件）
    |-- dist                （对外输出的 js/css 资源文件）
    |-- src                 （工程目录）
        |-- css                 （css 文件目录）
        |-- html                （html 文件目录）
        |-- mock                （mock）
        |-- js                  （js 文件目录）
            |-baseLibs          （此文件一般是外部一些大型的资源文件，且这个文件不会走编译）
            |-common            （公共模块具有完整的页面周期的行为，如：登录）
            |-components        （全局公共组件）
            |-config            （公共配置文件）
            |-directive         （全局指令）
            |-routers           （路由配置）
            |-pages             （页面的业务）
            |-service           （发送请求的服务方法，字段映射配置）
            |-store             （全局的 store 如登录信息）
            |-utils             （工具类函数）
            |-app.vue           （根节点）
            |-main.js           （业务的根节点 js）
            |-vendor.js         （公共的资源文件引入）

### 修改配置文件

修改文件目录中的```src\js\config\index.js```
``` javascript
// 独立开发时，mock 服务的路径
export const TESTPATH = '//fe.benmu-health.com'
// 接口拦截到需要跳转登录页面的 code
export const LOGIN_CODE = 1000
// 需要微信认证
export const WXCONFIG = true
// 请求超时时间
export const AJAXTIMEOUT = 20000
// 请求是否会发送本地的请求
export const LOCAL_AJAX = false

export const DEBUG = {
    // 请求打印
    req: false,
    // 响应打印
    res: false,
    //开启vconsole
    vconsole: false,
    // 开启vue debug
    v_debug: true,
    // 开启vue devtools
    v_devtools: true
}
```
将上面的配置文件，配置成适用于当前项目的参数

### 启动

    BM server // 启动该项目，该项目会自动打开浏览器

### `ajax 和 常量使用规范 ( Service 层)`

底层使用`axios`，需要了解`API`自行了解`axios`库，需要在`service`中配置好自己的请求发送参数如
``` javascript
// order.js
{
    // 接口名称，调用时会用到，注意重复
    name: 'detail',
    // 发送请求类型
    method: 'GET',
    // 接口描述
    desc: '医生个人信息接口',
    // 本地地址
    localPath: '/test/sectionDoctor/detail',
    // 线上地址
    path: '/mobile/wx/individualDoc/queryById',
    // 发送出去的参数，自动会截取相应的参数，即使你传了很多用不到的参数也没关系。
    // 如果不传定义好的参数，则会把下面的默认值带上发出去
    params: {
        key: value
    }
}

```
`Service` 层大概结构如下：
```
|-service                  （服务层）
    |-apis                 （请求集合）
        |-index.js         （主页配置）
        |-order.js         （订单模块）
    |-consts               （常量集合）
        |-index.js         （主页配置）
        |-order.js         （订单模块）
```
`Service` 层文件命名尽量保持对应，抽象我们的业务，这样我们可以减少很多变量和请求方法的冗余代码，order 模块在 index 中进行配置如下：

```javascript
import { Apior } from 'Utils/apior'
// 报告查询
import order from './order'

export default new Apior({
    order
})['_apiMap']
```
这样 Apior 会自动用 order 来作为前缀，做一层命名空间，放到$service中。

业务中调用方式
``` javascript
this.$apis['order/detail']({
    key: value
}, {
    // 额外的参数 如：header
    noShowDefaultError: true // 不弹出默认的报错提示
}).then((data) => {
    // 已经过滤了 resData.data，可直接使用，无需判断
    // 具体的过滤器在 config/ajax 中
}, () => {
    // 失败的回调，错误已经自动报了，一般无需关心
});
```
如果你想单独发请求也没关系
``` javascript
//this.$ajax 替换为 GLOBAL.ajax 也行
this.$ajax.get('/user?ID=12345')
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
 
// Optionally the request above could also be done as 
this.$ajax.get('/user', {
    params: {
      ID: 12345
    }
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  })

this.$ajax.post('/user', {
    firstName: 'Fred',
    lastName: 'Flintstone'
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
```
对于常量，建议都使用大写。
```javascript
//service/consts/other 目录结构
export default [{
    name: 'MENU', 
    value: [{
        id: 1,
        parentId: 0,
        label: '指标管理',
        route: '/tomato/target',
        show: true,
        order: 1,
        icon: 'arrow-graph-up-right',
    }, {
        id: 2,
        parentId: 0,
        order: 1,
        label: 'IDEA管理',
        route: '/tomato/idea',
        show: true,
        icon: 'ios-flower'
    }, {
        id: 3,
        parentId: 0,
        order: 1,
        label: '项目管理',
        route: '/tomato/project',
        show: true,
        icon: 'ios-briefcase'
    }, {
        id: 4,
        parentId: 0,
        order: 1,
        label: '项目报告',
        route: '/tomato/report',
        show: true,
        icon: 'ios-paper'
    }]
}]
```
这样我们在业务中使用的时候 `this.$consts['other/MENU']` 便可以拿到，如果不在业务中：
```javascript
import CONSTS from 'Service/consts'

console.log(CONSTS['other/MENU'])

```
也是完全可以拿到的，`apis` 也是。



### `router` 命名规范

命名尽量遵循`父级路由.当前路由`的规则，一般路由路径不能超过三层，需要考虑效率问题

路由配置文件在 `config/router` 中，路由配置规则尽量遵循父子路由的关系，子路由都配置在父路由的 `children` 属性中，配置自路由的好处是在打开子路由返回的时候，父级路由的转台都还保存着

订单模块，有搜索条件的页面，搜索结果列表页面，搜索详情页面，构造出来的路由如下：
``` javascript
{
    path: '/order',
    component: Order,
    children: [{
        path: '/search',
        component: Search
    },{
        path: '/list',
        component: List,
        children: [{
            path: '/detail',
            component: Detail
        }]
    }]
}
```

父路由中模板文件也需要增加对应的自路由组件

``` javascript
<transition name="child">
    <router-view></router-view>
</transition>
```


### `store` 使用（ `vuex` ）

在通常的业务中，通常会把所有 `store` 都放到一个目录下，通过 `modules` 来拆分，现实很美好，科室后台系统这种业务，其实模块与模块之间的交互并不高，可以说是基本没有，所以随着业务的增长，`store` 下的对应的module越来越多，在 `store` 和 `pages` 中来回切换就非常耗时。

好在 `vuex@2.3.1 `之后添加了 `registerModule` 和 `unregisterModule` 2个方法，让我们能把 `store` 中的 `module` 分散到对应的业务当中。


使用都是跟着路由的生命周期完成的，这里并不是真正的把`store`移除，实质上只是在当前的`store`树上解除了引用关系，下来再次加回来的时候状态都还在。如果想要每次都是新的状态，应该在`state`的声明的时候返回一个纯函数，每次使用的时候都是新的状态。

``` javascript
beforeRouteEnter(to, from, next) {
    store.install()
    next()
},
beforeRouteLeave(to, from, next) {
    store.uninstall()
    next()
}
```

### `actions` 命名规范

由于项目中的 `store` 是合并到一个 `store` 上，获取 `actions` 的方式又是通过 `mapActions`，所以需要做好命名的区分。

一般我们是用，由于有命名空间，在多个模块间共用的`actions`不能重复:

    DO_something	GET_HOSLIST

### `getter` 命名规范

由于项目中的 `store` 是合并到一个 `store` 上，获取 `getter` 的方式又是通过 `mapGetters`，所以需要做好命名的区分

有了命名空间，一般是不会重复，一般我们是用:

	...mapGetters('tab', ['activeTab', 'showMask'])

### `pages` 文件夹下命名规范

原子命名和尽量全部都小写

比如有一个目录结构是：

    医院管理
        医院列表

对应的 `page` 下的文件目录结构就应该类似如下：

	hosmanage
		list

    //或者

    hosmanage
        hoslist

这样看起来会使整个目录整洁，尽量少的文件夹名，也会跟容易让人记得住。

### 模块的构成

当划分出一个子模块之后，我们不能简单粗暴的用一个 `.vue` 文件把所有业务逻辑完成，除非你的模块功能非常单一，其他的情况，我们希望把模块进行划分，由多个子 `component` 组成，划分的粒度也需要自己掌握，粒度越细越灵活，但也意味着 `component` 间的交互会变得复杂。

比如我们划分出了三个模块 `header`、`list`、`footer`，我们的目录结构按照上面的继续写就会是

``` javascript
	hosManager
		hosList
			index.vue
            store
                index.js
                actions.js
                modules
                    header.js
                    list.js
                    footer.js
            components
                header.vue
                list                // 如果业务非常复杂可做一下拆分
                    index.vue		// 参照 vue2 官网说明，这个文件是作为引入其他文件存在
                    index.js	    // js 逻辑文件
                    index.scss		// 样式文件
                    index.html		// html 文件
                footer.vue
```

`hosList/index.vue` 仅仅是作为组织文件，将三个子模块引入，并且做好架子的角色，如 `html` 中的布局，如果 `component` 间需要事件交互，这个文件也可以充当中介者的角色。


### `beacon` 的使用

发送`beacon`记录打点，发送到`hive`中，各业务再去找对应的后端做查询，具体文件在`utils/beacon.js`

``` javascript
$Beacon(key, page(可缺省), {
    // 保留参数，没有特殊需求这些参数不能覆盖 openId  userId  时间戳
    extra_[a-e]: '额外参数'
    // 额外需要记录的数据
    extra_[d-g]: '额外参数'
});

$Beacon('WX_DLZC0000005');
$Beacon('WX_DLZC0000005', '登录页', {
    extra_d: '注册业务'
});
$Beacon('WX_DLZC0000005', {
    extra_d: '注册业务'
});
```

## `vue` 使用规范

### 组件交互
兄弟组件

    父组件向子组件传递数据:
    props

    子组件向父组件抛出事件:
    vm.$emit('xxx')

    父组件用v-on:xxx="func"来接子组件触发的事件和暴露的数据

虽然vue还提供了`$ref`和`$parent`来让我们访问其他组件的数据和方法，但为了工程的可维护性，让我们的数据变化的追踪变得有规律可循，我们应尽量避免他们的使用

非兄弟组件
有时候非父子关系的组件也需要通信。在简单的场景下，使用一个空的 `Vue 实例作为中央事件总线`

业务简单:

    var bus = new Vue()

    // 触发组件 A 中的事件
    bus.$emit('id-selected', 1)

    // 在组件 B 创建的钩子中监听事件
    bus.$on('id-selected', function (id) {
    // ...
    })

业务复杂:

    请直接使用Vuex
    actions中只做异步和分发
    commit应该按state结构来细分 尽量避免一个commit修改多个state

## 格式

如果不给代码做格式化就是等于代码没有写。请原谅我是 tab = 4空格档，就必须是这样的

