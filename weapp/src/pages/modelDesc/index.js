import {View, Image, Button} from '@tarojs/components'
import Taro from '@tarojs/taro'
import { useEffect } from 'react'
import Tips from '@/components/Tips'
import styles from './index.module.less'



const Index = ({}) =>{
    

    useEffect(()=>{
        const {title,id} = Taro.getCurrentInstance().router.params
        console.log(title)
        Taro.setNavigationBarTitle({title})

        // id用来查询本界面的信息
        console.log(id)
    },[])

    return (
        <View className={styles.index}> 
            <View className={styles.title}>模型介绍</View>
            <View className={styles.content}>
                <Image src='https://zhangruiyuan.oss-cn-hangzhou.aliyuncs.com/picGo/images/20211026152847.png'></Image>
                <View>目标检测是计算机视觉和数字图像处理的一个热门方向，广泛应用于机器人导航、无人驾驶、智能视频监控、工业检测、航空航天等诸多领域，通过计算机视觉减少对人力资本的消耗，具有重要的现实意义。</View>
            </View>
            <View className={styles.title}>模型说明</View>
            <View className={styles.content}>
                <View className={styles.put}>
                    <View className={styles.putTitle}>输入</View>
                    <View className={styles.putContent}>相机画面</View>
                </View>
                <Image className={styles.line} src='https://zhangruiyuan.oss-cn-hangzhou.aliyuncs.com/picGo/images/20211026155851.png'></Image>
                <View className={styles.put}>
                    <View className={styles.putTitle}>输出</View>
                    <View className={styles.putContent}>画面中物体范围与名称</View>
                </View>
            </View>
            <Tips className={styles.tips} text='小程序会显示相机视野中的目标范围和名称~' />
            <Button className={styles.btn} type='primary' >点击体验</Button>
        </View>
    )
}

export default Index