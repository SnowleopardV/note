// 首屏加载
// 1. 减少网络请求, 合并css、javascript、图片等(svg空间占用比png小), 合并后端接口
// 2. 缓存策略
// 3. 异步加载资源
//      路由的懒加载
//      使用async、defer属性加载外部脚本
//      对于图片、视频等资源，使用懒加载技术，在滚动到可视区域时再加载,
//         如使用import() 动态导入
//         如使用第三方库lozad.js https://github.com/ApoorvSaxena/lozad.js/blob/master/README.md
// 4. 骨架屏
// 5. 服务器上起用GZip压缩

console.log(13)
setTimeout(() => {
  const module = import('./practice/import/index.js')
  console.log(16, module)
  module.then((result) => {
    const fn = result.default
    console.log(17, fn)
    console.log(fn(200, 300))
  })

  const module2 = import('./practice/import/handsome.jpg')
  module2.then((result) => {
    console.log(26, result)
  })
}, 3000)
console.log(15)
