import { request } from "./request";
import { isIos, isAndroid } from "./tools";
// 暂时自己研究哦 之后的版本会出案例

// 检测更新
document.addEventListener(
  "plusready",
  function() {
    plus.runtime.getProperty(plus.runtime.appid, function(inf) {
      console.log(inf);
    });

    console.log("isIos", isIos());
    console.log("isAndroid", isAndroid());
    console.log(plus.runtime.version);
    // 扩展API加载完毕，现在可以正常调用扩展API

    request({
      url:
        LOCALAPI +
        "/public/app/checkUpdate?appId=d1610a55-82dd-4d31-84e4-2fcfbff0e1be"
    }).then(resp => {
      console.log(resp.data);
      console.log("检测更新");
    });
    // checkUpdate();
    // downWgt();
  },
  false
);

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
