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
                <Image src='https://zhangruiyuan.oss-cn-hangzhou.aliyuncs.com/picGo/images/20211107104954.png'></Image>
                <View>目前，利用AI来进行医学诊断已经达到较高的水平。部分涉及隐私的皮肤病，可以在手机上使用模型来进行初步诊断，例如黑色素瘤。</View>
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
                    <View className={styles.putContent}>恶性还是良性</View>
                </View>
            </View>
            <Tips className={styles.tips} text='小程序会显示相机视野中的目标范围和名称~' />
            <Button className={styles.btn} type='primary' 
              onClick={()=>Taro.navigateTo({url:'/pages/categoryModalShow/index'})}
            >
                点击体验
            </Button>
        </View>
    )
}

export default Index