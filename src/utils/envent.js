/**
 * 发送自定义事件
 * @param {*} webview
 * @param {*} eventType
 * @param {*} data
 */
export const fire = function(webview, eventType, data) {
  console.log(JSON.stringify(data));
  webview &&
    webview.evalJS(`
  document.dispatchEvent(new CustomEvent("${eventType}", {
    detail:${JSON.stringify(data)},
    bubbles: true,
    cancelable: true
  }));
  `);
};
