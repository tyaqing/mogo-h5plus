---
sidebar: auto
---

> MogoH5+之前的教程有点简略,因此再出一个比较详细的分段教程来说明如何使用 MogoH5+.

续上文 [用 vue 快速开发 app 的脚手架工具](https://juejin.im/post/5b192a63e51d4506c3354f18),如果还不了解可以先看上一篇.

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

## 真机调试

将打印出来的 ip 地址,我们打印出来的是`http://192.168.199.155:8080/`,将这个填入页面入口.

![](https://user-gold-cdn.xitu.io/2018/6/12/163f19299efa1d44?w=606&h=244&f=png&s=25160)

然后使用 Hbuilder 基座进行调试测试.

![](https://user-gold-cdn.xitu.io/2018/6/12/163f1938c91c9e1d?w=687&h=112&f=png&s=72460)

## 常见问题

常见问题一般来说就是白屏问题,或者页面不存在,可能有以下几种情况

1.  电脑和调试的手机需要在同一个局域网下面
2.  脚手架会自动热更新,无需在册真机调试
3.  安装软件后可以直接不插线调试,因为同在局域网下
4.  `npm start`后如果局域网 ip 地址有变,请同时在 manifest.json 中修改页面入口

## 注意

# 打包 APP

好啦,app 都做好啦,要打包成安卓和苹果软件了.

这个针对的是调试,如果要发布,请看如何发布打包 app
