import sidebar from "./sidebar";
const baseMap = {
  production: "/blog-vitepress/",
  github: "/blog-vitepress/",
  vercel: "/",
};

console.log("base:", baseMap[process.env.BUILD_ENV || process.env.NODE_ENV]);

console.log("process.env.NODE_ENV: ", process.env.NODE_ENV);
console.log("process.env.BUILD_ENV: ", process.env.BUILD_ENV);

// https://vitepress.vuejs.org/config/app-configs

module.exports = {
  appearance: true, // Whether to enable dark mode or not. Default: true
  base: baseMap[process.env.BUILD_ENV || process.env.NODE_ENV] || "/", // 会影响部署的读取路径
  head: [
    [
      "link",
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossorigin: "" },
    ],
    // would render: <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  ],
  lang: "zh-cn", // build时才会放到html标签里
  title: "VitePress",
  description: "Just playing around.", // 站点的描述。 这将作为<meta>标记渲染在页面HTML中。
  lastUpdated: true,
  //The directory where your markdown pages are stored, relative to project root.
  markdown: {
    lineNumbers: false,
    // options for markdown-it-anchor
    anchor: { permalink: false },
    // options for markdown-it-toc
    toc: { includeLevel: [1, 2] },
    config: (md) => {
      // use more markdown-it plugins!
      // md.use(require('markdown-it-xxx'));
    },
  },

  themeConfig: {
    // 搜索
    algolia: {
      apiKey: "your_api_key",
      indexName: "index_name",
    },
    logo: "/logo.svg",
    socialLinks: [{ icon: "github", link: "https://github.com/xxxsjan" }],
    footer: {
      message: "Released under the MIT License.",
      copyright: "Copyright © 2022-07-27～present aehyok",
    },
    lastUpdated: true, // 最后更新时间
    // editLinkText: '编辑此页',
    // selectText: '选择语言',
    // sidebarDepth: 2,
    sidebar,
    nav: [
      // / 结尾找 index.md 名字结尾找 名字.md
      { text: "首页", link: "/" },
      { text: "笔记", link: "/webnote/" },
      { text: "Guide", link: "/guide/" },
    ],
  },
};
