# 发布

## 打包

```bash
npm run build
```

运行命令后会有一个`dist`目录,里面的经过压缩的静态文件.

### Hbuilder 发行打包

在使用 Hbuilder 制作安装包前,请将`入口文件`修改成`dist/index.html`.
然后可以安心的打包了.

## 如何使用 mui

mui 默认未加载,但是相对应的 js 和 css 放在了 `assets` 目录下.如果需要使用,请按下面步骤操作

### 1.去掉加载注释

在根目录下去掉下面两段标签的注释

```html
<!-- 如果有使用mui,就不要注释下面两个标签 -->
<link rel="stylesheet" href="<%= htmlWebpackPlugin.options.muiSourcePath %>assets/css/mui.min.css">
<script src="<%= htmlWebpackPlugin.options.muiSourcePath %>assets/js/mui.min.js"></script>
```

### 2.使用`npm run build:mui`打包

> 这个命令会复制`assets`中的文件到打包目录.
