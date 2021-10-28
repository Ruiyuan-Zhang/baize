import {View, Image} from '@tarojs/components'
import styles from './index.module.less'

const Index = ({className, submit=true}) => {
    return (
        <View className={className+' '+styles.index}>
            <View className={styles.top}>
                <Image src='https://zhangruiyuan.oss-cn-hangzhou.aliyuncs.com/picGo/images/20211028213243.png'></Image>
                <View className={styles.right}>
                    <View className={styles.title}>手写数字识别</View>
                    <View className={styles.content}>该模板用的是一个784*784*10的一个CNN网络，可以用28*28灰度图片的输入……</View>
                    <View className={styles.time}>发布时间：2021-09-27 22:34:33</View>
                    <View className={styles.details}>
                        查看详情
                        <Image src='https://zhangruiyuan.oss-cn-hangzhou.aliyuncs.com/picGo/images/20211028222557.png'></Image>
                    </View>
                </View> 
            </View>
            <View className={styles.midLine}></View>
            <View className={styles.buttom}>
                <View className={styles.handle}>
                    <Image src='https://zhangruiyuan.oss-cn-hangzhou.aliyuncs.com/picGo/images/20211028215652.png'></Image>
                    分享
                </View>
                <View className={styles.line}></View>
                <View className={styles.handle}>
                    <Image src='https://zhangruiyuan.oss-cn-hangzhou.aliyuncs.com/picGo/images/20211028215804.png'></Image>
                    模型预览
                </View>
                {!submit&&<>
                    <View className={styles.line}></View>
                    <View className={styles.handle}>
                        <Image src='https://zhangruiyuan.oss-cn-hangzhou.aliyuncs.com/picGo/images/20211028225529.png'></Image>
                        数据
                    </View>
                </>}

                <View className={styles.line}></View>
                <View className={styles.handle}>
                    <Image src='https://zhangruiyuan.oss-cn-hangzhou.aliyuncs.com/picGo/images/20211028215836.png'></Image>
                    任务进展
                </View>
            </View>
            
        </View>
    )
}

export default Index