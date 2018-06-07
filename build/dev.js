const ip = require("ip");

const devServer = {
  host: ip.address(),
  proxy: {
    "/api": {
      name: "DOUBANAPI",
      target: "https://api.douban.com",
      pathRewrite: { "^/api": "" },
      changeOrigin: true,
      secure: false
    }
  }
};

module.exports = devServer;
