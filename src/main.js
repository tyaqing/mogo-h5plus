// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
// import hotfix from 'h5plus-hotfix';
import "./utils/common";
import App from "./App";
const appId = "com.femirror.mogoh5";
// const updateUrl = FemirrorAPI + `/public/app/checkUpdate?bundleId=${appId}`;
// hotfix({
//   url: updateUrl,
//   before(data) {
//     // 确认安装
//     return new Promise(resolve => {
//       plus.nativeUI.confirm(data.description, (selected) => {
//         if (selected.index === 0) {
//           plus.nativeUI.showWaiting("下载更新文件...");
//           resolve(data);
//         }
//       }, {
//           title: data.title,
//           buttons: ["确认更新", "取消"],
//           verticalAlign: "bottom"
//         });
//     });
//   },
//   success() {
//     console.log('安装成功')
//     plus.runtime.restart(); // 重启app 
//     plus.nativeUI.closeWaiting();
//   },
//   error(e) {
//     // 错误显示
//     plus.nativeUI.closeWaiting();
//     console.log("安装wgt文件失败[" + e.code + "]：" + e.message);
//     plus.nativeUI.alert("安装wgt文件失败[" + e.code + "]：" + e.message);
//   },
//   onProgress(p) {
//     console.log(p) // 下载进度
//   }
// });

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: "#app",
  components: { App },
  template: "<App/>"
});
