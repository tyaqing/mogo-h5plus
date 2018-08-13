"use strict";
const path = require("path");
const webpack = require("webpack");
const utils = require("./utils");
const config = require("../config");
const vueLoaderConfig = require("./vue-loader.conf");
const multiBuilder = require("./multipage");
var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");
var vConsolePlugin = require("vconsole-webpack-plugin");

const { extraEntry, extraHtmlWebpackPlugins } = multiBuilder;

function resolve(dir) {
  return path.join(__dirname, "..", dir);
}

const createLintingRule = () => ({
  test: /\.(js|vue)$/,
  loader: "eslint-loader",
  enforce: "pre",
  include: [resolve("src"), resolve("test")],
  options: {
    formatter: require("eslint-friendly-formatter"),
    emitWarning: !config.dev.showEslintErrorsInOverlay
  }
});

//  替换代理的链接 定义替换内容
let Defines = {};
const devServer = {
  proxy: config.dev.proxyTable
};
for (let p in devServer.proxy) {
  Defines[devServer.proxy[p].name] = JSON.stringify(p);
  // devServer.proxy[p].name;
}
// console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === "production") {
  for (let p in devServer.proxy) {
    Defines[devServer.proxy[p].name] = JSON.stringify(
      devServer.proxy[p].target
    );
    // devServer.proxy[p].name;
  }
}

const webpackConfig = {
  context: path.resolve(__dirname, "../"),
  entry: {
    ...extraEntry,
    vue: ['vue'],


  },
  output: {
    path: config.build.assetsRoot,
    filename: "[name].js"
    // publicPath:
    //   process.env.NODE_ENV === "production"
    //     ? config.build.assetsPublicPath
    //     : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: [".js", ".vue", ".json"],
    alias: {
      vue$: "vue/dist/vue.esm.js",
      "@": resolve("src"),
      mui: resolve("src") + "/assets/mui/"
    }
  },
  module: {
    rules: [
      ...(config.dev.useEslint ? [createLintingRule()] : []),
      {
        test: /\.vue$/,
        loader: "vue-loader",
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: "babel-loader",
        include: [
          resolve("src"),
          resolve("test"),
          resolve("node_modules/webpack-dev-server/client")
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: "url-loader",
        options: {
          limit: 10000,
          name: utils.assetsPath("img/[name].[ext]")
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: "url-loader",
        options: {
          limit: 10000,
          name: utils.assetsPath("media/[name].[ext]")
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: "url-loader",
        options: {
          limit: 10000,
          name: utils.assetsPath("fonts/[name].[ext]")
        }
      }
    ]
  },
  node: {
    // prevent webpack from injecting useless setImmediate polyfill because Vue
    // source contains it (although only uses it if it's native).
    setImmediate: false,
    // prevent webpack from injecting mocks to Node native modules
    // that does not make sense for the client
    dgram: "empty",
    fs: "empty",
    net: "empty",
    tls: "empty",
    child_process: "empty"
  },
  plugins: [...extraHtmlWebpackPlugins, new webpack.DefinePlugin(Defines),
  new vConsolePlugin({
    enable: config.dev.vConsole // 发布代码前记得改回 false
  }),
  new CommonsChunkPlugin({
    name: ["vue"],
    minChunks: 2

  })]
};

const vuxLoader = require("vux-loader");

module.exports = vuxLoader.merge(webpackConfig, {
  plugins: ["vux-ui"]
});
