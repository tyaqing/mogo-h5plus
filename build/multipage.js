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
  const useMui = /\S+\|mui$/.test(i);
  const chunk = useMui ? i.replace("|mui", "") : i;
  extraHtmlWebpackPlugins.push(
    new HtmlWebpackPlugin({
      filename: chunk + ".html",
      template: "index.html",
      chunks: [chunk],
      muiScriptString: useMui ? require("./mui-loader") : "",
      plusReady: '<script src="html5plus://ready"></script>'
      // 获取mui的script
    })
  );
}

exports.extraEntry = extraEntry;
exports.extraHtmlWebpackPlugins = extraHtmlWebpackPlugins;
