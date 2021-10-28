export default {
  pages: [
    'pages/welcome/index',
    'pages/index/index',
    'pages/modelList/index',
    'pages/selectSubmitFunction/index',
    'pages/FLcategory/index',
    'pages/FLTemplate/index',
    'pages/FLedit/index',
    'pages/Results/index',
    'pages/mine/index',
    'pages/modelDesc/index',
    'pages/questionnaireList/index',
    'pages/myBaize/index',
    'pages/divFLquestionnaire/index',
    'pages/task/index'
  ],
  tabBar: {
    custom:true,
    list: [{
      pagePath: "pages/index/index",
      text: "首页"
    },{
      pagePath: 'pages/task/index',
      text: '任务'
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
