import { Component } from 'react'
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

class App extends Component {

  componentDidMount () {}

  componentDidShow () {}

  componentDidHide () {}

  componentDidCatchError () {}

  // this.props.children 是将要会渲染的页面
  render () {
    return this.props.children
  }
}

export default App
