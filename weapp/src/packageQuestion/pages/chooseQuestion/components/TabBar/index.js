import { View, Image } from '@tarojs/components'
import styles from './index.module.less'

const Index = () =>{
    return (
        <View className={styles.index}>
            <Image src='https://zhangruiyuan.oss-cn-hangzhou.aliyuncs.com/picGo/images/20211105144031.png'></Image>
            <Image src='https://zhangruiyuan.oss-cn-hangzhou.aliyuncs.com/picGo/images/20211105144227.png'></Image>
            <Image src='https://zhangruiyuan.oss-cn-hangzhou.aliyuncs.com/picGo/images/20211105144247.png'></Image>
            <Image src='https://zhangruiyuan.oss-cn-hangzhou.aliyuncs.com/picGo/images/20211105144546.png'></Image>
        </View>
    )
}

export default Index