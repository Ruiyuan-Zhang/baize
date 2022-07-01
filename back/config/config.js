// 写配置的时候有提示
import { defineConfig } from 'umi';
import routes from './routes.config';

const Config = defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: routes,
  fastRefresh: {},
  proxy: {
    '/v1': {
      target: 'http://localhost:20201/',
      // target: 'http://localhost/v1/',
      // target: 'https://gflmini.zju-zry.club/v1/',
      changeOrigin: true,
      pathRewrite: { '^/v1': '' },
    },
    '/file':{
      target: 'http://localhost:3000/',
      // target: 'http://localhost/file/',
      // target: 'https://gflmini.zju-zry.club/file/',
      changeOrigin:true,
      pathRewrite: { '^/file': '' },
    }
  },
  // 配置layout，以后可以尝试一下。
  // layout:{
  //   name:'ping',
  //   locale: false,
  //   logo:'./logo.png'
  // },
  title:'白泽问卷',
  favicon: './logo.gif'

});

export default Config;
