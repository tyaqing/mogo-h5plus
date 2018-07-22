//http://www.html5plus.org/doc/zh_cn/nativeui.html#plus.nativeUI.confirm
export function confirm(message, title = "确认") {
  return new Promise(resolve => {
    plus.nativeUI.confirm(
      message,
      e => {
        console.log(e);
        if (e.index === 0) {
          resolve();
        }
      },
      title
    );
  });
}
