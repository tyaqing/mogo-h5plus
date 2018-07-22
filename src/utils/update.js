import { request } from "./request";
import { isIos, isAndroid } from "./tools";
import { getProperty } from "./plus/runtime";
import { confirm } from "./plus/nativeUI";
// 暂时自己研究哦 之后的版本会出案例

let newVersion, localVersion, downloadUrl;
getProperty()
  .then(inf => {
    localVersion = inf.version; //当前版本
    // 获取版本信息
    return request({
      url:
        LOCALAPI +
        "/public/app/checkUpdate?appId=3428b97b-4f27-4779-98e6-8ee26ebbd95f"
    });
  })
  .then(resp => {
    // 查看最新版本信息
    const { data } = resp;

    if (isAndroid()) {
      newVersion = data.Android.version;
      downloadUrl = data.Android.url;
    } else if (isIos()) {
      newVersion = data.iOS.version;
      downloadUrl = data.iOS.version;
    } else {
      throw "版本错误";
    }

    if (newVersion === localVersion) return;
    console.log(newVersion > localVersion);

    // 询问是否升级
    return confirm(data.Android.note, data.Android.title);
  })
  .then(() => {
    downWgt(downloadUrl);
  });

function checkVersion(localVersion) {
  if (isAndroid()) {
  }
}

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
