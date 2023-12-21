/*
1. 使用Tree Shaking
    在webpack中配置mode: 'production' 将自动开启Tree Shaking
2. 代码分割
    使用import动态导入模块, 实现按需加载
    在webpack中配置SplitChunksPlugin 来提取公共代码和vendor代码(项目中用的第三方库和框架代码)
3. 代码压缩
    使用TerserPlugin(用于压缩和优化JavaScript代码。它使用Terser（一个强大的JavaScript压缩器，是UglifyJS 的替代品）)
    使用OptimizeCSSAssetsPlugin对CSS进行压缩
4. 资源压缩
    使用image-webpack-loader或url-loader对图片进行压缩和转码
5. 分析和优化bundle
    使用webpack-bundle-analyzer插件生成bundle分析报告, 可以识别和优化大型或者不必要的模块
*/
