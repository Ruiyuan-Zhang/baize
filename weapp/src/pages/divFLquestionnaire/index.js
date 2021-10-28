import { View, Image, Button} from '@tarojs/components'
import styles from './index.module.less'

const Index = () =>{
    return (
        <View className={styles.index}>
            <View className={styles.tips}>
                <View className={styles.tip}>自定义创建需要上传初始模型，</View>
                <View className={styles.tip}>请前往白泽问卷web端创建吧~</View>
            </View>
            <Image src='https://zhangruiyuan.oss-cn-hangzhou.aliyuncs.com/picGo/images/20211027202046.png'></Image>
            <Button className={styles.btn}>
                <Image src='https://zhangruiyuan.oss-cn-hangzhou.aliyuncs.com/picGo/images/20211027202124.png'></Image>
                复制白泽问卷web端链接
            </Button>
        </View>
    )
}

export default Index