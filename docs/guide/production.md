# 发布

## 打包

```bash
npm run build
```

运行命令后会有一个`dist`目录,里面的经过压缩的静态文件.

### Hbuilder 发行打包

在使用 Hbuilder 制作安装包前,请将`入口文件`修改成`dist/index.html`.
然后可以安心的打包了.

## 热更新包

在 Hbuilder 菜单栏中选择`发布`->`制作移动APP资源升级包`,得到的`wgt`文件是可以用来更新的
