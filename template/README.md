<!--
@Author: songqi
@Date:   2017-01-09
@Last modified by:   songqi
@Last modified time: 2017-02-28
-->

## 使用安装

### 功能介绍

能通过简单的命令加载出后台 BM 后台系统的基本架子，立马能进行业务需求开发

通过命令 sudo BM init -f vue2  初始化```（根据提示创建项目)```

sudo 权限是因为不太清楚 cnpm 使用的是什么权限安装的，这样安装的项目权限是 777

### 修改配置文件

修改文件目录中的```src\js\config\config```

    // 独立开发时，mock 服务的路径
    export const TESTPATH = '//fe.benmu-health.com';
    // 跳转登陆页面的 url
    export const LOGINHREF = '/settle/login.html';
    // 接口拦截到需要跳转登录页面的 code
    export const LOGINCODE = 1000;
    // 请求左边菜单栏结构的 URL
    export const BASEINFOURL = '//bc.benmu-health.org/bcapi/ossTree';
    // hash bang 的标志
    export const HREFTAG = '#';
    // 当前系统的访问路径，从根路径开始算，用于看是否需要跳转到其他系统
    export const PATH = 'cc/index.html';

将上面的配置文件，配置成适用于当前项目的参数

### 启动

    BM server // 启动该项目，该项目会自动打开浏览器

## 规范

### `ajax url` 命名规范

我们这里的 `ajax` 发送都会在发送请求的时候，`url` 只是填某个 `key`，然后会根据这个 `key` 到 `config/ajax` 中找这个 `key` 对应的 `url`。如：

	COMMON_getBaseInfo: '/test/getBaseInfo'
	// COMMON_getBaseInfo 就是 key
	// 发送请求如下
	get({
		url: 'COMMON_getBaseInfo'
	}) 
	// 命名拆解
	// COMMON 是模块名
	// getBaseInfo 是接口描述，驼峰法，do something

### `router` 命名规范

路由配置文件在 `config/router` 中，路由配置规则尽量遵循父子路由的关系，子路由都配置在父路由的 `children` 属性中，我们如何定义父子路由呢？

订单模块，有搜索条件的页面，搜索结果列表页面，搜索详情页面，构造出来的路由如下

	{
    	path: '/order',
    	component: Order,
    	children: [{
    		path: '/search',
    		component: Search
    	},{
    		path: '/list',
    		component: List
    	},{
    		path: '/detail',
    		component: Detail
    	}]
	}

### `pages` 文件夹下命名规范

我们认为 `pages` 下的子模块是遵循某种模块划分的，这样会更有利于之后维护代码，所以一般我们在 `pages` 下建立模块的时候一般是遵循以页面来划分。
那么 `pages` 下的目录结构其实就是后台功能菜单栏功能目录的一种体现。

比如有一个目录结构是：

    医院管理
        医院列表

对应的 `page` 下的文件目录结构就应该类似如下（我的英语不好，只能下面这样翻译了）：

	hosManager
		hosList

上面这种这是模块划分映射目录划分的一种方式，我们还可以依照功能去划分，这样划分可能需要有更强的语义性

### 模块的构成

当划分出一个子模块之后，我们不能简单粗暴的用一个 `.vue` 文件把所有业务逻辑完成，除非你的模块功能非常单一，其他的情况，我们希望把模块进行划分，由多个子 `component` 组成，划分的粒度也需要自己掌握，粒度越细越灵活，但也意味着 `component` 间的交互会变得复杂。

比如我们划分出了三个模块 `header`、`list`、`footer`，我们的目录结构按照上面的继续写就会是

	hosManager
		hosList
			index.vue
			header
				index.vue		// 参照 vue2 官网说明，这个文件是作为引入其他文件存在
				index.js			// js 逻辑文件
				index.scss		// 样式文件
				index.html		// html 文件
			list
				...
			footer
				...
	
`hosList/index.vue` 仅仅是作为组织文件，将三个子模块引入，并且做好架子的角色，如 `html` 中的布局，如果 `component` 间需要事件交互，这个文件也可以充当中介者的角色。

上面写的单个 `component` 是足够复杂才会有这些文件的划分。

### `store` 文件夹下命名规范

我们的 `store` 的命名规范基本上是围绕着 `pages` 来做的，`pages` 确定之后，其实 `store` 就已经确定了。

	hosManager
		hosList
			actions.js		// actions
			state.js			// state
			module			// 子模块
				header.js	// header 的 state
				list.js		// list 的 state
				footer.js	// footer 的 state
				
### `actions` 命名规范

由于项目中的 `store` 是合并到一个 `store` 上，获取 `actions` 的方式又是通过 `mapActions`，所以需要做好命名的区分。

一般我们是用:

	模块名_DO_something	COMMON_GET_baseInfo、COMMON_TOGGLE_userTab
	
	模块名可能还会变成 父模块_子模块
	DO 采用 restful 设计 GET、SET、PUT、DELETE
	something 是 actions 的描述

上述命名规范虽然繁琐，有可能你会不太喜欢，但是面对复杂的业务，我们不得不这么去做，来保证之后随着业务发展，代码的维护性、茁壮性。

### `getter` 命名规范

由于项目中的 `store` 是合并到一个 `store` 上，获取 `getter` 的方式又是通过 `mapGetters`，所以需要做好命名的区分

一般我们是用:

	模块名_something	COMMON_HEADER_userInfo、COMMON_HEADER_userInfo
	
	模块名可能还会变成 父模块_子模块
	something 是 getter 的描述

同上

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

## 其他还没有想好，支持一切新的属性，你可以尽情的使用

## 数组

### 向数组增加元素时使用 Array#push 来替代直接赋值。
```javascript
  var someStack = [];
    // bad
    someStack[someStack.length] = 'abracadabra';
    // good
    someStack.push('abracadabra');
```
ps：尽量不要频繁取值。

### 当你需要拷贝数组时，使用 Array#slice
```javascript
    var item = [1,2,3];
    var item_len = item.legth;
    var itemArr = [];
    var i = '';
    // bad
    for(i = 0; i < item_len; i++){
        itemArr[i] = item[i];
    }
    // good
    itemArr = item.slice();
```
### 使用 Array#slice 将类数组对象转换成数组
```javascript
    function trigger() {
      var args = Array.prototype.slice.call(arguments);
      ...
}
```

## 字符串

### 使用单引号，包引字符串
``` javascript

var str = 'helloe world!';

```

### 超过 100 个字符的字符串应该使用连接符写成多行。
```javascript
var str = '<p>你好</p>'+
        '<p>你好<p>'+
        '<p>你好</p>';

```
ps：尽量用“+”，不用“\”，若字符很长，需折行，不用折行，会影响性能读取问题。

### 程序化生成的字符串使用 Array#join 连接而不是使用连接符。尤其是 IE 下
```javascript
    for (i = 0; i < length; i++) {
        //bad
        items += '<li>' + messages[i].message + '</li>';
        //good
        items[i] = '<li>' + messages[i].message + '</li>';
    }

    //bad
        return '<ul>' + items + '</ul>';
    //good
        return '<ul>' + items.join('') + '</ul>';
```
ps：for循环，length提前取出。


```javascript
{
    "rules": {
        //官方文档 http://eslint.org/docs/rules/
        //参数：0 关闭，1 警告，2 错误

        // "quotes": [0, "single"],                  //建议使用单引号
        // "no-inner-declarations": [0, "both"],     //不建议在{}代码块内部声明变量或函数
        "no-extra-boolean-cast": 1, //多余的感叹号转布尔型
        "no-extra-semi": 1, //多余的分号
        "no-extra-parens": 0, //多余的括号
        "no-empty": 1, //空代码块
        "no-use-before-define": [0, "nofunc"], //使用前未定义
        "complexity": [1, 10], //圈复杂度大于10 警告

        //常见错误
        "comma-dangle": [1, "never"], //定义数组或对象最后多余的逗号
        "no-debugger": 1, //debugger 调试代码未删除
        "no-console": 0, //console 未删除
        "no-constant-condition": 2, //常量作为条件
        "no-dupe-args": 2, //参数重复
        "no-dupe-keys": 2, //对象属性重复
        "no-duplicate-case": 2, //case重复
        "no-empty-character-class": 2, //正则无法匹配任何值
        "no-invalid-regexp": 2, //无效的正则
        "no-func-assign": 2, //函数被赋值
        "valid-typeof": 1, //无效的类型判断
        "no-unreachable": 2, //不可能执行到的代码
        "no-unexpected-multiline": 2, //行尾缺少分号可能导致一些意外情况
        "no-sparse-arrays": 1, //数组中多出逗号
        "no-shadow-restricted-names": 2, //关键词与命名冲突
        "no-undef": 0, //变量未定义
        "no-unused-vars": 1, //变量定义后未使用
        "no-cond-assign": 2, //条件语句中禁止赋值操作
        "no-native-reassign": 2, //禁止覆盖原生对象
        "no-mixed-spaces-and-tabs": 0,

        //代码风格优化
        "no-irregular-whitespace": 0,
        "no-else-return": 0, //在else代码块中return，else是多余的
        "no-multi-spaces": 0, //不允许多个空格
        "key-spacing": [0, {
            "beforeColon": false,
            "afterColon": true
        }], //object直接量建议写法 : 后一个空格前面不留空格
        "block-scoped-var": 1, //变量应在外部上下文中声明，不应在{}代码块中
        "consistent-return": 1, //函数返回值可能是不同类型
        "accessor-pairs": 1, //object getter/setter方法需要成对出现
        "dot-location": [1, "property"], //换行调用对象方法  点操作符应写在行首
        "no-lone-blocks": 1, //多余的{}嵌套
        "no-empty-label": 1, //无用的标记
        "no-extend-native": 1, //禁止扩展原生对象
        "no-floating-decimal": 1, //浮点型需要写全 禁止.1 或 2.写法
        "no-loop-func": 1, //禁止在循环体中定义函数
        "no-new-func": 1, //禁止new Function(...) 写法
        "no-self-compare": 1, //不允与自己比较作为条件
        "no-sequences": 1, //禁止可能导致结果不明确的逗号操作符
        "no-throw-literal": 1, //禁止抛出一个直接量 应是Error对象
        "no-return-assign": [1, "always"], //不允return时有赋值操作
        "no-redeclare": [1, {
            "builtinGlobals": true
        }], //不允许重复声明
        "no-unused-expressions": [0, {
            "allowShortCircuit": true,
            "allowTernary": true
        }], //不执行的表达式
        "no-useless-call": 1, //无意义的函数call或apply
        "no-useless-concat": 1, //无意义的string concat
        "no-void": 1, //禁用void
        "no-with": 1, //禁用with
        "space-infix-ops": 0, //操作符前后空格
        "valid-jsdoc": [0, {
            "requireParamDescription": true,
            "requireReturnDescription": true
        }], //jsdoc
        "no-warning-comments": [1, {
            "terms": ["todo", "fixme", "any other term"],
            "location": "anywhere"
        }], //标记未写注释
        "curly": 0 //if、else、while、for代码块用{}包围
    },
    "env": {
        "es6": true,
        "node": true,
        "browser": true,
        "jquery": true
    },
    "parser": "babel-eslint",
    "ecmaFeatures": {
        "jsx": true
    },
    "plugins": [
        //"react",//写react安装该插件
        "eslint-plugin-html"
    ]
}
```

