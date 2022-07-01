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
            const modelUrl = 'https://gflmini.zju-zry.club/file/models/globalModelSameDir/tzGVcdE52pkAjVgENqgQ/model.json'
            // const modelUrl = 'https://gflmini.zju-zry.club/file/models/globalModelSameDir/M0cOW9Foy2URn7ELV3H5/model.json'
            console.log('开始识别')
            let res = await predict({
                width: 28,
                height: 28,
                image, 
                modelUrl,
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
                    您的皮肤是
                    <View className={styles.highlight}>
                        {value==0&&'良性'}
                        {value==1&&'恶性'}
                        {value!=0&&value!=1&&'未知'}
                    </View>
                    !
                </View>
            </View>
        </View>
    )
}

export default Index