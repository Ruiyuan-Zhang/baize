import { View, Image } from '@tarojs/components'
import styles from './index.module.less'

const Index = ({text, className}) =>{
    return(
    <View className={className + ' ' + styles.index}>
        <View className={styles.tips}>
            <Image
              src='https://zhangruiyuan.oss-cn-hangzhou.aliyuncs.com/picGo/images/20211015010444.png'></Image>
            <View className={styles.mid}></View>
            <View className={styles.tip}>{text}</View>
        </View>
    </View>
    )
}

export default Index