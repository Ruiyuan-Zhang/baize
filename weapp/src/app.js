import { Component } from 'react'
import Taro from '@tarojs/taro'
import { initData, } from '@/common/data'
import './app.less'

// 引入全局的taro-ui样式
// import 'taro-ui/dist/style/index.scss'
// 我是大贪官，一点一点存储省着点用
import "taro-ui/dist/style/components/icon.scss"
import "taro-ui/dist/style/components/button.scss";
import "taro-ui/dist/style/components/loading.scss";
import "taro-ui/dist/style/components/avatar.scss";
import "taro-ui/dist/style/components/tag.scss";
import "taro-ui/dist/style/components/timeline.scss";
import "taro-ui/dist/style/components/divider.scss";
import "taro-ui/dist/style/components/steps.scss";
import "taro-ui/dist/style/components/progress.scss";
import "taro-ui/dist/style/components/toast.scss";
import "taro-ui/dist/style/components/message.scss";
import "taro-ui/dist/style/components/form.scss";
import "taro-ui/dist/style/components/input.scss";
import "taro-ui/dist/style/components/input-number.scss";
import "taro-ui/dist/style/components/radio.scss";
import "taro-ui/dist/style/components/switch.scss";
import "taro-ui/dist/style/components/textarea.scss";
import "taro-ui/dist/style/components/search-bar.scss";
import "taro-ui/dist/style/components/image-picker.scss";
import "taro-ui/dist/style/components/tabs.scss";
import "taro-ui/dist/style/components/modal.scss";
import "taro-ui/dist/style/components/grid.scss";

class App extends Component {


  componentDidMount () {
    // 一、 微信小程序插件
    var fetchWechat = require('fetch-wechat');
    var tf = require('@tensorflow/tfjs-core');
    var webgl = require('@tensorflow/tfjs-backend-webgl');
    var plugin = requirePlugin('tfjsPlugin');
    plugin.configPlugin({
      // polyfill fetch function
      fetchFunc: fetchWechat.fetchFunc(),
      // inject tfjs runtime
      tf,
      // inject webgl backend
      webgl,
      // provide webgl canvas
      canvas: wx.createOffscreenCanvas()
    });

    // 二、 初始化文件管理器
    initData()

    // 三、配置跳转震动
    const jumpClicks = ['navigateTo','switchTab','redirectTo','reLaunch','navigateBack']
    jumpClicks.forEach(j=>{
      const oj = Taro[j]  //记录原来的跳转函数
      Taro[j] = x =>{
        Taro.vibrateShort()  // 先震动一下
        oj(x)                // 再执行之前的函数
      }
    })
  }

  componentDidShow () {}

  componentDidHide () {}

  componentDidCatchError () {}

  // this.props.children 是将要会渲染的页面
  render () {
    return this.props.children
  }
}

export default App
