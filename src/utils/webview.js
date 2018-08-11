/**
 * 打开一个webview窗口
 */
export function openWebview(config, style = {}, extras = {}) {
  var wv = plus.webview.create(
    config.url,
    config.id,
    {
      top: 0, // 新页面顶部位置
      bottom: 0, // 新页面底部位置
      render: "always",
      popGesture: "hide",
      bounce: "vertical",
      bounceBackground: "#efeff4",
      titleNView: {
        // 详情页原生导航配置
        backgroundColor: "#f7f7f7", // 导航栏背景色
        titleText: config.title, // 导航栏标题
        titleColor: "#000000", // 文字颜色
        type: "transparent", // 透明渐变样式
        autoBackButton: true, // 自动绘制返回箭头
        splitLine: {
          // 底部分割线
          color: "#cccccc"
        }
      },
      ...style
    },
    extras
  );
  var w = plus.nativeUI.showWaiting();
  // 监听窗口加载成功
  wv.addEventListener(
    "loaded",
    function () {
      wv.show("slide-in-right"); // 显示窗口
      w.close();
      w = null;
    },
    false
  );
}

// webview.open  打开得很快 但是不能传参
export function openWebviewFast(url, id, title) {
  plus.nativeUI.showWaiting("加载中");
  plus.webview.open(
    url,
    id,
    {
      titleNView: {
        backgroundColor: "#f7f7f7", // 导航栏背景色
        titleText: title, // 导航栏标题
        titleColor: "#666", // 文字颜色
        // type: "transparent", // 透明渐变样式
        autoBackButton: true, // 自动绘制返回箭头
        splitLine: {
          // 底部分割线
          color: "#cccccc"
        }
      },
    },
    "slide-in-right",
    420,
    function () {
      plus.nativeUI.closeWaiting();
    }
  );
}
// 预加载页面 速度很快,但是不要加载超过10个
export function preLoad(webviews = []) {
  webviews.map(webview => {
    const fullExtras = {
      webviewPreload: 1,
      ...webview.extras
    };
    plus.webview.create(
      webview.url,
      webview.id,
      {
        top: 0, // 新页面顶部位置
        bottom: 0, // 新页面底部位置
        render: "always",
        popGesture: "hide",
        bounce: "vertical",
        bounceBackground: "#efeff4",
        titleNView: {
          // 详情页原生导航配置
          backgroundColor: "#f7f7f7", // 导航栏背景色
          titleText: webview.title, // 导航栏标题
          titleColor: "#000000", // 文字颜色
          type: "transparent", // 透明渐变样式
          autoBackButton: true, // 自动绘制返回箭头
          splitLine: {
            // 底部分割线
            color: "#cccccc"
          }
        },
        ...webview.style
      },
      fullExtras
    );
  });
}

export function showWebviewById(id) {
  plus.webview.show(id, "slide-in-right", 200);
}
