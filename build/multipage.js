const fs = require("fs");
const HtmlWebpackPlugin = require("html-webpack-plugin-for-multihtml");

// 通过页面配置文件过去页面json
function generateByConfig() {
  return JSON.parse(fs.readFileSync("./src/page.json"));
}

// 生成extraEntry
const extraEntry = generateByConfig();

let newExtraEntry = {};

// 生成HtmlWebpackPlugin
let extraHtmlWebpackPlugins = [];
for (let i in extraEntry) {
  // 配置是否使用mui plusready
  const useMui = /\S+\|mui/.test(i);
  const usePlusReady = /\S+\|plusReady/.test(i);
  let chunk = useMui ? i.replace("|mui", "") : i;
  if (usePlusReady) chunk = chunk.replace("|plusReady", "");
  newExtraEntry[chunk] = extraEntry[i];
  extraHtmlWebpackPlugins.push(
    new HtmlWebpackPlugin({
      filename: chunk + ".html",
      template: "index.html",
      multihtmlCache: true,
      chunks: [chunk],
      muiScriptString: useMui ? require("./mui-loader") : "",
      plusReady: usePlusReady ? '<script src="html5plus://ready"></script>' : ""
      // 获取mui的script
    })
  );
}

exports.extraEntry = newExtraEntry;
exports.extraHtmlWebpackPlugins = extraHtmlWebpackPlugins;
