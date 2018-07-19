// 暂时自己研究哦 之后的版本会出案例

// 更新资源
var wgtVer = null;
function plusReady() {
  // ......
  // 获取本地应用资源版本号
  plus.runtime.getProperty(plus.runtime.appid, function(inf) {
    wgtVer = inf.version;
    console.log("当前应用版本：" + wgtVer);
  });
}
if (window.plus) {
  plusReady();
} else {
  document.addEventListener("plusready", plusReady, false);
}
// 检测更新
var checkUrl = "";
function checkUpdate() {
  console.log("检测更新");
  //plus.nativeUI.showWaiting("检测更新...");
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    switch (xhr.readyState) {
      case 4:
        plus.nativeUI.closeWaiting();
        if (xhr.status == 200) {
          console.log("检测更新成功：" + xhr.responseText);
          var newVer = xhr.responseText;
          if (wgtVer && newVer && wgtVer != newVer) {
            //plus.nativeUI.alert(`当前版本${wgtVer},最新版本${newVer}`);
            downWgt(); // 下载升级包
          } else {
            //plus.nativeUI.alert("无新版本可更新！");
          }
        } else {
          console.log("检测更新失败！");
          //plus.nativeUI.alert("检测更新失败！");
        }
        break;
      default:
        break;
    }
  };
  xhr.open("GET", checkUrl);
  xhr.send();
}
document.addEventListener(
  "plusready",
  function() {
    // 扩展API加载完毕，现在可以正常调用扩展API
    // checkUpdate();
    downWgt();
  },
  false
);

// 下载wgt文件
var wgtUrl = "";
function downWgt() {
  plus.nativeUI.showWaiting("下载wgt文件...");
  plus.downloader
    .createDownload(wgtUrl, { filename: "_doc/update/" }, function(d, status) {
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
