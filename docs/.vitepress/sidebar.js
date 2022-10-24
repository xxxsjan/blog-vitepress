const fg = require('fast-glob');
const path = require('path');

const docsPath = process.cwd(); // 用自己的docs
// const docsPath = path.resolve(process.cwd(), '../web-note'); // 用vuepress的docs

// console.log(
//   fg.sync('**', {
//     onlyFiles: false,
//     cwd: docsPath,
//     deep: 1,
//   })
// );

function getPath(cwd) {
  return path.resolve(docsPath, cwd);
}
function getDirs(cwd) {
  return fg.sync('**', {
    onlyFiles: false,
    cwd: getPath(cwd),
    deep: 1,
    ignore: ['*.md'],
  });
}
function getMdFiles(cwd) {
  return fg.sync('**', {
    onlyFiles: true,
    cwd: getPath(cwd),
    deep: 1,
    ignore: ['index.md'],
  });
}
/**
 *
 * @param {String} dirPath docs文件所在目录下的某个文件夹名
 * @returns
 */
function genSideBar(dirPath) {
  // dirPath 文件夹下的所有文件夹
  const dirs = getDirs(`${dirPath}`);
  const mdFiles = getMdFiles(`${dirPath}`);
  let res = [
    // 有文件夹
    ...dirs.map((dir) => {
      let obj = {
        text: dir,
        items: genSideBar(`${dirPath}/${dir}`),
      };
      if (obj.items.length === 0) {
        delete obj.items;
        obj.link = `/${dirPath}/${dir}/`;
      }
      return obj;
    }),
    // 有md文件
    ...mdFiles.map((file) => {
      const text = file.replace('.md', '');
      return {
        text: text,
        link: `/${dirPath}/${text}`,
      };
    }),
  ];
  return res;
}
const webnote = genSideBar('docs/webnote');
console.log(JSON.stringify(webnote));

export default {
  '/webnote/': webnote,
};
