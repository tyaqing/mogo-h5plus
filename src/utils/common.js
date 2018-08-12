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

// 自动关闭窗口 可根据具体逻辑自定义
function plusReady() {
  plus.key.addEventListener(
    "backbutton",
    function () {
      var ws = plus.webview.currentWebview();
      if (ws.webviewPreload == true) {
        plus.webview.hide(ws, 'auto');
      } else {
        plus.webview.close(ws, 'auto');
      }
    },
    false
  );
}
if (window.plus) {
  plusReady();
} else {
  document.addEventListener("plusready", plusReady, false);
}
// 页面调试工具
  var print = function (json, options) {
      var reg = null,
        formatted = "",
        pad = 0,
        PADDING = "    ";
      options = options || {};
      options.newlineAfterColonIfBeforeBraceOrBracket =
        options.newlineAfterColonIfBeforeBraceOrBracket === true ? true : false;
      options.spaceAfterColon = options.spaceAfterColon === false ? false : true;
      if (typeof json !== "string") {
        json = JSON.stringify(json);
      } else {
        json = JSON.parse(json);
        json = JSON.stringify(json);
      }
      reg = /([\{\}])/g;
      json = json.replace(reg, "\r\n$1\r\n");
      reg = /([\[\]])/g;
      json = json.replace(reg, "\r\n$1\r\n");
      reg = /(\,)/g;
      json = json.replace(reg, "$1\r\n");
      reg = /(\r\n\r\n)/g;
      json = json.replace(reg, "\r\n");
      reg = /\r\n\,/g;
      json = json.replace(reg, ",");
      if (!options.newlineAfterColonIfBeforeBraceOrBracket) {
        reg = /\:\r\n\{/g;
        json = json.replace(reg, ":{");
        reg = /\:\r\n\[/g;
        json = json.replace(reg, ":[");
      }
      if (options.spaceAfterColon) {
        reg = /\:/g;
        json = json.replace(reg, ":");
      }
      json.split("\r\n").forEach(function (node, index) {
        //console.log(node);
        var i = 0,
          indent = 0,
          padding = "";

        if (node.match(/\{$/) || node.match(/\[$/)) {
          indent = 1;
        } else if (node.match(/\}/) || node.match(/\]/)) {
          if (pad !== 0) {
            pad -= 1;
          }
        } else {
          indent = 0;
        }

        for (i = 0; i < pad; i++) {
          padding += PADDING;
        }

        formatted += padding + node + "\r\n";
        pad += indent;
      });
      console.log(formatted);
    };