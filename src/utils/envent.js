/**
 * 发送自定义事件
 * @param {*} webview
 * @param {*} eventType
 * @param {*} data
 */
export const fire = function(webview, eventType, data) {
  if (webview) {
    if (typeof data === "undefined") {
      data = "";
    } else if (typeof data === "boolean" || typeof data === "number") {
      webview.evalJS(
        "typeof mui!=='undefined'&&mui.receive('" +
          eventType +
          "'," +
          data +
          ")"
      );
      return;
    } else if (isPlainObject(data) || Array.isArray(data)) {
      data = JSON.stringify(data || {})
        .replace(/\'/g, "\\u0027")
        .replace(/\\/g, "\\u005c");
    }
    webview.evalJS(
      "typeof mui!=='undefined'&&mui.receive('" +
        eventType +
        "','" +
        data +
        "')"
    );
  }
};

function isPlainObject(obj) {
  //判断是否非window和DOM对象的对象，
  if (
    !obj ||
    obj.toString() !== "[object Object]" ||
    obj.nodeType ||
    obj.setInterval
  ) {
    return false;
  }

  //constructor是对创建对象的函数的引用（指针）。对于 Object 对象，该指针指向原始的 Object() 函数
  //判断obj是否具有isPrototypeOf属性，isPrototypeOf是挂在Object.prototype上的。通过字面量或自定义类（构造器）创建的对象都会继承该属性方法
  if (
    obj.constructor &&
    !obj.hasOwnProperty("constructor") &&
    !obj.constructor.prototype.hasOwnProperty("isPrototypeOf")
  ) {
    return false;
  }

  var key;
  for (key in obj) {
  }

  return key === undefined || obj.hasOwnProperty(key);
}
