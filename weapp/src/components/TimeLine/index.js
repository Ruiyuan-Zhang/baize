import { View, Image} from '@tarojs/components'
import { AtProgress } from 'taro-ui'
import styles from './index.module.less'

// 当前正在聚合的项
const NowItem = () =>{
    return (
        <View className={styles.nowItem}>
            <Image src='https://zhangruiyuan.oss-cn-hangzhou.aliyuncs.com/picGo/images/20211102113908.png'></Image>
            <View className={styles.title}>正在进行；第4轮聚合</View>
            <View className={styles.info}>共需要3个客户端参与本次聚合，目前2个子模型已上传</View>
            <AtProgress percent={66} isHidePercent color='#0b37e7' />
            <View className={styles.clients}>
                {[1, 2].map(id => 
                    <View className={styles.client} key={id}>
                        <View className={styles.title}>client 0</View>
                        <View className={styles.info}>
                            <View>训练时间：13421ms</View>
                            <View>准确率：60%</View>
                            <View>收益：--</View>
                        </View>
                        <View className={styles.tail}>
                            <View>来自：zhangruiyuan</View>
                            <View>上传时间：2021-10-03 09:53</View>
                        </View>
                    </View>
                )}
            </View>
        </View>
    )
}

// 一轮聚合项
const Item = () => {
    return (
        <View className={styles.item}>
            <Image src='https://zhangruiyuan.oss-cn-hangzhou.aliyuncs.com/picGo/images/20211102105345.png'></Image>
            <View className={styles.server}>
                <View className={styles.title}>第3轮聚合</View>
                <View className={styles.info}>
                    <View>聚合时间：13421ms</View>
                    <View>准确率：0.7</View>
                </View>
                <View className={styles.tail}>共有3个客户端参与本次聚合</View>
            </View>
            <View className={styles.clients}>
                {[1, 2, 3].map(id => 
                    <View className={styles.client} key={id}>
                        <View className={styles.title}>client 0</View>
                        <View className={styles.info}>
                            <View>训练时间：13421ms</View>
                            <View>准确率：60%</View>
                            <View>收益：100白泽币</View>
                        </View>
                        <View className={styles.tail}>
                            <View>来自：zhangruiyuan</View>
                            <View>上传时间：2021-10-03 09:53</View>
                        </View>
                    </View>
                )}
            </View>
        </View>
    )
}

const Index = () =>{
    return (
        <View className={styles.index}>
            <NowItem />
            <Item />
            <Item />
            <Item />
            <Item />
        </View>
    )
}

export default Index