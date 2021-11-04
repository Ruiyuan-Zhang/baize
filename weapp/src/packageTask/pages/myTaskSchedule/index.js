import { View, Image, Button } from '@tarojs/components'
import { AtModal } from 'taro-ui'
import Taro from '@tarojs/taro'
import NavBar from '@/components/NavBar'
import styles from './index.module.less'
import { useState } from 'react'
import { AtSwitch } from 'taro-ui'


const Item = ({head, title}) =>{
    return (
        <View className={styles.item}>
            {head?<Image src='https://zhangruiyuan.oss-cn-hangzhou.aliyuncs.com/picGo/images/20211104215133.png'></Image>
            :<View className={styles.image}></View>}
            <View className={styles.title}>{title}</View>
            <View className={styles.content}>
                <View>训练时间：1354ms</View>
                <View>准确率：60%</View>
                <View>收益：100白泽星</View>
            </View>
            <View className={styles.time}>时间：2021-10-04 09:30</View>
        </View>
    )
}

const Index = () =>{
    const [modal,setModal] = useState(false)

    return(
        <View className={styles.index}>
            <NavBar title='任务进展' />
            <View className={styles.title}>每轮训练情况</View>
            <View className={styles.train}>
                <View className={styles.title}>手写数字识别-浙江大学群体实验</View>
                <View className={styles.info}>每轮聚合参与情况（当前处于第4轮）</View>
                <View className={styles.items}>
                    <Item title='正在进行：第5轮聚合' head></Item>
                    <Item title='第4轮聚合'></Item>
                    <Item title='第3轮聚合'></Item>
                    <Item title='第2轮聚合'></Item>
                    <Item title='第1轮聚合'></Item>
                </View>
                <Button>查看全局模型情况</Button>
            </View>
            <View className={styles.title}>设置</View>
            <View className={styles.setting}>
                <View className={styles.icon}>*</View>
                <AtSwitch title='长期运行'
                  checked={modal}
                  onChange={()=>{
                      console.log(123)
                    setModal(true)
                  }}
                />
            </View>
            <AtModal
              isOpened={modal}
              title='提示'
              cancelText='取消'
              confirmText='确认'
              content='微信小程序端不支持长期后台训练，所以请您将训练代码和加密后的本地数据包放在电脑端执行。'
              onCancel={()=>setModal(false)}
              onConfirm={()=>{
                setModal(false)
                Taro.navigateTo({url:'/packageTask/pages/dataPack/index'})
              }}
              onClose={()=>setModal(false)}
            />
        </View>
    )
}

export default Index