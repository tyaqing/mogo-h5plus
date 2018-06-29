import Vue from "vue";
import App from "./index.vue";
import FastClick from "fastclick";

document.addEventListener(
  "DOMContentLoaded",
  function() {
    FastClick.attach(document.body);
  },
  false
);
var VConsole = require("vconsole/dist/vconsole.min.js");
var vConsole = new VConsole();

new Vue({
  el: "#root",
  render: h => h(App)
});
