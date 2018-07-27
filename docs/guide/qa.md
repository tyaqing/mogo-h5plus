# 常见问题

常见问题一般来说就是白屏问题,或者页面不存在,可能有以下几种情况

**Q1:删除一些页面后控制台报错**

这是由于`HtmlWebpackPlugin`没有找到模板的问题,只需要重新`npm start`即可.

**Q2:`npm start`控制台报语法错误**

请升级你的 node 到最新版本

**Q3:`npm start`后出现空白页面无法显示**

1.  电脑和调试的手机需要在同一个局域网下面
2.  `npm start`后如果局域网 ip 地址有变,请同时在 manifest.json 中修改页面入口

## 速度优化方案

最近许多反映脚手架很慢的可以参考一下优化方案,可以大大提高调试/打包速度.

1.2 的版本中移除了一些不必要的插件,应该会快那么一点吧.追求速度的继续往下看.

由于 demo 需要展示各种 ui,加载了各种的 ui 的 loader,所以如果开发者用不到可以将其移除.

### 1.如果不使用 VUX

注释掉 `vux-loader` 即可,在`webpack.base.conf.js`中,修改以下代码

```js
const vuxLoader = require("vux-loader");

module.exports = vuxLoader.merge(webpackConfig, {
  plugins: ["vux-ui"]
});
```

修改后

```js
module.exports = webpackConfig;
```

### 2.如果不使用 vant

移除掉`.babalrc`中以下代码

```json
[
  "import",
  {
    "libraryName": "vant",
    "libraryDirectory": "es",
    "style": true
  }
]
```

## 自定义返回按钮事件

演示可以在 demo 中购物车页面查看,实现代码如下

```js
plus.key.removeEventListener("backbutton", function() {
  console.log(5555);
});
plus.key.addEventListener(
  "backbutton",
  function() {
    //  nativeUI.conf
    // nativeUI.con
    confirm("确认要离开么?").then(e => {
      if (e.index === 0) {
        plus.nativeUI.toast("离开了");
        const ws = plus.webview.currentWebview();
        ws.hide();
      } else {
        plus.nativeUI.toast("留住了");
      }
    });
  },
  false
);
```
