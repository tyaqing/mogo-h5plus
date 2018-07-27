# 开发

## 下载脚手架

首先下载脚手架
脚手架项目地址[MogoH5+](https://github.com/tyaqing/mogo-h5plus)

### Git clone

```bash
git clone https://github.com/tyaqing/mogo-h5plus.git
```

### 直接下载

[下载地址](https://github.com/tyaqing/mogo-h5plus/archive/master.zip)

下载后把目录直接导入到 Hbuilder.

## 运行脚手架

```bash
// 1 进入项目主目录
cd mogo-h5plus
// 2 安装npm依赖
npm i  // 或者 yarn  请不要使用cnpm
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

## 新建页面

假如我们要新建一个名称为`list`的页面作为商品列表,我们就要在`./src/page/goods`下新建`list.js`和`list.vue`两个文件.`list.js`作为多页面的入口,`list.vue`,脚手架自带了几个页面可供参考.

```json
{
  "index|plusReady": "./src/main.js",
  "goods.detail": "./src/page/goods/detail.js",
  "goods.cart": "./src/page/goods/cart.js",
  "mui.index|mui|plusReady": "./src/page/mui/index.js"
}
```

### 访问页面

```js
openWebview({ url: "./goods.cart.html", id: "goods.cart" });
openWebview({ url: "./mui.index.html", id: "mui.index" });
```

这里要注意 2 个细节:

1.  后缀一定是`.html`
2.  id 要按照页面的规范,不要出现重复 id

### 删除页面

如果删除页面了页面,也需要删除`page.json`相应的页面描述代码

> 实现原理是监听了`page.json`,一旦`page.json`发生改变,会重启`webpack`

## 新建组件

组件放入`./src/components`目录下,如果组件较多,可自行建立目录.比如 demo 中使用的 Logo 组件可以作为参考.

## 新建工具库

工具库`./src/utils`主要放一些公用函数,比如请求,打开 webview,支付,分享等执行函数.
demo 中封装了部分来自 mui 的函数比如`自定义事件`,`webview`.这些函数可以作为参考.

`common.js` 是每个页面都需要加载的一个 js,里面加载了`fastclick`和`vconsole`.如果全局需要加统计,全局执行的函数,可以放在这个文件里面.

`./src/utils` 做了 `alias`别名,可以 直接这样加载 `import common from "Utils/common"`.

> utils 是我们会经常修改的, 如果有自己的工具库,请另建文件夹

## 请求代理配置 Proxy

首先,只有开发的过程中才会有跨域的情况.App 中不存在跨域.

**为什么会有跨域呢?**

`MogoH5+`的调试是使用`npm run dev`构建了一个局域网服务器的,比如`http://192.168.199.155:8080/`,这样的好处就是视图修改同步很快,不受 Hbuilder 的限制.

起初考虑过`webpack watch`来实现,但是发现`watch`之后的文件变化 HBuilder 无法第一时间反应,也就是说,修改了一个界面,需要等 Hbuilder 发现`文件差异`才会去更新真机的试图.因此才考虑局域网服务器的.

### 请求库

demo 的请求使用的是 `axios`,同样你喜欢什么库都可以自己去封装.

常见的请求库有`fetch`,`request`,`SuperAgent`,`jquery-ajax`.

### 跨域

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
      pathRewrite: { "^/baidu_api": "" },
      changeOrigin: true,
      secure: false
    },
    ...
  }
```

如果有更多业务域名可以继续在`proxy`添加.

只有开发的时候才会有跨域问题,打包后的文件网址会被替换成被代理的网址,因此发送请求一定要加上名称`DOUBANAPI`

```javascript
request({
  url: DOUBANAPI + "/bookList" // 在打包后会变成 https://api.baidu.com/bookList
});
```

## 调试

### VConsole

在 Hbuilder 中调试会有诸多问题,比如:

- 不能直接打印`数组`,`对象`,需要转成字符串.
- 即使使用`webview调试`,仍然不能打印出数组,在 mac 上使用也非常不方便.

使用`VConsole`,调试的问题基本就脱离 Hbuilder 了,使用`VConsole`主要优点如下

- 可以打印数组,对象
- 可以查看请求,cookie,Localstorage
- 在`System`栏目中可以看到页面加载速度
- 可以查看元素

基本上就是一个简化的`开发者工具栏`,对于调试来说非常简便了.

### print 函数

由于 `VConsole` 并不能解决全部调试问题,比如页面关闭后调试信息消失,增加一个 `print` 方法,用于在 Hbuilder 上打印对象

```js
print(someObjorArray);
```

## 使用 mui

1.  首先在`page.json`中给需要使用`mui`的页面加入`|mui`,这一步,`mui`的`js`将会嵌入到改页面当中.

2.  使用相对路径加入 mui 的 css,加入方式如下:

```html
<style lang="less">
@import '../../assets/mui/mui.css';
</style>
```

## 使用 vux/vant

系统默认安装了`vux`和`vux-loader`,`vant`也是默认添加的,直接 import 使用即可.

```js
import { Group, Calendar, Cell, Badge, CellBox, XButton } from "vux";
```

> 如果您不使用 vux,或 vant,可以将其编译器去除来提高您的开发构建效率.[具体方式](qa.html#速度优化方案)

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
