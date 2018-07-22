export function getProperty() {
  return new Promise(resolve => {
    plus.runtime.getProperty(plus.runtime.appid, function(inf) {
      resolve(inf);
    });
  });
}
