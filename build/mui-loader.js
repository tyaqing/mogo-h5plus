const fs = require('fs')

// 获取mui的script 
module.exports =   fs.readFileSync("./src/assets/mui/mui.min.js").toString();
