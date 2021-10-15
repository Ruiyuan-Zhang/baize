import { View, Input, Image } from '@tarojs/components'
import styles from './index.module.less'

const index = () =>{
    return (
        <View className={styles.index}>
            <Image src='https://zhangruiyuan.oss-cn-hangzhou.aliyuncs.com/picGo/images/20211012191614.png'></Image>
        </View>
    )
}

export default index