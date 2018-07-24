import { request } from "./request";
import { isIos, isAndroid } from "./tools";
import { getProperty } from "./plus/runtime";
import { confirm } from "./plus/nativeUI";
// 暂时自己研究哦 之后的版本会出案例

let newVersion, localVersion, downloadUrl;
getProperty()
  .then(inf => {
    localVersion = inf.version; //当前版本
    console.log(inf);
    // 获取版本信息
    return request({
      url:
        LOCALAPI +
        "/public/app/checkUpdate?appId=9a4f8e06-6e55-4fb5-bcae-d0b7d605dfc6"
    });
  })
  .then(resp => {
    // 查看最新版本信息
    const { data } = resp;

    console.log(data);
    if (isAndroid()) {
    } else if (isIos()) {
    } else {
      throw "版本错误";
    }
    newVersion = data.name;
    // 如果版本相等
    if (!compareVersion(newVersion, localVersion)) return;
    console.log(newVersion, localVersion);
    console.log(compareVersion(newVersion, localVersion));
    // 处理静默更新/提示更新

    downloadUrl = data.android_url;
    if (data.hotupdate_type === "silence") {
      downWgt(downloadUrl);
      return false;
    }
    return confirm(data.description, data.title);
  })
  .then(selected => {
    if (selected.index === 0) {
      downWgt(downloadUrl);
    }
  });

// 下载wgt文件
function downWgt(url) {
  plus.nativeUI.showWaiting("下载wgt文件...");
  plus.downloader
    .createDownload(url, { filename: "_doc/update/" }, function(d, status) {
      if (status == 200) {
        console.log("下载wgt成功：" + d.filename);
        installWgt(d.filename); // 安装wgt包
      } else {
        console.log("下载wgt失败！");
        plus.nativeUI.alert("下载wgt失败！");
      }
      plus.nativeUI.closeWaiting();
    })
    .start();
}
// 更新应用资源
function installWgt(path) {
  plus.nativeUI.showWaiting("安装wgt文件...");
  plus.runtime.install(
    path,
    {},
    function() {
      plus.nativeUI.closeWaiting();
      console.log("安装wgt文件成功！");
      plus.nativeUI.alert("首页数据刷新！", function() {
        plus.runtime.restart();
      });
    },
    function(e) {
      plus.nativeUI.closeWaiting();
      console.log("安装wgt文件失败[" + e.code + "]：" + e.message);
      plus.nativeUI.alert("安装wgt文件失败[" + e.code + "]：" + e.message);
    }
  );
}

// 判断版本大小 1>=2 大于等于
function compareVersion(curV, reqV) {
  if (curV && reqV) {
    //将两个版本号拆成数字
    var arr1 = curV.split("."),
      arr2 = reqV.split(".");
    var minLength = Math.min(arr1.length, arr2.length),
      position = 0,
      diff = 0;
    //依次比较版本号每一位大小，当对比得出结果后跳出循环（后文有简单介绍）
    while (
      position < minLength &&
      (diff = parseInt(arr1[position]) - parseInt(arr2[position])) == 0
    ) {
      position++;
    }
    diff = diff != 0 ? diff : arr1.length - arr2.length;
    //若curV大于reqV，则返回true
    return diff > 0;
  } else {
    //输入为空
    console.log("版本号不能为空");
    return false;
  }
}
