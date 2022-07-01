import { View, Image, Button } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { AtDivider } from 'taro-ui'
import styles from './index.module.less'

const Index = () =>{

    const shares = [
        'https://zhangruiyuan.oss-cn-hangzhou.aliyuncs.com/picGo/images/20211015201754.png',
        'https://zhangruiyuan.oss-cn-hangzhou.aliyuncs.com/picGo/images/20211015201822.png',
        'https://zhangruiyuan.oss-cn-hangzhou.aliyuncs.com/picGo/images/20211015201837.png',
        'https://zhangruiyuan.oss-cn-hangzhou.aliyuncs.com/picGo/images/20211015201849.png',
        'https://zhangruiyuan.oss-cn-hangzhou.aliyuncs.com/picGo/images/20211015201902.png',
        'https://zhangruiyuan.oss-cn-hangzhou.aliyuncs.com/picGo/images/20211015201913.png',
    ]

    return (
        <View className={styles.index}>
            <Image className={styles.results} src='https://zhangruiyuan.oss-cn-hangzhou.aliyuncs.com/picGo/images/20211015201232.png'></Image>
            <Button className={styles.btn}
              onClick={()=>Taro.switchTab({url:'/pages/index/index'})}
            >
                完成
            </Button>
            <AtDivider className={styles.divider}>通过以下方式分享此问卷</AtDivider>
            <View className={styles.shares}>
                {shares.map(s=><Image className={styles.share} key={s} src={s}></Image>)}
            </View>
        </View>
    )
}

export default Index