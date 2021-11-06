import {Image, View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { useEffect, useState } from 'react'
import predict from './predict'
import styles from './index.module.less'

const Index = () =>{

    const { image } = Taro.getCurrentInstance().router.params
    const [value, setValue] = useState('-')

    useEffect(()=>{
        (async function(){
            console.log('开始识别')
            let res = await predict({
                width: 28,
                height: 28,
                image, 
                modelUrl: 'https://gflmini.zju-zry.club/file/models/globalModelSameDir/M0cOW9Foy2URn7ELV3H5/model.json'
            })
            setValue(res)
        })()
    },[])

    return (
        <View className={styles.index}>
            <View className={styles.content}>
                <View className={styles.imageTip} > 
                    <Image src='https://zhangruiyuan.oss-cn-hangzhou.aliyuncs.com/picGo/images/20211106111452.png'></Image>
                    手写数字识别结果
                </View>
                <View className={styles.upload}>
                    <Image src={image}></Image>
                </View>
                <View className={styles.ans}>
                    这个数字是
                    <View className={styles.highlight}>
                        {value}
                    </View>
                    !
                </View>
            </View>
        </View>
    )
}

export default Index