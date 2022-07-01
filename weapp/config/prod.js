module.exports = {
  env: {
    NODE_ENV: '"production"'
  },
  defineConstants: {
  },
  // 生产环境的打包，但是生产环境会报错
  mini: {
    addChunkPages (pages)  {
      pages.set('packageTask/pages/taskSchedule/index',['packageTask/common'])
      pages.set('packageTask/pages/myTaskSchedule/index',['packageTask/common'])
      pages.set('packageTask/pages/myLocalData/index',['packageTask/common'])
      pages.set('packageTask/pages/addLocalData/index',['packageTask/common'])
      pages.set('packageTask/pages/train/index',['packageTask/common'])
      pages.set('packageTask/pages/dataPack/index',['packageTask/common'])
      pages.set('packageTask/pages/writeFLQuestionnaire/index',['packageTask/common'])
      pages.set('packageTask/pages/categoryModalShowResult/index',['packageTask/common'])
    } ,

    webpackChain (chain, webpack) {
      // 打包大小检查 http://localhost:8888/
      chain.plugin('analyzer')
        .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin, [])

      // 对依赖进行细分
      chain.merge({
        optimization: {
          splitChunks: {
            cacheGroups: {
              packageTaskCommon: {
                name: 'packageTask/common',
                minChunks: 2,
                test: (module, chunks) => {
                  const isNoOnlySubpackRequired = chunks.find(chunk => !(/\bpackageTask\b/.test(chunk.name)))
                  return !isNoOnlySubpackRequired
                },
                priority: 200
              },
            }
          }
        }
      });
    },
  },
  h5: {
    /**
     * 如果h5端编译后体积过大，可以使用webpack-bundle-analyzer插件对打包体积进行分析。
     * 参考代码如下：
     * webpackChain (chain) {
     *   chain.plugin('analyzer')
     *     .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin, [])
     * }
     */
  }
}
