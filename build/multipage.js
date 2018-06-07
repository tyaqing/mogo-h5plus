const fs = require("fs");
const HtmlWebpackPlugin = require("html-webpack-plugin");

var reg = /\.\S+$/;
let pagesPath = {};
fs.readdirSync("./src/page")
  .filter(filename => !reg.test(filename))
  .map(filename => {
    const jsReg = /\.js$/;
    const pagePath = fs
      .readdirSync("./src/page/" + filename)
      .filter(filename => jsReg.test(filename));
    pagePath.map(name => {
      pagesPath[filename + "/" + name.replace(".js", "")] =
        "./src/page/" + filename + "/" + name;
    });
  });
// 生成entry
const extraEntry = pagesPath;
// 生成HtmlWebpackPlugin
let extraHtmlWebpackPlugins = [];
for (let i in pagesPath) {
  extraHtmlWebpackPlugins.push(
    new HtmlWebpackPlugin({
      filename: i + ".html",
      template: "index.html",
      chunks: [i]
    })
  );
}

exports.extraEntry = extraEntry;
exports.extraHtmlWebpackPlugins = extraHtmlWebpackPlugins;
