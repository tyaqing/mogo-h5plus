export function isAndroid() {
  const ua = navigator.userAgent;
  return ua.match(/(Android);?[\s\/]+([\d.]+)?/);
}

export function isIos() {
  const ua = navigator.userAgent;
  return ua.match(/(iPhone\sOS)\s([\d_]+)/);
}

// var iphone = ua.match(/(iPhone\sOS)\s([\d_]+)/);
// var ipad = ua.match(/(iPad).*OS\s([\d_]+)/);
//	var wechat = ua.match(/(MicroMessenger)\/([\d\.]+)/i);
