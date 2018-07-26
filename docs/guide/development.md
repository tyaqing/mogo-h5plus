# 开发

## 下载脚手架

首先下载脚手架
脚手架项目地址[MogoH5+](https://github.com/tyaqing/mogo-h5plus)

### Git clone

```
git clone https://github.com/tyaqing/mogo-h5plus.git
```

### 直接下载

[下载地址](https://github.com/tyaqing/mogo-h5plus/archive/master.zip)

下载后把目录直接导入到 Hbuilder.

## 运行脚手架

```
// 1 进入项目主目录
cd mogo-h5plus
// 2 安装npm依赖
npm i  // 或者 yarn
// 3 调试运行
npm start

// 运行结果如下
ℹ ｢wds｣: Project is running at http://192.168.199.155:8080/
ℹ ｢wds｣: webpack output is served from /
ℹ ｢wdm｣: Hash: e597725cca065f694fbd
Version: webpack 4.10.2
Time: 4959ms
```

直接下载项目然后根据需求定制打包,最后通过 Hbuilder 云打包即可生成 APP.

> 本文自带一个案例是使用 VantUI 开发的几个界面,如果你喜欢其他 UI 同样可以替换成其他的 UI.

## 真机调试

将打印出来的 ip 地址,我们打印出来的是`http://192.168.199.155:8080/`,将这个填入页面入口.

![](https://user-gold-cdn.xitu.io/2018/6/12/163f19299efa1d44?w=606&h=244&f=png&s=25160)

然后使用 Hbuilder 基座进行调试测试.

![](https://user-gold-cdn.xitu.io/2018/6/12/163f1938c91c9e1d?w=687&h=112&f=png&s=72460)

## 使用

主要怎么使用 MogoH5+做正式的开发,在开发过程中一定要遵守**目录规则**,否则会有意想不到的错误.

### 目录结构

```
.
├── assets  // 静态资源
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

### 新建页面/删除页面[0.3.0]

0.3.0 的新建页面和 0.2.0 是兼容的,但是建议您使用 0.3.0 的`page.json`,这样会减少很多因为新建,删除页面产生的错误
如果您需要更自由的页面结构,比如三级目录.可以按照`page.json`格式添加即可.

```json
{
  "goods/detail": "./src/page/goods/detail.js",
  "map/map": "./src/page/map/map.js",
  "mui/index": "./src/page/mui/index.js",
  "user/index": "./src/page/user/index.js"
}
```

比如您需要一个添加一个三级级页面,可以按照下面的方法添加,

```json
{
  ...
  "user/index/point": "./src/page/user/point/index.js"
}
```

如果删除页面了页面,也需要删除`page.json`相应的页面描述代码

> 实现原理是监听了`page.json`,一旦`page.json`发生改变,会重启`webpack`

### 新建组件

组件放入`./src/components`目录下,如果组件较多,可自行建立目录.比如 demo 中使用的 Logo 组件可以作为参考.

### 新建工具库

工具库`./src/utils`主要放一些公用函数,比如请求,打开 webview,支付,分享等执行函数.
demo 中封装了部分来自 mui 的函数比如`自定义事件`,`webview`.这些函数可以作为参考.

::: tip
`common.js` 是每个页面都需要加载的一个 js,里面加载了`fastclick`和`vconsole`.如果全局需要加统计,全局执行的函数,可以放在这个文件里面.

`./src/utils` 做了 `alias`别名,可以 直接这样加载 `import common from "Utils/common"`.
:::

## 请求代理配置

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

## 调试

在 Hbuilder 中调试会有诸多问题,比如:

- 不能直接打印`数组`,`对象`,需要转成字符串.
- 即使使用`webview调试`,仍然不能打印出数组,在 mac 上使用也非常不方便.

使用`VConsole`,调试的问题基本就脱离 Hbuilder 了,使用`VConsole`主要优点如下

- 可以打印数组,对象
- 可以查看请求,cookie,Localstorage
- 在`System`栏目中可以看到页面加载速度
- 可以查看元素

基本上就是一个简化的`开发者工具栏`,对于调试来说非常简便了.

## page.json 配置

这是一份来自`demo`的页面配置,多页面的主要配置也是来自这里,具体实现细节请参看[多页面的实现]

```json
{
  "index|plusReady": "./src/main.js",
  "goods.detail": "./src/page/goods/detail.js",
  "goods.cart": "./src/page/goods/cart.js",
  "mui.index|mui|plusReady": "./src/page/mui/index.js",
  "user.index": "./src/page/user/index.js",
  "vux.index|plusReady": "./src/page/vux/index.js"
}
```

在配置的`键`中发现了`|`符号,`|`后面的值表示页面加载参数,这里主要对一些参数作解释

| 参数        | 解释                                                           | 备注           |
| ----------- | -------------------------------------------------------------- | -------------- |
| `mui`       | 在页面中加载 mui,使用后 mui 会挂在到`window`上                 | /              |
| `plusReady` | 是否使 plus 提前生效 ,提前生效就可以不用监听 plus 是否已经生效 | 仅在安卓上有效 |

> 注意:plus 在安卓上提前生效会增加 50-200ms(根据性能)的加载时间,可以通过增加窗口过场动画的时间弥补,或者预加载窗口
