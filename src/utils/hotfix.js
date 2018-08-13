export default function ({ url, success, error, before, onProgress }) {
  // 对环境的要求
  let resData;
  getProperty().then((inf) => {
    console.log(inf)
    console.log(plus.runtime.version)
    return ajax(url, {
      version: inf.version, // 版本 用于统计
      os: plus.os, //系统信息 用于统计
      device: plus.device //设备信息  用于统计
    })
  })
    .then(data => {
      // 获取到更新信息
      resData = data;
      return before(resData);
    }).then(() => {
      return downWgt(resData.android_url, onProgress);
    }).then((localPath) => {
      return installWgt(localPath);
    }).then(() => {
      success();
    }).catch(error)
}
// 下载wgt文件
function downWgt(url, onProgress) {
  return new Promise((resolve, reject) => {
    const dtask = plus.downloader
      .createDownload(url, { filename: "_doc/update/" }, function (d, status) {
        if (status == 200) {
          console.log("下载文件成功：" + d.filename);
          resolve(d.filename)
        } else {
          console.log("下载文件失败！");
          reject('下载文件失败！');
        }
      })
    dtask.addEventListener("statechanged", function (task, status) {
      onProgress(Number.parseInt(task.downloadedSize / task.totalSize * 100));
    });
    dtask.start();
  })
}
// 安装应用资源
function installWgt(path) {
  console.log(path)
  return new Promise((resove, reject) => {
    {
      plus.runtime.install(path, { force: true }, function () {
        resove()
      }, (err) => reject(err, 'installWgt'));
    }
  })
}
// 请求
function ajax(url, data) {
  return new Promise((resolve, reject) => {
    var xhr = new XMLHttpRequest();
    xhr.open("post", url, true);
    // 设置请求头 告诉服务器发给他的数据是json格式
    xhr.setRequestHeader("content-type", "application/json");
    xhr.send(JSON.stringify(data));
    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4) {
        if (xhr.status >= 200 && xhr.status < 300) {
          resolve(JSON.parse(xhr.responseText));
        } else {
          console.log(xhr)
          // reject(xhr);
          // 避免网络错误
        }
      }
    };
  });
}
// 获取设备版本信息
function getProperty() {
  return new Promise(resolve => {
    plus.runtime.getProperty(plus.runtime.appid, function (inf) {
      resolve(inf);
    });
  });
}
