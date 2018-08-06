"use strict";

(function() {
  var newVersion = void 0,
    localVersion = void 0,
    downloadUrl = void 0,
    updateSilence = false;
  // 检查更新
  function checkUpdate(updateUrl) {
    // 获取当前应用版本信息
    getProperty()
      .then(function(inf) {
        console.log(JSON.stringify(inf));
        localVersion = inf.version; //当前版本      // 获取版本信息
        return ajax(updateUrl, {
          version: plus.runtime.version, // 版本 用于统计
          os: plus.os, //系统信息 用于统计
          device: plus.device //设备信息  用于统计
        });
      })
      .then(function(data) {
        // 查看最新版本信息
        newVersion = data.name;
        // 如果版本相等
        if (!compareVersion(newVersion, localVersion)) return false;
        // 处理静默更新/提示更新
        downloadUrl = data.android_url;

        // 处理不同平台 如果只热更新安卓

        if (data.platform !== "both") {
          if (isAndroid()) {
            if (data.platform !== "android") return false;
          }
          // 如果只热更新苹果
          if (isIos()) {
            if (data.platform !== "ios") return false;
          }
        }
        // 如果是apk安装,是没法静默更新的
        if (data.type !== "apk" && data.hotupdate_type === "silence") {
          updateSilence = true;
          downWgt(downloadUrl);
          return false;
        }
        // 如果是苹果系统,且更新为安装则不做处理
        if (isIos() && data.type === "apk") {
          return false;
        }
        return confirm(data.description, data.title);
      })
      .then(function(selected) {
        if (selected.index === 0) {
          // 如果是苹果系统 然后是安装包
          downWgt(downloadUrl);
        }
      })
      .catch(function(error) {
        console.log(error);
        console.log(JSON.stringify(error));
        //即使错误也不做任何处理
      });
  }
  // 下载wgt文件
  function downWgt(url) {
    !updateSilence && plus.nativeUI.showWaiting("下载更新文件...");
    plus.downloader
      .createDownload(url, { filename: "_doc/update/" }, function(d, status) {
        if (status == 200) {
          console.log(2);
          console.log("下载wgt成功：" + d.filename);
          installWgt(d.filename); // 安装wgt包
        } else {
          console.log(3);
          console.log("下载wgt失败！");
          !updateSilence && plus.nativeUI.alert("下载更新文件失败！");
        }
        !updateSilence && plus.nativeUI.closeWaiting();
      })
      .start();
  }
  // 更新应用资源
  function installWgt(path) {
    !updateSilence && plus.nativeUI.showWaiting("安装更新文件...");
    plus.runtime.install(
      path,
      {},
      function() {
        !updateSilence && plus.nativeUI.closeWaiting();
        console.log("更新成功！");
        !updateSilence && plus.nativeUI.toast("更新完成");
        !updateSilence && plus.runtime.restart();
      },
      function(e) {
        !updateSilence && plus.nativeUI.closeWaiting();
        console.log("安装wgt文件失败[" + e.code + "]：" + e.message);
        !updateSilence &&
          plus.nativeUI.alert("更新失败[" + e.code + "]：" + e.message);
      }
    );
  }

  // 判断版本大小 a>=b : true 大于等于
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

  function isAndroid() {
    var ua = navigator.userAgent;
    return ua.match(/(Android);?[\s\/]+([\d.]+)?/);
  }

  function isIos() {
    var ua = navigator.userAgent;
    return ua.match(/(iPhone\sOS)\s([\d_]+)/);
  }

  function getProperty() {
    return new Promise(function(resolve) {
      plus.runtime.getProperty(plus.runtime.appid, function(inf) {
        resolve(inf);
      });
    });
  }

  function confirm(message) {
    var title =
      arguments.length > 1 && arguments[1] !== undefined
        ? arguments[1]
        : "确认";

    return new Promise(function(resolve) {
      // plus.nativeUI.confirm(message, resolve, title, ["确认更新", "取消"]);
      plus.nativeUI.confirm(message, resolve, {
        title: title,
        buttons: ["确认更新", "取消"],
        verticalAlign: "bottom"
      });
    });
  }

  function ajax(url, data) {
    return new Promise(function(resolve, reject) {
      var xhr = new XMLHttpRequest();
      xhr.open("post", url, true);
      // 设置请求头 告诉服务器发给他的数据是json格式
      xhr.setRequestHeader("content-type", "application/json");
      xhr.send(JSON.stringify(data));
      xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
          if (xhr.status >= 200 && xhr.status < 300) {
            resolve(JSON.parse(xhr.responseText));
          } else {
            reject(xhr);
          }
        }
      };
    });
  }

  window.checkUpdate = checkUpdate;
})();
