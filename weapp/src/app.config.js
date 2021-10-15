export default {
  pages: [
    'pages/index/index',
    'pages/modelList/index',
    'pages/selectSubmitFunction/index',
    'pages/FLcategory/index',
    'pages/FLTemplate/index',
    'pages/FLedit/index',
    'pages/Results/index',
    'pages/mine/index'
  ],
  tabBar: {
    list: [{
      pagePath: "pages/index/index",
      text: "首页"
    },{
      pagePath:'pages/mine/index',
      text:'我的'
    }]
  },
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  }
}
