---
sidebar: auto
---

# 使用手册

`MogoH5+` 是一个 vue 多页面**脚手架工具**,结合 H5+可以快速开发安卓与苹果 APP.

即使不适用 Hbuilder 打包成 APP,本脚手架同样可以作为多页面网页生成的参考项目.

## 特性

- `支持 Npm 生态`
- `支持 vue 语法,以及 vue 生态,比如 vux,mint,vant`
- `支持 ES6/ES7 语法`
- `使用 VConsole 调试`
- `VSCode 友好`
- `局域网便捷调试`
- `兼容部分 mui 语法`

这些特性其实不是什么新鲜特性,只是单独在 Hbuilder 无法使用.

## 快速上手

直接下载项目然后根据需求定制打包,最后通过 Hbuilder 云打包即可生成 APP.

> 本文自带一个案例是使用 VantUI 开发的几个界面,如果你喜欢其他 UI 同样可以替换成其他的 UI.

```bash
// 1.安装模块
npm i  // or yarn
// 2.调试
npm start   // 将manifest.json 的`页面入口` 修改成 http://your_ip:8082/
// 3.打包
npm run build
```

## 使用

主要怎么使用 MogoH5+做正式的开发,在开发过程中一定要遵守**目录规则**,否则会有意想不到的错误.

### 目录结构

```
.
├── docs  // 文档
├── index.html // 入口模板
├── jsconfig.json //js配置
├── manifest.json //hbuilder 入口文件
├── src  
│   ├── components  //组件文件夹
│   │   └── List.vue  //组件
│   ├── index.js  //主页入口文件
│   ├── index.vue // 主页vue文件
│   ├── page  // 页面
│   └── utils // 工具
├── unpackage // hbuilder 构建目录
│   └── res
└── webpack.config.js  //webpack配置目录
```

### 新建页面

假如我们要新建一个名称为`list`的页面作为商品列表,我们就要在`./src/page/goods`下新建`list.js`和`list.vue`两个文件.`list.js`作为多页面的入口,`list.vue`,脚手架自带了几个页面可供参考.

::: tip 路由
遵循相对路径原则,如果在`src`访问这个页面则就是`./goods/list.html`
!!! 后缀一定是`.html`
:::

### 新建组件

组件放入`./src/components`目录下,如果组件较多,可自行建立目录.比如 demo 中使用的 Logo 组件可以作为参考.

### 新建工具库

工具库`./src/utils`主要放一些公用函数,比如请求,打开 webview,支付,分享等执行函数.
demo 中封装了部分来自 mui 的函数比如`自定义事件`,`webview`.这些函数可以作为参考.

::: tip
`common.js` 是每个页面都需要加载的一个 js,里面加载了`fastclick`和`vconsole`.如果全局需要加统计,全局执行的函数,可以放在这个文件里面.

`./src/utils` 做了 `alias`别名,可以 直接这样加载 `import common from "Utils/common"`.
:::

### 发送请求

#### 请求库

demo 的请求使用的是 `axios`,同样你喜欢什么库都可以自己去封装.

常见的请求库有`fetch`,`request`,`SuperAgent`,`jquery-ajax`.

#### 跨域

由于`npm start`后,调试网页是挂在局域网上,并且作为 Hbuilder 的`页面入口`,因此,在请求时会出现`跨域`.

在`./build.js`中使用本地代理,将下面的`https://api.douban.com`修改成自己使用的业务域名即可.

```javascript
proxy: {
    "/api": {
      name:"DOUBANAPI",  // 自己取名
      target: "https://api.douban.com",
      pathRewrite: { "^/api": "" },
      changeOrigin: true,
      secure: false
    },
     "/baidu_api": {
      name:"BAIDUAPI",  // 自己取名
      target: "https://api.baidu.com",
      pathRewrite: { "^/api": "" },
      changeOrigin: true,
      secure: false
    },
    ...
  }
```

如果有更多业务域名可以继续在`proxy`添加.

::: tip 注意
只有开发的时候才会有跨域问题,打包后的文件网址会被替换成被代理的网址,因此发送请求一定要加上名称`DOUBANAPI`

```javascript
request({
  url: DOUBANAPI + "/bookList"
});
```

:::

### 调试

在 Hbuilder 中调试会有诸多问题,比如:

- 不能直接打印`数组`,`对象`,需要转成字符串.
- 即使使用`webview调试`,仍然不能打印出数组,在 mac 上使用也非常不方便.

使用`VConsole`,调试的问题基本就脱离 Hbuilder 了,使用`VConsole`主要优点如下

- 可以打印数组,对象
- 可以查看请求,cookie,Localstorage
- 在`System`栏目中可以看到页面加载速度
- 可以查看元素

基本上就是一个简化的`开发者工具栏`,对于调试来说非常简便了.

### 打包

```bash
npm run build
```

运行命令后会有一个`dist`目录,里面的经过压缩的静态文件.

### Hbuilder 发行打包

在使用 Hbuilder 制作安装包前,请将`入口文件`修改成`dist/index.html`.
然后可以安心的打包了.

## 兼容 mui.js

对于兼容 mui 部分函数的问题,已经在移植部分函数到`Utils`中,在未来的更新中会慢慢移植.

## 常见问题
