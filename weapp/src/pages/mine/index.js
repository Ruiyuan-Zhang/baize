import { View, Image} from '@tarojs/components'
import { AtIcon } from 'taro-ui'
import Taro from '@tarojs/taro'
import Tabbar from '@/components/Tabbar'
import styles from './index.module.less'

const Index = () =>{
    return (
        <View className={styles.index}> 
            <Image className={styles.bg} mode='widthFix' src='https://zhangruiyuan.oss-cn-hangzhou.aliyuncs.com/picGo/images/wo_bg_image@3x.png'></Image>
            <View className={styles.header}>
                <Image src='https://zhangruiyuan.oss-cn-hangzhou.aliyuncs.com/picGo/images/20211026202328.png'></Image>
                <View className={styles.user}>
                    <View className={styles.name}>白泽12236</View>
                    <View className={styles.phone}>187****9087</View>
                </View>
                <AtIcon value='chevron-right'></AtIcon>
            </View>
            <View className={styles.value}>
                <View className={styles.balance}>5100</View>
                <View className={styles.seeMyBaize}
                  onClick={()=>Taro.navigateTo({url:'/pages/myBaize/index'})}
                >
                    查看我的白泽星
                    <AtIcon value='chevron-right' color='#fff' size='16'></AtIcon>
                </View>

            </View>
            <View className={styles.tabs}>
                <View className={styles.tab}>
                    <Image src='https://zhangruiyuan.oss-cn-hangzhou.aliyuncs.com/picGo/images/20211026201430.png'></Image>
                    我的问卷
                </View>
                <View className={styles.tab}>
                    <Image src='https://zhangruiyuan.oss-cn-hangzhou.aliyuncs.com/picGo/images/20211026201516.png'></Image>
                    我的任务
                </View>
                <View className={styles.tab}>
                    <Image src='https://zhangruiyuan.oss-cn-hangzhou.aliyuncs.com/picGo/images/20211026201549.png'></Image>
                    我的收藏
                </View>
            </View>

            <View className={styles.settings}>
                <View className={styles.setting}>
                    <Image src='https://zhangruiyuan.oss-cn-hangzhou.aliyuncs.com/picGo/images/20211026201716.png'></Image>
                    <View className={styles.handle}>
                        帮助与反馈
                        <Image src='https://zhangruiyuan.oss-cn-hangzhou.aliyuncs.com/picGo/images/20211026201900.png'></Image>
                    </View>
                </View>
                <View className={styles.setting}>
                    <Image src='https://zhangruiyuan.oss-cn-hangzhou.aliyuncs.com/picGo/images/20211026202041.png'></Image>
                    <View className={styles.handle}>
                        联系客服
                        <Image src='https://zhangruiyuan.oss-cn-hangzhou.aliyuncs.com/picGo/images/20211026201900.png'></Image>
                    </View>
                </View>
                <View className={styles.setting}>
                    <Image src='https://zhangruiyuan.oss-cn-hangzhou.aliyuncs.com/picGo/images/20211026202108.png'></Image>
                    <View className={styles.handle}>
                        设置
                        <Image src='https://zhangruiyuan.oss-cn-hangzhou.aliyuncs.com/picGo/images/20211026201900.png'></Image>
                    </View>
                </View>
            </View>
            <Tabbar index={3} />
        </View>
    )
}

export default Index