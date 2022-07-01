import {View, Image, Swiper, SwiperItem} from '@tarojs/components'
import Taro, {useDidShow} from '@tarojs/taro'
import styles from './index.module.less'

const Index = () => {

    useDidShow(()=>{
        setTimeout(()=>{
            Taro.switchTab({url:'/pages/index/index'})
        },4500)
    })

    return (
    
        <View className={styles.index}>
            <Swiper
              className={styles.swiper}
              circular
              indicatorColor='#e1e1e1'
              indicatorActiveColor='#4b00e7'
              autoplay
              indicatorDots
              interval={1500}
            >
                <SwiperItem  className={styles.swiperItem}>
                    <View className={styles.content}>
                        <Image src='https://zhangruiyuan.oss-cn-hangzhou.aliyuncs.com/picGo/images/20211027160041.png'></Image>
                    </View>
                </SwiperItem>
                <SwiperItem  className={styles.swiperItem}>
                    <View className={styles.content}>
                        <Image src='https://zhangruiyuan.oss-cn-hangzhou.aliyuncs.com/picGo/images/20211027160102.png'></Image>
                        <View className={styles.infos}>
                            <View className={styles.info}>使用白泽问卷收集高质量样本，</View>
                            <View className={styles.info}>训练不再缺数据！</View>
                        </View>
                    </View>
                </SwiperItem>
                <SwiperItem  className={styles.swiperItem}>
                    <View className={styles.content}>
                        <Image src='https://zhangruiyuan.oss-cn-hangzhou.aliyuncs.com/picGo/images/20211027160120.png'></Image>
                        <View className={styles.infos}>
                            <View className={styles.info}>你的数据可以换钱啦！</View>
                            <View className={styles.info}>快来填写相应问卷，贡献你的数据吧！</View>
                        </View>
                    </View>
                </SwiperItem>
            </Swiper>
            <View className={styles.tail}>
                <View className={styles.left}>白泽问卷</View>
                <View className={styles.line}></View>
                <View className={styles.right}>
                    <View>联邦学习数据收集</View>
                    <View>与数据可视化</View>
                </View>
            </View>

        </View>
    )
}

export default Index