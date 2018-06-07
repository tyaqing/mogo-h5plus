/**
 * 打开一个webview窗口
 */
export function openWebview(config, style = {}) {
  var wv = plus.webview.create(config.url, config.id, {
    top: 0, //新页面顶部位置
    bottom: 0, //新页面底部位置
    render: "always",
    popGesture: "hide",
    bounce: "vertical",
    bounceBackground: "#efeff4",
    titleNView: {
      //详情页原生导航配置
      backgroundColor: "#f7f7f7", //导航栏背景色
      titleText: "", //导航栏标题
      titleColor: "#000000", //文字颜色
      type: "transparent", //透明渐变样式
      autoBackButton: true, //自动绘制返回箭头
      titleText: config.title,
      splitLine: {
        //底部分割线
        color: "#cccccc"
      }
    },
    ...style
  });
  var w = plus.nativeUI.showWaiting();
  wv.addEventListener(
    "loaded",
    function() {
      wv.show("slide-in-right"); // 显示窗口
      w.close();
      w = null;
    },
    false
  );
}
