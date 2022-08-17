import sidebar from './sidebar';
import pkg from '../../package.json';
console.log(pkg.name);
module.exports = {
  base: '/web-note-vitepress/',
  lang: 'zh-cn', // build时才会放到html标签里
  title: 'VitePress',
  description: 'Just playing around.', // 站点的描述。 这将作为<meta>标记渲染在页面HTML中。

  markdown: {
    lineNumbers: true,
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
      apiKey: 'your_api_key',
      indexName: 'index_name',
    },
    logo: '/logo.svg',
    socialLinks: [{ icon: 'github', link: 'https://github.com/xxxsjan' }],
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2022-07-27～present aehyok',
    },
    lastUpdated: true, // 最后更新时间
    // editLinkText: '编辑此页',
    // selectText: '选择语言',
    // sidebarDepth: 2,
    sidebar: {
      ...sidebar,
    },
    nav: [
      { text: '首页', link: '/' },
      { text: '笔记', link: '/webnote/' },
    ],
  },
};
