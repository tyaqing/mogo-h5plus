// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import "./utils/common";
import App from "./App";
import { checkUpdate } from "./utils/update";
const appId = "com.femirror.mogoh5";
const updateUrl = FemirrorAPI + `/public/app/checkUpdate?bundleId=${appId}`;
checkUpdate(updateUrl);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: "#app",
  components: { App },
  template: "<App/>"
});
