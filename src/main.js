// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import "./utils/common";
import App from "./App";
import hotfix from "./utils/hotfix";
const appId = "com.femirror.mogoh5";
const updateUrl = FemirrorAPI + `/public/app/checkUpdate?bundleId=${appId}`;
hotfix({
  url: updateUrl,
  before(data) {
    return new Promise(resolve => {
      plus.nativeUI.confirm(data.title, (selected) => {
        if (selected.index === 0) {
          plus.nativeUI.showWaiting("下载更新文件...");
          resolve(data)
        }
      }, {
          title: data.description,
          buttons: ["确认更新", "取消"],
          verticalAlign: "bottom"
        });
    });
  },
  success(data) {
    console.log('安装成功')
    plus.runtime.restart(); // 重启app 
    plus.nativeUI.closeWaiting();
  },
  error(e) {
    plus.nativeUI.closeWaiting();
    console.log("安装wgt文件失败[" + e.code + "]：" + e.message);
    plus.nativeUI.alert("安装wgt文件失败[" + e.code + "]：" + e.message);

  },
  onProgress(p) {
    console.log(p)
  }
});

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: "#app",
  components: { App },
  template: "<App/>"
});
