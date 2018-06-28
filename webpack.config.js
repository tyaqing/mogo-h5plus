const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");

// 多页面配置
const multiBuilder = require("./build/multipage");
// 调试服务器/代理配置
const devServer = require("./build/dev");

const { extraEntry, extraHtmlWebpackPlugins } = multiBuilder;

// 定义替换内容
let Defines = {};

for (let p in devServer.proxy) {
  Defines[devServer.proxy[p].name] = JSON.stringify(p);
  // devServer.proxy[p].name;
}

let mode = "development";
if (process.env.NODE_ENV === "production") {
  mode = "production";
  for (let p in devServer.proxy) {
    Defines[devServer.proxy[p].name] = JSON.stringify(
      devServer.proxy[p].target
    );
    // devServer.proxy[p].name;
  }
}

console.log(Defines);
module.exports = {
  mode: mode,
  entry: {
    index: "./src/index.js",
    ...extraEntry
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js"
  },
  // devtool: "source-map",
  resolve: {
    alias: {
      Utils: path.resolve(__dirname, "src", "utils")
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      },
      {
        test: /\.vue$/,
        exclude: /node_modules/,
        use: "vue-loader"
      },
      { test: /\.css$/, use: ["style-loader", "css-loader"] },
      { test: /\.less$/, use: ["style-loader", "css-loader", "less-loader"] },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: "url-loader",
        options: {
          limit: 10000,
          name: "assets/images/[name].[hash:7].[ext]"
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "index.html",
      chunks: ["index"],
      muiSourcePath: "./"
    }),
    ...extraHtmlWebpackPlugins,
    new VueLoaderPlugin(),
    new CleanWebpackPlugin("dist"),
    new webpack.DefinePlugin(Defines)
  ],
  devServer: devServer
};
