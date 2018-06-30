const fs = require("fs");
const HtmlWebpackPlugin = require("html-webpack-plugin");


// 通过页面配置文件过去页面json
function generateByConfig() {
  return JSON.parse(fs.readFileSync("./src/page.json"));
}

// 生成extraEntry 
const extraEntry = generateByConfig();

// 生成HtmlWebpackPlugin
let extraHtmlWebpackPlugins = [];
for (let i in extraEntry) {
  extraHtmlWebpackPlugins.push(
    new HtmlWebpackPlugin({
      filename: i + ".html",
      template: "index.html",
      chunks: [i],
      muiSourcePath: "../"
    })
  );
}

exports.extraEntry = extraEntry;
exports.extraHtmlWebpackPlugins = extraHtmlWebpackPlugins;
