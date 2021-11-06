import {View, Image, Button} from '@tarojs/components'
import styles from './index.module.less'

const Index = ({onClick}) =>{
    return (
        <View className={styles.index}>
            <Button className={styles.submit}
              onClick={onClick}
            >
                <Image src='https://zhangruiyuan.oss-cn-hangzhou.aliyuncs.com/picGo/images/20211106090222.png'></Image>
                发布
            </Button>
        </View>
    )
}

export default Index