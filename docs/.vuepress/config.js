module.exports = {
  title: "MogoH5+",
  description: "快速开发WebApp的多页面脚手架工具",
  base: "/mogo-h5plus/",
  themeConfig: {
    nav: [
      { text: "主页", link: "/" },
      { text: "MogoH5+", link: "/guide.md" },
      { text: "H5+文档", link: "http://www.html5plus.org/doc/h5p.html" }
    ],
    repo: "tyaqing/mogo-h5plus",
    search: true,
    sidebar: [
      {
        title: "指南|Guide",
        collapsable: false,
        children: [
          "guide/introduction",
          "guide/development",
          "guide/production",
          "guide/update_log",
          "guide/qa"
        ]
      },
      {
        title: "最佳实践|Practice",
        collapsable: false,
        children: ["practice/webview", "practice/details", "practice/hotfix"]
      },
      {
        title: "关于|About",
        collapsable: false,
        children: ["about"]
      }
    ]
  }
};
