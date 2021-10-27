import { View, Image } from '@tarojs/components'
import styles from './index.module.less'

const Index = () =>{
    return (
        <View className={styles.index}>
            <View className={styles.back}>
                <View className={styles.line}>
                    <Image src='https://zhangruiyuan.oss-cn-hangzhou.aliyuncs.com/picGo/images/20211026222143.png'></Image>
                    我的白泽星
                </View>
                <View className={styles.baize}>
                    <View className={styles.user}>
                        <Image src='https://zhangruiyuan.oss-cn-hangzhou.aliyuncs.com/picGo/images/20211026222834.png'> </Image>
                        <View className={styles.info}>
                            <View className={styles.name}>白泽1784</View>
                            <View className={styles.phone}>187****4689</View>
                        </View>
                    </View>
                    <View className={styles.balance}>
                        5100
                        <View className={styles.balanceHandles}>
                            <View className={styles.balanceHandle}>
                                <Image src='https://zhangruiyuan.oss-cn-hangzhou.aliyuncs.com/picGo/images/20211026224848.png'></Image>
                                充值
                            </View>
                            <View className={styles.balanceHandle}>
                                <Image src='https://zhangruiyuan.oss-cn-hangzhou.aliyuncs.com/picGo/images/20211026224914.png'></Image>
                                体现
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default Index