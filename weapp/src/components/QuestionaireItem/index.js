import { View,Image } from '@tarojs/components'
import styles from './index.module.less'

const index = () =>{
    return (
        <View className={styles.index} hoverClass={styles.indexClick}>
            <Image className={styles.image} src='https://zhangruiyuan.oss-cn-hangzhou.aliyuncs.com/picGo/images/20211011155123.png'></Image>
            <View className={styles.body}>
                <View className={styles.title}>
                    手写数字识别
                    <View className={styles.tag}>联邦学习问卷</View>
                </View>
                <View className={styles.info}>
                当给定一个数字时，在所给定的模版中逐一通过像素去比对，找出最相近的模版，并返回这个模版的数值标签，这个标签就是这个数字的值。事与愿违，由于手写数字千变万化，比如6，8，9这3个数字在进行像素比对时，所给测试数字由于大小形状问题，造成容易搞混的的情况。
                </View>
                <View className={styles.tail}>
                    <View className={styles.author}>
                        发布者：浙江大学
                    </View>
                    <View className={styles.see}>
                        <Image className={styles.seeIcon} src='https://zhangruiyuan.oss-cn-hangzhou.aliyuncs.com/picGo/images/20211011155702.png'></Image>
                        123
                    </View>
                </View>
                
            </View>
           
        </View>
    )
}

export default index