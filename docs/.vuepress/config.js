module.exports = {
  title: "MogoH5+",
  description: "快速开发WebApp的多页面脚手架工具,致力于打造H5+应用生态.",
  base: "/mogo-h5plus/",
  themeConfig: {
    nav: [
      { text: "主页", link: "/" },
      { text: "MogoH5+", link: "/guide/guide.md" },
      { text: "Hotfix", link: "/hotfix/introduction.md" },
      { text: "H5+文档", link: "http://www.html5plus.org/doc/h5p.html" }
    ],
    repo: "tyaqing/mogo-h5plus",
    search: true,
    sidebar: {
      "/guide/": [
        {
          title: "指南|Guide",
          collapsable: false,
          children: [
            "introduction",
            "development",
            "production",
            "update_log",
            "qa"
          ]
        },
        {
          title: "最佳实践|Practice",
          collapsable: false,
          children: ["practice/webview", "practice/details"]
        },
        {
          title: "关于|About",
          collapsable: false,
          children: ["about"]
        }
      ],
      "/hotfix/": [{
        title: "新版本|V1",
        collapsable: false,
        children: [
          "introduction", "config", "hotfitxFemirror"
        ]
      }, {
        title: "旧版本|Old",
        collapsable: true,
        children: [
          "old/introduction", "old/usage", "old/hotfix", "old/hotfitxFemirror"
        ]
      }]
    }
  }
};
