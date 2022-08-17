const fg = require('fast-glob');
const path = require('path');
// console.log(
//   fg.sync('**', {
//     onlyFiles: false,
//     cwd: path.resolve(process.cwd(),'../'),
//     deep: 1,
//   })
// );
function getDirs(path) {
  return fg.sync('**', {
    onlyFiles: false,
    cwd: path,
    deep: 1,
    ignore: ['*.md'],
  });
}
function getMdFiles(path) {
  return fg.sync('**', {
    onlyFiles: true,
    cwd: path,
    deep: 1,
    ignore: ['index.md'],
  });
}
function genSideBar(namespace) {
  const dirs = getDirs(`docs/${namespace}`);
  const mdFiles = getMdFiles(`docs/${namespace}`);
  let res = [
    // 有文件夹
    ...dirs.map((dir) => {
      let obj = {
        text: dir,
        items: genSideBar(`${namespace}/${dir}`),
      };
      if (obj.items.length === 0) {
        delete obj.items;
        obj.link = `/${namespace}/${dir}/`;
      }
      return obj;
    }),
    // 有md文件
    ...mdFiles.map((file) => {
      const text = file.replace('.md', '');
      return {
        text: text,
        link: `/${namespace}/${text}`,
      };
    }),
  ];
  return res;
}
const webnote = genSideBar('webnote');
// console.log(JSON.stringify(webnote));

export default {
  '/webnote/': webnote,
};
