# 介绍

> `Hotfix`+`FEmirror 云更新` 只需`几分钟` , 让您的 H5+应用快速拥有热更新功能.


| iphone 热更新 效果如下                                           | 安卓热更新效果如下                                                    | 安卓安装更新如下                                                      |
| ---------------------------------------------------------------- | --------------------------------------------------------------------- | --------------------------------------------------------------------- |
| <img   width="400"  :src="$withBase('/IMG_0040.PNG')" alt="foo"> | <img   width="400"  :src="$withBase('/S80805-211149.jpg')" alt="foo"> | <img   width="400"  :src="$withBase('/S80806-112100.jpg')" alt="foo"> |



## 快速使用 [项目地址](https://github.com/tyaqing/hotfix)

### 安装
#### npm 安装

```bash
npm i h5plus-hotfix -S
```

#### script加载

```html
<script src="hotfix-bs.js"></script>
```

### 使用

```js
hotfix({
  url: updateUrl,
  before(data) {
    // 确认安装
    return new Promise(resolve => {
      plus.nativeUI.confirm(data.title, (selected) => {
        if (selected.index === 0) {
          plus.nativeUI.showWaiting("下载更新文件...");
          resolve(data);
        }
      }, {
          title: data.description,
          buttons: ["确认更新", "取消"],
          verticalAlign: "bottom"
        });
    });
  },
  success() {
    console.log('安装成功')
    plus.runtime.restart(); // 重启app 
    plus.nativeUI.closeWaiting();
  },
  error(e) {
    // 错误显示
    plus.nativeUI.closeWaiting();
    console.log("安装wgt文件失败[" + e.code + "]：" + e.message);
    plus.nativeUI.alert("安装wgt文件失败[" + e.code + "]：" + e.message);
  },
  onProgress(p) {
    console.log(p) // 下载进度
  }
});
```

## 赞助

您的赞助会使`MogoH5+`发展的更好,所赞助的资金都将提升`FEmirror 云更新`服务.

| 微信                                                       | 支付宝                                                        |
| ---------------------------------------------------------- | ------------------------------------------------------------- |
| <img width="200" :src="$withBase('/wxpay.JPG')" alt="foo"> | <img  width="200"  :src="$withBase('/alipay.JPG')" alt="foo"> |
