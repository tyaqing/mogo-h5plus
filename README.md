<div align=center><img width="50%"  src="https://tyaqing.github.io/mogo-h5plus/logo.png"/></div>

### [APP 演示下载地址](https://fir.im/p52j)

![GitHub tag](https://img.shields.io/github/tag/tyaqing/mogo-h5plus.svg)

# MogoH5+ 多页面网页解决脚手架

结合 Hbuilder 使用,可以快速开发 WebApp

- `支持 Npm 生态`
- `支持 vue 语法,以及 vue 生态,比如 vux,mint,vant`
- `支持 ES6/ES7 语法`
- `使用 VConsole 调试`
- `VSCode 友好`
- `局域网便捷调试,不插数据线也可以调试`
- `支持mui的使用`

## [文档地址](https://tyaqing.github.io/mogo-h5plus/)

### MogoH5+ QQ 交流群 780150310

## 更新记录

### 1.1.0 [20180706]

#### [新增]

- `page.json`可以配置是否加载 mui 或者是否使用 plusready
- 增加`fire`页面传值函数,详情可见商品详情页和首页的自定义事件

#### [修复]

- 修复了资源路径加载问题(需修改`page.json`配置)
- 修复了 mui 加载不灵活的问题,减少打包的体积
- 修复了 mui 字体文件加载失败的问题

#### 1.0.x 到 1.1.x

由于之前资源路径的问题,目前的解决方案是修改`page.json`的配置,将原来的以路径作为键`mui/index`写成`mui.index`即可,如下

如果要使用 mui 就加入 `|mui`, 如果要使用 mui 就加入 `|plusReady`,不用则不加.

> plusReady 在安卓手机上提前载入可能会影响页面打开速度,解决方法有两种:1 不提前使 plus 生效 2.预加载 plus

```json
{
  "mui.index|mui|plusReady": "./src/page/mui/index.js"
}
```

#### 注意事项

请在`created`生命周期里面接收事件,否则会因为视图刷新多次执行.

### 1.0.1 [20180704]

- 修复了 background 图片路径打包后不正确的问题

### 1.0.0 [20180630]

- 使用 vue 官方脚手架作为基层,健壮性得到`史诗级`提升
- 添加了 vux 的支持
- 修改的 mui 的加载方式
- 配置方面有部分变化,详情请看文档
- 升级了安卓 app

### 0.3.0 [20180628]

- 解决了因为新增/删除页面导致的 webpack 错误
- 添加了 openWebview 的 extras 参数

### 0.2.0 [20180623]

- 添加了对 mui 样式和 js 的支持

## 部分截图

<div align=center><img width="50%"  src="https://github.com/tyaqing/mogo-h5plus/blob/master/docs/.vuepress/public/s1.png?raw=true"/></div>

<div align=center><img width="50%"  src="https://github.com/tyaqing/mogo-h5plus/blob/master/docs/.vuepress/public/s2.png?raw=true"/></div>

<div align=center><img width="50%"  src="https://github.com/tyaqing/mogo-h5plus/blob/master/docs/.vuepress/public/s2.png?raw=true"/></div>
