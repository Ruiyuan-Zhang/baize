import { View, Input, Image } from '@tarojs/components'
import { AtButton,AtDivider } from 'taro-ui'
import Taro, { clearStorage, useDidShow } from '@tarojs/taro'
import { useEffect, useState } from 'react'
import Tail from '@/components/Tail'
import Tabbar from '@/components/Tabbar'
import request from '@/utils/request'
import Header from './components/header'
import Questionnaire from './components/questionnaire'
import HotModalList from './components/hotModalList'
import FunQuestionList from './components/funQuestionList'
import styles from './index.module.less'



const Index = () =>{
  
  

  return (
  <View className={styles.index}>
    {/* 头部 */}
    <Header />
   
    {/* 发布问卷和填写问卷 */}
    <Questionnaire />

    {/* 热门模型列表 */}
    <HotModalList />

    {/* 今日份有趣问卷 */}
    <FunQuestionList />

    {/* 尾部提示 */}
    <Tail />

    {/* tabbar */}
    <Tabbar index={0} />
  </View>
  )
}

export default Index