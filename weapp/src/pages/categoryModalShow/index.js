import {Image, View, Button} from '@tarojs/components'
import { useState } from 'react'
import Taro from '@tarojs/taro'
import {AtImagePicker} from 'taro-ui'
import styles from './index.module.less'

const Index = () =>{

    const [images, setImages] = useState([])
    return (
        <View className={styles.index}>
            <View className={styles.content}>
                <View className={styles.imageTip} > 
                    <Image src='https://zhangruiyuan.oss-cn-hangzhou.aliyuncs.com/picGo/images/20211106111452.png'></Image>
                    请上传手写数字的照片
                </View>
                <View className={styles.upload}>
                    <AtImagePicker 
                      files={images}
                      onChange={setImages}
                    >
                    </AtImagePicker>
                </View>
                <View className={styles.tip}>
                    <Image src='https://zhangruiyuan.oss-cn-hangzhou.aliyuncs.com/picGo/images/20211106104155.png'></Image>
                    尽量选取背景清晰干净的图片
                </View>
            </View>
            <Button className={styles.btn} src='https://zhangruiyuan.oss-cn-hangzhou.aliyuncs.com/picGo/images/20211106104228.png'
              onClick={()=>{
                images.length>0&&Taro.navigateTo({url:'/packageTask/pages/categoryModalShowResult/index?image='+images[0].url})
              }}
            >
                让我看看识别结果
            </Button>
        </View>
    )
}

export default Index