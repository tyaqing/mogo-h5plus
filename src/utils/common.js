/**
 * 该js为所有页面都必须加载的js
 * 可以用于全局添加某功能
 */
import FastClick from "fastclick";
// 去除300ms延迟
document.addEventListener(
  "DOMContentLoaded",
  function() {
    FastClick.attach(document.body);
  },
  false
);

// 页面调试工具
